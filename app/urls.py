from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProfileViewSet, ProductViewSet, CartViewSet, CartItemsViewSet, OrderViewSet, WishlistViewSet, WishlistItemsViewSet, login_view, place_order

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'products', ProductViewSet)
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cart_items', CartItemsViewSet)
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'wishlists', WishlistViewSet)
router.register(r'wishlist_items', WishlistItemsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('login/', login_view, name='login'),
    path('place-order/', place_order, name='place_order'),
    path('products/search/', ProductViewSet.as_view({'get': 'list'}), name='product-search'),
]
