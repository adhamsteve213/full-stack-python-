from rest_framework import serializers
from .models import Product,  Order, CartItems, Wishlist,Profile,WishlistItems,Cart, ProceedToOrder
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CartItemsSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = CartItems
        fields = '__all__'

class ProceedToOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProceedToOrder
        fields = ['id', 'user', 'FirstName', 'MiddleName', 'LastName', 'phone', 'home_address']
        extra_kwargs = {'user': {'write_only': True}}
class OrderSerializer(serializers.ModelSerializer):
    proceed_to_order_details = ProceedToOrderSerializer(source='proceed_to_order', read_only=True)
    FirstName = serializers.SerializerMethodField()
    MiddleName = serializers.SerializerMethodField()
    LastName = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()
    home_address = serializers.SerializerMethodField()

    def get_FirstName(self, obj):
        return obj.proceed_to_order.FirstName if obj.proceed_to_order else None

    def get_MiddleName(self, obj):
        return obj.proceed_to_order.MiddleName if obj.proceed_to_order else None

    def get_LastName(self, obj):
        return obj.proceed_to_order.LastName if obj.proceed_to_order else None

    def get_phone(self, obj):
        return obj.proceed_to_order.phone if obj.proceed_to_order else None

    def get_home_address(self, obj):
        return obj.proceed_to_order.home_address if obj.proceed_to_order else None

    class Meta:
        model = Order
        fields = ['id', 'user', 'total_amount', 'created_at', 'updated_at', 'proceed_to_order_details', 'FirstName', 'MiddleName', 'LastName', 'phone', 'home_address']

class WishlistItemsSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True, source='wishlist.product')
    user = UserSerializer(read_only=True, source='wishlist.user')
    class Meta:
        model = WishlistItems
        fields = ['id', 'wishlist', 'product', 'user', 'created_at']
        read_only_fields = ['id', 'created_at']

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['id', 'product', 'created_at']
        read_only_fields = ['id', 'created_at']


class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'product', 'product_id', 'quantity', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        product_id = validated_data.pop('product_id')
        product = Product.objects.get(id=product_id)
        cart = Cart.objects.create(product=product, **validated_data)
        return cart
