from django.shortcuts import render
from .models import Product, Order, Cart, CartItems, Wishlist,Profile,WishlistItems, ProceedToOrder
from .serializers import ProductSerializer, OrderSerializer,CartSerializer, CartItemsSerializer, WishlistSerializer,ProfileSerializer,WishlistItemsSerializer,UserSerializer, ProceedToOrderSerializer
# Create your views here.
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


   

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
   

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(name__icontains=search_query)
        return queryset

    
from rest_framework.permissions import IsAuthenticated

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user).select_related('product')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CartItemsViewSet(viewsets.ModelViewSet):
    queryset = CartItems.objects.all() 
    serializer_class = CartItemsSerializer

    

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).select_related('proceed_to_order')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
 

from rest_framework.permissions import IsAuthenticated

class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class WishlistItemsViewSet(viewsets.ModelViewSet):
    queryset = WishlistItems.objects.all()
    serializer_class = WishlistItemsSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user_id': user.id, 'username': user.username})
    else:
        return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    user = request.user
    cart_items = Cart.objects.filter(user=user)
    if not cart_items.exists():
        return Response({'error': 'Cart is empty'}, status=400)

    total_amount = sum(item.product.price * item.quantity for item in cart_items)

    # Create ProceedToOrder
    proceed_data = request.data.get('proceed_to_order')
    proceed_data['user'] = user.id  # Add the user to the shipping data
    proceed_serializer = ProceedToOrderSerializer(data=proceed_data)
    if proceed_serializer.is_valid():
        proceed_to_order = proceed_serializer.save()
    else:
        return Response(proceed_serializer.errors, status=400)

    # Create Order and link it to the shipping details
    order = Order.objects.create(user=user, total_amount=total_amount, proceed_to_order=proceed_to_order)

    # Clear cart
    cart_items.delete()

    return Response({'message': 'Order placed successfully', 'order_id': order.id}, status=201)

@api_view(['GET'])
def api_root(request, format=None):
    """
    The entry endpoint of our API.
    """
    return Response({
       'api': request.build_absolute_uri('api/'),
       'admin': request.build_absolute_uri('admin/'),
    })



    
