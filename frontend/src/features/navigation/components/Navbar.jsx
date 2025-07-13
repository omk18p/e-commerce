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
import { Badge, Button, Chip, Stack, useMediaQuery, useTheme, TextField, Box } from '@mui/material';
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
    <Box sx={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      background: 'linear-gradient(135deg, #0A0A1A 0%, #1A0B2E 25%, #2D1B69 50%, #1A0B2E 75%, #0A0A1A 100%)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 60% 60%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 10% 30%, rgba(147, 51, 234, 0.06) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        zIndex: 0,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B5CF6' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A78BFA' fill-opacity='0.02'%3E%3Ccircle cx='60' cy='60' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `,
        pointerEvents: 'none',
        zIndex: 0,
      }
    }}>
      <AppBar 
        position="static" 
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
      {/* Animated Stars for Navbar */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}>
        {/* Small Stars for Navbar */}
        {[...Array(12)].map((_, i) => (
          <Box
            key={`navbar-star-${i}`}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              background: '#A78BFA',
              borderRadius: '50%',
              animation: `navbar-twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              '@keyframes navbar-twinkle': {
                '0%, 100%': {
                  opacity: 0.2,
                  transform: 'scale(1)',
                },
                '50%': {
                  opacity: 1,
                  transform: 'scale(1.5)',
                },
              },
            }}
          />
        ))}
        
        {/* Sparkle Stars for Navbar */}
        {[...Array(4)].map((_, i) => (
          <Box
            key={`navbar-sparkle-${i}`}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'radial-gradient(circle, #FFFFFF 30%, rgba(139, 92, 246, 0.8) 70%)',
              borderRadius: '50%',
              animation: `navbar-sparkle ${4 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              '@keyframes navbar-sparkle': {
                '0%, 100%': {
                  opacity: 0.3,
                  transform: 'scale(0.8) rotate(0deg)',
                  boxShadow: '0 0 4px rgba(255, 255, 255, 0.3)',
                },
                '50%': {
                  opacity: 1,
                  transform: 'scale(1.3) rotate(180deg)',
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 12px rgba(139, 92, 246, 0.6)',
                },
              },
            }}
          />
        ))}
      </Box>

      <Toolbar sx={{
        p: 2,
        height: "5rem",
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
        position: 'relative',
        zIndex: 2,
      }}>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h5" 
            noWrap 
            component="a" 
            href="/" 
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800, 
              letterSpacing: '-0.02em', 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            NovaMart
          </Typography>
        </motion.div>

        {/* Search Bar */}
        {!is600 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Stack 
              sx={{ 
                flex: 1,
                maxWidth: '400px',
                mx: 2,
                background: 'rgba(15, 15, 35, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: 3,
                p: 0.5,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: '#8B5CF6', mr: 1, fontSize: '1.2rem' }} />,
                  endAdornment: searchQuery && (
                    <IconButton
                      onClick={handleClearSearch}
                      sx={{ 
                        color: '#8B5CF6',
                        '&:hover': {
                          color: '#A78BFA',
                          transform: 'scale(1.1)',
                        }
                      }}
                      size="small"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  ),
                  sx: {
                    color: '#FFFFFF',
                    '& .MuiInputBase-input': {
                      color: '#FFFFFF',
                      fontSize: '0.95rem',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#94A3B8',
                      opacity: 0.8,
                    },
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2.5,
                    background: 'transparent',
                    border: 'none',
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
            </Stack>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} columnGap={3}>
            <Tooltip title="Open settings">
              <IconButton 
                onClick={handleOpenUserMenu} 
                sx={{ 
                  p: 0,
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <Avatar 
                  alt={userInfo?.name} 
                  src="null" 
                  sx={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(139, 92, 246, 0.5)',
                      transform: 'scale(1.05)',
                    }
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ 
                mt: '45px',
                '& .MuiPaper-root': {
                  background: 'rgba(26, 26, 46, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: 2,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                }
              }}
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
              
                <MenuItem 
                  onClick={handleCloseUserMenu}
                  sx={{
                    color: '#FFFFFF',
                    '&:hover': {
                      background: 'rgba(139, 92, 246, 0.1)',
                    }
                  }}
                >
                  <Typography 
                    component={Link} 
                    sx={{
                      textDecoration: "none",
                      color: '#FFFFFF',
                      '&:hover': {
                        color: '#8B5CF6',
                      }
                    }} 
                    to="/admin/add-product" 
                    textAlign="center"
                  >
                    Add new Product
                  </Typography>
                </MenuItem>
              
              }
              {settings.map((setting) => (
                <MenuItem 
                  key={setting} 
                  onClick={handleCloseUserMenu}
                  sx={{
                    color: '#FFFFFF',
                    '&:hover': {
                      background: 'rgba(139, 92, 246, 0.1)',
                    }
                  }}
                >
                  <Typography 
                    component={Link} 
                    sx={{
                      textDecoration: "none",
                      color: '#FFFFFF',
                      '&:hover': {
                        color: '#8B5CF6',
                      }
                    }} 
                    to={setting.to} 
                    textAlign="center"
                  >
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <Typography 
              variant='h6' 
              fontWeight={500} 
              sx={{
                color: '#FFFFFF',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              {is480?`${userInfo?.name.toString().split(" ")[0]}`:`Hey👋, ${userInfo?.name}`}
            </Typography>
            {loggedInUser.isAdmin && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant='contained' 
                  sx={{
                    background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                    },
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Admin
                </Button>
              </motion.div>
            )}
            <Stack sx={{flexDirection:"row",columnGap:"1.5rem",alignItems:"center",justifyContent:"center"}}>

            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Badge 
                badgeContent={cartItems?.length || 0} 
                color='error'
                sx={{
                  '& .MuiBadge-badge': {
                    background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
                    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)',
                  }
                }}
              >
                <IconButton 
                  onClick={()=>navigate("/cart")}
                  sx={{
                    color: '#8B5CF6',
                    background: 'rgba(139, 92, 246, 0.1)',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#A78BFA',
                      background: 'rgba(139, 92, 246, 0.2)',
                      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                    }
                  }}
                >
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Badge>
            </motion.div>
            
            {
              !loggedInUser?.isAdmin &&
                  <Stack>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Badge 
                          badgeContent={wishlistItems?.length} 
                          color='error'
                          sx={{
                            '& .MuiBadge-badge': {
                              background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
                              boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)',
                            }
                          }}
                        >
                            <IconButton 
                              component={Link} 
                              to={"/wishlist"}
                              sx={{
                                color: '#EF4444',
                                background: 'rgba(239, 68, 68, 0.1)',
                                borderRadius: '50%',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  color: '#F87171',
                                  background: 'rgba(239, 68, 68, 0.2)',
                                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                                }
                              }}
                            >
                              <FavoriteBorderIcon />
                            </IconButton>
                        </Badge>
                      </motion.div>
                  </Stack>
            }
            {
              isProductList && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton 
                    onClick={handleToggleFilters}
                    sx={{
                      color: isProductFilterOpen ? "#8B5CF6" : "#94A3B8",
                      background: isProductFilterOpen ? 'rgba(139, 92, 246, 0.2)' : 'rgba(148, 163, 184, 0.1)',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#8B5CF6',
                        background: 'rgba(139, 92, 246, 0.2)',
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                      }
                    }}
                  >
                    <TuneIcon />
                  </IconButton>
                </motion.div>
              )
            }
            
            </Stack>
          </Stack>
        </motion.div>
      </Toolbar>
    </AppBar>
    </Box>
  );
}