import React from 'react';
import { Box, Typography, Grid, Card, CardContent, TextField, Button, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Contact() {
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
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#000', fontWeight: 'bold' }}>
        Contact Us
      </Typography>
      <Typography variant="h6" align="center" sx={{ mb: 4, color: '#666' }}>
        Get in touch with the Apple Store team. We're here to help!
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#000', fontWeight: 'bold' }}>
                Send us a message
              </Typography>
              <Box component="form" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Subject"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#333' },
                    width: '100%'
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#000', fontWeight: 'bold' }}>
                Contact Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 2, color: '#000' }} />
                  <Typography variant="body1">
                    123 Apple Street, Cupertino, CA 95014, USA
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ mr: 2, color: '#000' }} />
                  <Typography variant="body1">
                    +1 (800) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 2, color: '#000' }} />
                  <Typography variant="body1">
                    support@applestore.com
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, color: '#000', fontWeight: 'bold' }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <IconButton
                  onClick={() => handleSocialClick('facebook')}
                  sx={{
                    backgroundColor: '#1877f2',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#166fe5' }
                  }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleSocialClick('instagram')}
                  sx={{
                    backgroundColor: '#e4405f',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#d6336c' }
                  }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleSocialClick('twitter')}
                  sx={{
                    backgroundColor: '#1da1f2',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#1a91da' }
                  }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleSocialClick('whatsapp')}
                  sx={{
                    backgroundColor: '#25d366',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#128c7e' }
                  }}
                >
                  <WhatsAppIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#000', fontWeight: 'bold' }}>
          Store Hours
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          Monday - Friday: 9:00 AM - 9:00 PM<br />
          Saturday: 10:00 AM - 8:00 PM<br />
          Sunday: 11:00 AM - 7:00 PM
        </Typography>
      </Box>
    </Box>
  );
}

export default Contact;
