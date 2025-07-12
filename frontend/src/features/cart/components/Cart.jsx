import React, { useEffect } from 'react'
import { CartItem } from './CartItem'
import { Button, Chip, Paper, Stack, Typography, useMediaQuery, useTheme, Fab, Badge } from '@mui/material'
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
      mb={'5rem'} 
      sx={{
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
        color: '#FFFFFF',
        pt: 4
      }}
    >

        <Stack 
          width={is900?'auto':'50rem'} 
          mt={'3rem'} 
          paddingLeft={checkout?0:3} 
          paddingRight={checkout?0:3} 
          rowGap={4} 
          sx={{maxWidth: '100%'}}
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
