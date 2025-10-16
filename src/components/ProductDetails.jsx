import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
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

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { cartItems, addToCart, increaseCartQuantity, decreaseCartQuantity } = useContext(CartContext);
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setProduct(data))
      .catch(err => setError(err.message));
  }, [id]);

  const handleFavoriteClick = () => {
    toggleWishlist(product);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            height="400"
            image={product.image}
            alt={product.name}
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography gutterBottom variant="h4" component="div">
                  {product.name}
                </Typography>
                <IconButton onClick={handleFavoriteClick} sx={{ color: isInWishlist(product.id) ? 'red' : 'grey' }}>
                  <FavoriteIcon />
                </IconButton>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
                {product.description}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ marginBottom: 1 }}>
                {product.price}EGP
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Stock: {product.stock}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Availability: {product.available ? 'In Stock' : 'Out of Stock'}
              </Typography>
              {(() => {
                const cartItem = cartItems.find(cartItem => cartItem.product?.id === product.id);
                if (cartItem) {
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                      <IconButton onClick={() => decreaseCartQuantity(cartItem.id)} size="small">
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 1 }}>
                        {cartItem.quantity}
                      </Typography>
                      <IconButton onClick={() => increaseCartQuantity(cartItem.id)} size="small">
                        <AddIcon />
                      </IconButton>
                    </Box>
                  );
                } else {
                  return (
                    <Button
                    onClick={() => addToCart(product)} style={{ backgroundColor:'black',color:'white', padding:'10px',margin:'20px',borderRadius: '10px'}}  size="large">
                      Add to Cart
                    </Button>
                  );
                }
              })()}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetails;
