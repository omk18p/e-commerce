import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Chip, Stack, useMediaQuery, useTheme, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';
import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { motion } from 'framer-motion';


export const Navbar=({isProductList=false})=> {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const userInfo=useSelector(selectUserInfo)
  const cartItems=useSelector(selectCartItems)
  const loggedInUser=useSelector(selectLoggedInUser)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const theme=useTheme()
  const is480=useMediaQuery(theme.breakpoints.down(480))
  const is600=useMediaQuery(theme.breakpoints.down(600))

  const wishlistItems=useSelector(selectWishlistItems)
  const isProductFilterOpen=useSelector(selectProductIsFilterOpen)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters=()=>{
    dispatch(toggleFilters())
  }



  const handleClearSearch = () => {
    setSearchQuery('');
    // Clear search and navigate to home
    navigate('/');
  };

  // Real-time search as user types
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim()) {
      // Navigate with search query
      navigate(`/?search=${encodeURIComponent(value.trim())}`);
    } else {
      // Show all products when search is empty
      navigate('/');
    }
  };

  const settings = [
    {name:"Home",to:"/"},
    {name:'Profile',to:loggedInUser?.isAdmin?"/admin/profile":"/profile"},
    {name:loggedInUser?.isAdmin?'Orders':'My orders',to:loggedInUser?.isAdmin?"/admin/orders":"/orders"},
    {name:'Logout',to:"/logout"},
  ];

  return (
    <AppBar position="sticky" sx={{color:"text.primary"}}>
        <Toolbar sx={{p:2,height:"5rem",display:"flex",justifyContent:"space-between",maxWidth:"1400px",margin:"0 auto",width:"100%"}}>

          <Typography variant="h5" noWrap component="a" href="/" sx={{ 
            display: { xs: 'none', md: 'flex' },
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            textDecoration: 'none',
            color: '#FFFFFF',
            '&:hover': {
              color: '#8B5CF6',
            }
          }}>
            NovaMart
          </Typography>

          {/* Search Bar */}
          {!is600 && (
            <Stack 
              sx={{ 
                flex: 1,
                maxWidth: '400px',
                mx: 2,
                background: 'rgba(26, 26, 46, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: 2,
                p: 1,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              }}
            >
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: '#8B5CF6', mr: 1 }} />,
                  endAdornment: searchQuery && (
                    <IconButton
                      onClick={handleClearSearch}
                      sx={{ color: '#8B5CF6' }}
                      size="small"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  ),
                  sx: {
                    color: '#FFFFFF',
                    '& .MuiInputBase-input': {
                      color: '#FFFFFF',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#94A3B8',
                    },
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    background: 'rgba(15, 15, 35, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#8B5CF6',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#8B5CF6',
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Stack>
          )}


          <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} columnGap={3}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ 
                p: 0,
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}>
                <Avatar 
                  alt={userInfo?.name} 
                  src="null" 
                  sx={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              {
                loggedInUser?.isAdmin && 
              
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography component={Link} color={'text.primary'} sx={{textDecoration:"none"}} to="/admin/add-product" textAlign="center">Add new Product</Typography>
                </MenuItem>
              
              }
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography component={Link} color={'text.primary'} sx={{textDecoration:"none"}} to={setting.to} textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Typography variant='h6' fontWeight={500} sx={{color: '#FFFFFF'}}>
              {is480?`${userInfo?.name.toString().split(" ")[0]}`:`Hey👋, ${userInfo?.name}`}
            </Typography>
            {loggedInUser.isAdmin && (
              <Button 
                variant='contained' 
                sx={{
                  background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                  },
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}
              >
                Admin
              </Button>
            )}
            <Stack sx={{flexDirection:"row",columnGap:"1.5rem",alignItems:"center",justifyContent:"center"}}>

            
            <Badge badgeContent={cartItems?.length || 0} color='error'>
              <IconButton 
                onClick={()=>navigate("/cart")}
                sx={{
                  color: '#8B5CF6',
                  '&:hover': {
                    color: '#A78BFA',
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Badge>
            
            {
              !loggedInUser?.isAdmin &&
                  <Stack>
                      <Badge badgeContent={wishlistItems?.length} color='error'>
                          <IconButton 
                            component={Link} 
                            to={"/wishlist"}
                            sx={{
                              color: '#EF4444',
                              '&:hover': {
                                color: '#F87171',
                                transform: 'scale(1.1)',
                              }
                            }}
                          >
                            <FavoriteBorderIcon />
                          </IconButton>
                      </Badge>
                  </Stack>
            }
            {
              isProductList && (
                <IconButton 
                  onClick={handleToggleFilters}
                  sx={{
                    color: isProductFilterOpen ? "#8B5CF6" : "#94A3B8",
                    '&:hover': {
                      color: '#8B5CF6',
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  <TuneIcon />
                </IconButton>
              )
            }
            
            </Stack>
          </Stack>
        </Toolbar>
    </AppBar>
  );
}