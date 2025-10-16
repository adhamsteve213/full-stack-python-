from app.models import Cart
from django.db.models import Count

# Find groups with duplicates
duplicates = Cart.objects.values('user', 'product').annotate(count=Count('id')).filter(count__gt=1)

for dup in duplicates:
    user_id = dup['user']
    product_id = dup['product']
    # Get all carts for this user-product, ordered by created_at descending (latest first)
    carts = list(Cart.objects.filter(user=user_id, product=product_id).order_by('-created_at'))
    if carts:
        # Keep the latest one and merge quantities
        kept = carts[0]
        for cart in carts[1:]:
            kept.quantity += cart.quantity
            cart.delete()
        kept.save()

print("Duplicates cleaned.")
