import { createContext, useEffect, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { token } = useAuth();

  const fetchCart = () => {
    if (!token) return;
    fetch('http://127.0.0.1:8000/api/cart/', {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then(data => setCartItems(data))
      .catch(error => console.error('Error fetching cart:', error));
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const addToCart = (product, quantity = 1) => {
    if (!token) return;
    // The backend now handles creating or updating, so we just POST.
    fetch('http://127.0.0.1:8000/api/cart/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_id: product.id, quantity }),
    })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return res.json();
    })
    .then(updatedItem => {
        // Optimistically update the state
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === updatedItem.id);
            if (existingItem) {
                return prevItems.map(item => item.id === updatedItem.id ? updatedItem : item);
            } else {
                return [...prevItems, updatedItem];
            }
        });
    })
    .catch(error => {
        console.error('Error adding to cart:', error);
        // Optional: Re-fetch to sync state if API call fails
        fetchCart();
    });
  };

  const increaseCartQuantity = (cartId) => {
    if (!token) return;
    const item = cartItems.find((item) => item.id === cartId);
    if (item) {
      const newQuantity = item.quantity + 1;
      // Optimistically update UI
      setCartItems(cartItems.map(i => i.id === cartId ? { ...i, quantity: newQuantity } : i));

      fetch(`http://127.0.0.1:8000/api/cart/${cartId}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .catch(error => {
          console.error('Error increasing quantity:', error);
          fetchCart(); // Re-sync on error
      });
    }
  };

  const decreaseCartQuantity = (cartId) => {
    if (!token) return;
    const item = cartItems.find((item) => item.id === cartId);
    if (!item) return;

    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      // Optimistically update UI
      setCartItems(cartItems.map(i => i.id === cartId ? { ...i, quantity: newQuantity } : i));

      fetch(`http://127.0.0.1:8000/api/cart/${cartId}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .catch(error => {
          console.error('Error decreasing quantity:', error);
          fetchCart(); // Re-sync on error
      });
    } else {
      removeCompletelyFromCart(cartId);
    }
  };

  const removeCompletelyFromCart = (cartId) => {
    if (!token) return;
    // Optimistically update UI
    setCartItems(cartItems.filter(item => item.id !== cartId));

    fetch(`http://127.0.0.1:8000/api/cart/${cartId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch(error => {
        console.error('Error removing from cart:', error);
        fetchCart(); // Re-sync on error
    });
  };

  const clearCart = () => {
    if (!token) return;
    // Optimistically update UI
    // The backend clears the cart items when an order is placed.
    // We just need to clear the local state.
    setCartItems([]);
  };

  const contextValue = {
    cartItems,
    addToCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeCompletelyFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
