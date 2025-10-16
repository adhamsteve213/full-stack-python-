import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CartContext } from '../components/CartContext';
import { WishlistContext } from '../components/WishlistContext';

function Wishlist() {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseCartQuantity, decreaseCartQuantity } = useContext(CartContext);
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleFavoriteClick = (wishlistId, event) => {
    event.stopPropagation();
    removeFromWishlist(wishlistId);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Wishlist
      </Typography>
      {wishlistItems.length === 0 ? (
        <Typography variant="body1">Your wishlist is empty.</Typography>
      ) : (
        <Grid container spacing={2}>
          {wishlistItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => handleCardClick(item.product.id)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.product.image}
                  alt={item.product.name}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.product.name}
                    </Typography>
                    <IconButton onClick={(event) => handleFavoriteClick(item.id, event)} sx={{ color: 'red' }}>
                      <FavoriteIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.product.price}EGP
                  </Typography>
                  {(() => {
                    const cartItem = cartItems.find(cartItem => cartItem.product?.id === item.product.id);
                    if (cartItem) {
                      return (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                          <IconButton onClick={(event) => { event.stopPropagation(); decreaseCartQuantity(cartItem.id); }} size="small">
                            <RemoveIcon />
                          </IconButton>
                          <Typography variant="body1" sx={{ mx: 1 }}>
                            {cartItem.quantity}
                          </Typography>
                          <IconButton onClick={(event) => { event.stopPropagation(); increaseCartQuantity(cartItem.id); }} size="small">
                            <AddIcon />
                          </IconButton>
                        </Box>
                      );
                    } else {
                      return (
                        <Button onClick={(event) => { event.stopPropagation(); addToCart(item.product); }} style={{ backgroundColor:'black',color:'white', padding:'10px',margin:'20px',borderRadius: '10px'}} sx={{ mt: 1 }}>
                          Add to Cart
                        </Button>
                      );
                    }
                  })()}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Wishlist;
