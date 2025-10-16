from django.contrib import admin
from .models import Product, Order, Cart, CartItems, Wishlist , Profile,  WishlistItems


admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Cart)
admin.site.register(CartItems)
admin.site.register(Wishlist)
admin.site.register(Profile)
admin.site.register(WishlistItems)