import { createContext, useEffect, useState, useContext } from 'react';
import { useAuth } from './AuthContext';

export const WishlistContext = createContext({});

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { token } = useAuth();

  const fetchWishlist = () => {
    if (!token) return;
    fetch('http://127.0.0.1:8000/api/wishlists/', {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then(data => setWishlistItems(data))
      .catch(error => console.error('Error fetching wishlist:', error));
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  const addToWishlist = (product) => {
    if (!token) return;
    fetch('http://127.0.0.1:8000/api/wishlists/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: product.id }),
    })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return res.json();
    })
    .then(newItem => {
      setWishlistItems(prevItems => [...prevItems, newItem]);
    })
    .catch(error => {
      console.error('Error adding to wishlist:', error);
      fetchWishlist();
    });
  };

  const removeFromWishlist = (wishlistId) => {
    if (!token) return;
    setWishlistItems(wishlistItems.filter(item => item.id !== wishlistId));

    fetch(`http://127.0.0.1:8000/api/wishlists/${wishlistId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch(error => {
      console.error('Error removing from wishlist:', error);
      fetchWishlist();
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.product === productId);
  };

  const toggleWishlist = (product) => {
    const existingItem = wishlistItems.find(item => item.product === product.id);
    if (existingItem) {
      removeFromWishlist(existingItem.id);
    } else {
      addToWishlist(product);
    }
  };

  const contextValue = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
