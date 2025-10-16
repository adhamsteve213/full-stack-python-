import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import AppleIcon from '@mui/icons-material/Apple';
import { useAuth } from './AuthContext';
import { CartContext } from './CartContext';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Cart', path: '/cart' },
  { name: 'My Orders', path: '/my-orders' },
  { name: 'Wishlist', path: '/wishlist' },
  { name: 'Contact', path: '/contact' },
  { name: 'About', path: '/about' },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { token, logout } = useAuth();
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const isLoggedIn = !!token;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Apple Store
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} component={RouterLink} to={page.path} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name === 'Cart' ? `${page.name} (${totalItems})` : page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AppleIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Apple Store
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name === 'Cart' ? `${page.name} (${totalItems})` : page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }}
            />
            <IconButton onClick={handleSearch} sx={{ color: 'white' }}>
              <SearchIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!isLoggedIn ? (
              <>
                <Tooltip title="Login">
                  <IconButton
                    component={RouterLink}
                    to="/login"
                    sx={{ color: 'white' }}
                  >
                    <PersonOutlineIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Signup">
                  <IconButton
                    component={RouterLink}
                    to="/register"
                    sx={{ color: 'white' }}
                  >
                    <PersonAddIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Profile">
                  <IconButton
                    component={RouterLink}
                    to="/profile"
                    sx={{ color: 'white' }}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                  <IconButton onClick={handleLogout} sx={{ color: 'white' }}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
