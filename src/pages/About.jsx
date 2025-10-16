import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

function About() {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#000', fontWeight: 'bold' }}>
        About Apple Store
      </Typography>
      <Typography variant="h6" align="center" sx={{ mb: 4, color: '#666' }}>
        Discover the world of Apple innovation and excellence
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#000', fontWeight: 'bold' }}>
                Our Story
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: '#666' }}>
                Founded in 1976, Apple has revolutionized the way we live, work, and communicate. From the first Macintosh computer to the latest iPhone, we've been at the forefront of technological innovation for over four decades.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: '#666' }}>
                Our mission is to create products that enrich people's lives and help them achieve things they never thought possible. We believe in thinking differently, challenging the status quo, and pushing the boundaries of what's possible.
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                At Apple Store, we're not just selling products – we're connecting people with technology that inspires, empowers, and transforms their daily experiences.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="300"
              image="https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Apple Store"
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#000', fontWeight: 'bold' }}>
                Our Values
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                • Innovation that matters
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                • Privacy and security
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                • Environmental responsibility
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                • Accessibility for everyone
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                • Education and empowerment
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ color: '#000', fontWeight: 'bold' }}>
          Why Choose Apple?
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', boxShadow: 2, textAlign: 'center' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#000', fontWeight: 'bold' }}>
                  Cutting-Edge Technology
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Experience the latest in smartphone, tablet, and computer technology with seamless integration across all Apple devices.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', boxShadow: 2, textAlign: 'center' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#000', fontWeight: 'bold' }}>
                  Exceptional Support
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Our expert team is here to help you get the most out of your Apple products with personalized service and support.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', boxShadow: 2, textAlign: 'center' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#000', fontWeight: 'bold' }}>
                  Premium Quality
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Every Apple product is designed with meticulous attention to detail, ensuring reliability and performance you can trust.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default About;
