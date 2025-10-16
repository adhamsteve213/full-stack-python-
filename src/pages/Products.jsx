import React,{useState,useEffect, useContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
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

function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products,setProducts]=useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});
  const { cartItems, addToCart, increaseCartQuantity, decreaseCartQuantity } = useContext(CartContext);
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleFavoriteClick = (product, event) => {
    event.stopPropagation();
    toggleWishlist(product);
  };

useEffect(()=>{
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search');
  const url = query ? `http://127.0.0.1:8000/api/products/?search=${encodeURIComponent(query)}` : 'http://127.0.0.1:8000/api/products/';
  fetch(url)
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(data=>setProducts(data))
  .catch(err => setError(err.message));
},[location.search])

useEffect(() => {
  setFilteredProducts(products);
}, [products]);
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {filteredProducts.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => handleCardClick(item.id)}>
            <CardMedia
              component="img"
              height="140"
              image={item.image}
              alt={item.name}
            />
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <IconButton onClick={(event) => handleFavoriteClick(item, event)} sx={{ color: isInWishlist(item.id) ? 'red' : 'grey' }}>
                  <FavoriteIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {item.price}EGP
              </Typography>
              {(() => {
                const cartItem = cartItems.find(cartItem => cartItem.product?.id === item.id);
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
                    <Button onClick={(event) => { event.stopPropagation(); addToCart(item); }} style={{ backgroundColor:'black',color:'white', padding:'10px',margin:'20px',borderRadius: '10px'}} sx={{ mt: 1 }}>
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
  )
}

export default Products
