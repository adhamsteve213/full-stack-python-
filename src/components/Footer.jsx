import React from 'react';
import { Box, Typography, Grid, Link, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AppleIcon from '@mui/icons-material/Apple';

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform) => {
    const urls = {
      facebook: 'https://www.facebook.com',
      instagram: 'https://www.instagram.com',
      twitter: 'https://www.twitter.com',
      whatsapp: 'https://wa.me/1234567890'
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', padding: 4, mt: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AppleIcon sx={{ mr: 1, fontSize: 30 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              Apple Store
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 2, color: '#ccc' }}>
            Discover the innovative world of Apple and shop everything iPhone, iPad, Apple Watch, Mac, and Apple TV, plus explore accessories, entertainment, and expert device support.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => handleSocialClick('facebook')}
              sx={{ color: '#fff', '&:hover': { color: '#1877f2' } }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              onClick={() => handleSocialClick('instagram')}
              sx={{ color: '#fff', '&:hover': { color: '#e4405f' } }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              onClick={() => handleSocialClick('twitter')}
              sx={{ color: '#fff', '&:hover': { color: '#1da1f2' } }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              onClick={() => handleSocialClick('whatsapp')}
              sx={{ color: '#fff', '&:hover': { color: '#25d366' } }}
            >
              <WhatsAppIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
            Shop
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link href="#" color="inherit" underline="hover">iPhone</Link>
            <Link href="#" color="inherit" underline="hover">iPad</Link>
            <Link href="#" color="inherit" underline="hover">Mac</Link>
            <Link href="#" color="inherit" underline="hover">Apple Watch</Link>
            <Link href="#" color="inherit" underline="hover">Apple TV</Link>
            <Link href="#" color="inherit" underline="hover">Accessories</Link>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
            Support
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link href="#" color="inherit" underline="hover">Contact Us</Link>
            <Link href="#" color="inherit" underline="hover">Device Support</Link>
            <Link href="#" color="inherit" underline="hover">Warranty</Link>
            <Link href="#" color="inherit" underline="hover">Returns</Link>
            <Link href="#" color="inherit" underline="hover">Track Order</Link>
            <Link href="#" color="inherit" underline="hover">FAQ</Link>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
            Company
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link href="#" color="inherit" underline="hover">About Apple</Link>
            <Link href="#" color="inherit" underline="hover">Newsroom</Link>
            <Link href="#" color="inherit" underline="hover">Investors</Link>
            <Link href="#" color="inherit" underline="hover">Ethics & Compliance</Link>
            <Link href="#" color="inherit" underline="hover">Events</Link>
            <Link href="#" color="inherit" underline="hover">Job Opportunities</Link>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, backgroundColor: '#333' }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ color: '#ccc' }}>
          © {currentYear} Apple Store. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Link href="#" color="inherit" underline="hover" variant="body2">Privacy Policy</Link>
          <Link href="#" color="inherit" underline="hover" variant="body2">Terms of Service</Link>
          <Link href="#" color="inherit" underline="hover" variant="body2">Sales and Refunds</Link>
          <Link href="#" color="inherit" underline="hover" variant="body2">Legal</Link>
          <Link href="#" color="inherit" underline="hover" variant="body2">Site Map</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
