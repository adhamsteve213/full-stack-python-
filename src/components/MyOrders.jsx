import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuth } from '../components/AuthContext';

const MyOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/orders/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          setError('Failed to fetch orders');
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          My Orders
        </Typography>
        <Typography align="center">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          My Orders
        </Typography>
        <Typography color="error" align="center">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 4 }}>
          You have no orders yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography variant="h6">
                        Order #{order.id}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {parseFloat(order.total_amount).toFixed(2)}EGP
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" gutterBottom>
                        <strong>Shipping Information:</strong>
                      </Typography>
                      <Typography variant="body2">
                        Name: {order.FirstName} {order.MiddleName} {order.LastName}
                      </Typography>
                      <Typography variant="body2">
                        Phone: {order.phone}
                      </Typography>
                      <Typography variant="body2">
                        Address: {order.home_address}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Ordered on: {new Date(order.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyOrders;
