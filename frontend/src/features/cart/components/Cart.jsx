import React, { useEffect } from 'react'
import { CartItem } from './CartItem'
import { Button, Chip, Paper, Stack, Typography, useMediaQuery, useTheme, Fab, Badge, Box } from '@mui/material'
import { resetCartItemRemoveStatus, selectCartItemRemoveStatus, selectCartItems } from '../CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SHIPPING, TAXES } from '../../../constants'
import { toast } from 'react-toastify'
import {motion} from 'framer-motion'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { selectLoggedInUser } from '../../auth/AuthSlice'

export const Cart = ({checkout}) => {
    const items=useSelector(selectCartItems)
    const subtotal=items.reduce((acc,item)=>item.product.price*item.quantity+acc,0)
    const totalItems=items.reduce((acc,item)=>acc+item.quantity,0)
    const navigate=useNavigate()
    const theme=useTheme()
    const is900=useMediaQuery(theme.breakpoints.down(900))
    const loggedInUser = useSelector(selectLoggedInUser)

    const cartItemRemoveStatus=useSelector(selectCartItemRemoveStatus)
    const dispatch=useDispatch()

    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
        })
    },[])

    useEffect(()=>{
        if(items.length===0){
            navigate("/")
        }
    },[items])

    useEffect(()=>{
        if(cartItemRemoveStatus==='fulfilled'){
            toast.success("Product removed from cart")
        }
        else if(cartItemRemoveStatus==='rejected'){
            toast.error("Error removing product from cart, please try again later")
        }
    },[cartItemRemoveStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(resetCartItemRemoveStatus())
        }
    },[])

  return (
    <>
    <Stack 
      justifyContent={'flex-start'} 
      alignItems={'center'} 
      sx={{
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0A0A1A 0%, #1A0B2E 25%, #2D1B69 50%, #1A0B2E 75%, #0A0A1A 100%)',
        color: '#FFFFFF',
        pt: 4,
        pb: '5rem',
        position: 'relative',
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
            url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A78BFA' fill-opacity='0.02'%3E%3Ccircle cx='60' cy='60' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C4B5FD' fill-opacity='0.015'%3E%3Ccircle cx='90' cy='90' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
      {/* Animated Stars Background */}
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
        {/* Small Stars */}
        {[...Array(20)].map((_, i) => (
          <Box
            key={`cart-star-${i}`}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              background: '#A78BFA',
              borderRadius: '50%',
              animation: `cart-twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              '@keyframes cart-twinkle': {
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
        
        {/* Sparkle Stars */}
        {[...Array(6)].map((_, i) => (
          <Box
            key={`cart-sparkle-${i}`}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'radial-gradient(circle, #FFFFFF 30%, rgba(139, 92, 246, 0.8) 70%)',
              borderRadius: '50%',
              animation: `cart-sparkle ${4 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              '@keyframes cart-sparkle': {
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

        <Stack 
          width={is900?'auto':'50rem'} 
          mt={'3rem'} 
          paddingLeft={checkout?0:3} 
          paddingRight={checkout?0:3} 
          rowGap={4} 
          sx={{maxWidth: '100%', position: 'relative', zIndex: 2}}
        >

            {/* cart items */}
            <Stack rowGap={2}>
            {
                items && items.map((item)=>(
                    <CartItem key={item._id} id={item._id} title={item.product.title} brand={item.product.brand.name} category={item.product.category.name} price={item.product.price} quantity={item.quantity} thumbnail={item.product.thumbnail} stockQuantity={item.product.stockQuantity} productId={item.product._id}/>
                ))
            }
            </Stack>
            
            {/* subtotal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Stack 
                sx={{
                  background: 'rgba(26, 26, 46, 0.85)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: 3,
                  p: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
                flexDirection={'row'} 
                justifyContent={'space-between'} 
                alignItems={'center'}
              >

                  {
                      checkout?(
                          <Stack rowGap={2} width={'100%'}>

                              <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                  <Typography sx={{ color: '#E0E7FF', fontWeight: 600 }}>Subtotal</Typography>
                                  <Typography sx={{ color: '#8B5CF6', fontWeight: 700 }}>${subtotal}</Typography>
                              </Stack>

                              <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                  <Typography sx={{ color: '#E0E7FF', fontWeight: 600 }}>Shipping</Typography>
                                  <Typography sx={{ color: '#8B5CF6', fontWeight: 700 }}>${SHIPPING}</Typography>
                              </Stack>

                              <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                  <Typography sx={{ color: '#E0E7FF', fontWeight: 600 }}>Taxes</Typography>
                                  <Typography sx={{ color: '#8B5CF6', fontWeight: 700 }}>${TAXES}</Typography> 
                              </Stack>

                              <hr style={{ borderColor: 'rgba(139, 92, 246, 0.3)', borderWidth: '1px' }}/>

                              <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                  <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.2rem' }}>Total</Typography>
                                  <Typography sx={{ color: '#8B5CF6', fontWeight: 800, fontSize: '1.3rem', textShadow: '0 0 10px rgba(139, 92, 246, 0.3)' }}>
                                    ${subtotal+SHIPPING+TAXES}
                                  </Typography>
                              </Stack>
                              

                          </Stack>
                      ):(
                          <>
                              <Stack>
                                  <Typography variant='h6' fontWeight={600} sx={{color: '#FFFFFF'}}>Subtotal</Typography>
                                  <Typography sx={{color: '#94A3B8', fontWeight: 500}}>Total items in cart {totalItems}</Typography>
                                  <Typography sx={{color: '#94A3B8', fontWeight: 500}}>Shipping and taxes will be calculated at checkout.</Typography>
                              </Stack>

                              <Stack>
                                  <Typography 
                                    variant='h5' 
                                    fontWeight={700} 
                                    sx={{
                                      color: '#8B5CF6',
                                      textShadow: '0 0 15px rgba(139, 92, 246, 0.4)',
                                      background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                                      backgroundClip: 'text',
                                      WebkitBackgroundClip: 'text',
                                      WebkitTextFillColor: 'transparent'
                                    }}
                                  >
                                    ${subtotal}
                                  </Typography>
                              </Stack>
                          </>
                      )
                  }

              </Stack>
            </motion.div>
            
            {/* checkout or continue shopping */}
            {
            !checkout && 
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Stack rowGap={'1.5rem'}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant='contained' 
                      component={Link} 
                      to='/checkout'
                      sx={{
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        borderRadius: 3,
                        py: 1.5,
                        boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                          boxShadow: '0 12px 35px rgba(139, 92, 246, 0.4)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Checkout
                    </Button>
                  </motion.div>
                  <motion.div style={{alignSelf:'center'}} whileHover={{y:2}}>
                    <Chip 
                      sx={{
                        cursor:"pointer",
                        borderRadius:"20px",
                        border: '2px solid',
                        borderColor: '#8B5CF6',
                        color: '#8B5CF6',
                        fontWeight: 600,
                        background: 'rgba(139, 92, 246, 0.1)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          backgroundColor: '#8B5CF6',
                          color: 'white',
                          boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                        }
                      }} 
                      component={Link} 
                      to={'/'} 
                      label="or continue shopping" 
                      variant='outlined'
                    />
                  </motion.div>
              </Stack>
            </motion.div>
            }
    
        </Stack>

        {/* Floating Cart Summary Widget */}
        {!checkout && items.length > 0 && (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    zIndex: 1000
                }}
            >
                <Stack
                    sx={{
                        background: 'rgba(26, 26, 46, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: 3,
                        p: 2,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                        minWidth: '200px'
                    }}
                    spacing={1}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Badge badgeContent={totalItems} color="primary">
                            <ShoppingCartIcon sx={{ color: '#8B5CF6' }} />
                        </Badge>
                        <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                            Cart Summary
                        </Typography>
                    </Stack>
                    
                    <Typography sx={{ color: '#94A3B8', fontSize: '0.9rem' }}>
                        {totalItems} item{totalItems !== 1 ? 's' : ''}
                    </Typography>
                    
                    <Typography sx={{ 
                        color: '#8B5CF6', 
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        textShadow: '0 0 10px rgba(139, 92, 246, 0.3)'
                    }}>
                        Total: ${subtotal}
                    </Typography>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            component={Link}
                            to="/checkout"
                            variant="contained"
                            size="small"
                            sx={{
                                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                                color: '#FFFFFF',
                                fontWeight: 600,
                                borderRadius: 2,
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                                    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
                                }
                            }}
                        >
                            Quick Checkout
                        </Button>
                    </motion.div>
                </Stack>
            </motion.div>
        )}

    </Stack>
    </>
  )
}
