import { Box, Button, Grid, IconButton, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useDispatch,useSelector} from 'react-redux'
import { createWishlistItemAsync, deleteWishlistItemByIdAsync, resetWishlistFetchStatus, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, resetWishlistItemUpdateStatus, selectWishlistFetchStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItemUpdateStatus, selectWishlistItems, updateWishlistItemByIdAsync } from '../WishlistSlice'
import {ProductCard} from '../../products/components/ProductCard'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { emptyWishlistAnimation, loadingAnimation } from '../../../assets';
import Lottie from 'lottie-react' 
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useForm } from "react-hook-form"
import {addToCartAsync, resetCartItemAddStatus, selectCartItemAddStatus, selectCartItems} from '../../cart/CartSlice'
import { motion } from 'framer-motion';

export const Wishlist = () => {

  const dispatch=useDispatch()
  const wishlistItems=useSelector(selectWishlistItems)
  const wishlistItemAddStatus=useSelector(selectWishlistItemAddStatus)
  const wishlistItemDeleteStatus=useSelector(selectWishlistItemDeleteStatus)
  const wishlistItemUpdateStatus=useSelector(selectWishlistItemUpdateStatus)
  const loggedInUser=useSelector(selectLoggedInUser)
  const cartItems=useSelector(selectCartItems)
  const cartItemAddStatus=useSelector(selectCartItemAddStatus)
  const wishlistFetchStatus=useSelector(selectWishlistFetchStatus)

  const [editIndex,setEditIndex]=useState(-1)
  const [editValue,setEditValue]=useState('')
  const {register,handleSubmit,watch,formState: { errors }} = useForm()

  const theme=useTheme()
  const is1130=useMediaQuery(theme.breakpoints.down(1130))
  const is642=useMediaQuery(theme.breakpoints.down(642))
  const is480=useMediaQuery(theme.breakpoints.down(480))
  
  const handleAddRemoveFromWishlist=(e,productId)=>{
    if(e.target.checked){
        const data={user:loggedInUser?._id,product:productId}
        dispatch(createWishlistItemAsync(data))
    }

    else if(!e.target.checked){
        const index=wishlistItems.findIndex((item)=>item.product._id===productId)
        dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
    }
  } 

  useEffect(()=>{
    window.scrollTo({
        top:0,
        behavior:"instant"
    })
  },[])

  useEffect(()=>{
    if(wishlistItemAddStatus==='fulfilled'){
        toast.success("Product added to wishlist")
    }
    else if(wishlistItemAddStatus==='rejected'){
        toast.error("Error adding product to wishlist, please try again later")
    }


  },[wishlistItemAddStatus])

  useEffect(()=>{
    if(wishlistItemDeleteStatus==='fulfilled'){
        toast.success("Product removed from wishlist")
    }
    else if(wishlistItemDeleteStatus==='rejected'){
        toast.error("Error removing product from wishlist, please try again later")
    }

  },[wishlistItemDeleteStatus])


  useEffect(()=>{
    if(wishlistItemUpdateStatus==='fulfilled'){
      toast.success("Wislist item updated")
    }
    else if(wishlistItemUpdateStatus==='rejected'){
      toast.error("Error updating wishlist item")
    }

    setEditIndex(-1)
    setEditValue("")

  },[wishlistItemUpdateStatus])

  useEffect(()=>{

    if(cartItemAddStatus==='fulfilled'){
        toast.success("Product added to cart")
    }

    else if(cartItemAddStatus==='rejected'){
        toast.error('Error adding product to cart, please try again later')
    }

},[cartItemAddStatus])


  useEffect(()=>{
    if(wishlistFetchStatus==='rejected'){
      toast.error("Error fetching wishlist, please try again later")
    }
  },[wishlistFetchStatus])

  useEffect(()=>{
    return ()=>{
      dispatch(resetWishlistFetchStatus())
      dispatch(resetCartItemAddStatus())
      dispatch(resetWishlistItemUpdateStatus())
      dispatch(resetWishlistItemDeleteStatus())
      dispatch(resetWishlistItemAddStatus())
    }
  },[])

  const handleNoteUpdate=(wishlistItemId)=>{
    const update={_id:wishlistItemId,note:editValue}
    dispatch(updateWishlistItemByIdAsync(update))
  }

  const handleEdit=(index)=>{
    setEditValue(wishlistItems[index].note)
    setEditIndex(index)
  }

  const handleAddToCart=(productId)=>{
    const data={user:loggedInUser?._id,product:productId}
    dispatch(addToCartAsync(data))
  }


  return (
    // parent
    <Stack 
      justifyContent={'flex-start'} 
      alignItems={'center'}
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A0A1A 0%, #1A0B2E 25%, #2D1B69 50%, #1A0B2E 75%, #0A0A1A 100%)',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: is480 ? 3 : 5,
        paddingBottom: '14rem',
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
        {[...Array(18)].map((_, i) => (
          <Box
            key={`wishlist-star-${i}`}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              background: '#A78BFA',
              borderRadius: '50%',
              animation: `wishlist-twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              '@keyframes wishlist-twinkle': {
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
        {[...Array(5)].map((_, i) => (
          <Box
            key={`wishlist-sparkle-${i}`}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'radial-gradient(circle, #FFFFFF 30%, rgba(139, 92, 246, 0.8) 70%)',
              borderRadius: '50%',
              animation: `wishlist-sparkle ${4 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              '@keyframes wishlist-sparkle': {
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

        {
          wishlistFetchStatus==='pending'?
          <Stack width={is480?'auto':'25rem'} height={'calc(100vh - 4rem)'} justifyContent={'center'} alignItems={'center'} sx={{ position: 'relative', zIndex: 2 }}>
                <Lottie animationData={loadingAnimation}/>
          </Stack>
          :

        <Stack width={is1130?"auto":'70rem'} rowGap={is480?2:4} sx={{ position: 'relative', zIndex: 2 }}>

            {/* heading area and back button */}
            <Stack alignSelf={'flex-start'} flexDirection={'row'} columnGap={1} justifyContent={'center'} alignItems={'center'}>
                <motion.div whileHover={{x:-5}}>
                  <IconButton 
                    component={Link} 
                    to={'/'}
                    sx={{
                      color: '#8B5CF6',
                      '&:hover': {
                        color: '#A78BFA',
                        transform: 'scale(1.1)',
                      }
                    }}
                  >
                    <ArrowBackIcon fontSize={is480?'medium':'large'}/>
                  </IconButton>
                </motion.div>
                <Typography 
                  variant='h4' 
                  fontWeight={500}
                  sx={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
                  }}
                >
                  Your wishlist
                </Typography>
            </Stack>

            {/* product grid */}
            <Stack >

              {
                !wishlistFetchStatus==='pending' && wishlistItems?.length===0?(
                  // empty wishlist animation
                  <Stack 
                    minHeight={'60vh'} 
                    width={is642?'auto':'40rem'} 
                    justifySelf={'center'}  
                    alignSelf={'center'} 
                    justifyContent={'center'} 
                    alignItems={'center'}
                    sx={{
                      background: 'rgba(26, 26, 46, 0.85)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: 3,
                      p: 4,
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <Lottie animationData={emptyWishlistAnimation}/>
                    <Typography 
                      variant='h6' 
                      fontWeight={300}
                      sx={{ color: '#E0E7FF', textAlign: 'center' }}
                    >
                      You have no items in your wishlist
                    </Typography>
                  </Stack>
                ):
                // wishlist grid
                <Grid container gap={1} justifyContent={'center'} alignContent={'center'}>
                  {
                    wishlistItems.map((item,index)=>(
                      <Stack 
                        component={is480?"":Paper} 
                        elevation={1}
                        sx={{
                          background: 'rgba(26, 26, 46, 0.85)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          borderRadius: 3,
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        }}
                      >

                          <ProductCard item key={item._id} brand={item.product.brand.name} id={item.product._id} price={item.product.price} stockQuantity={item.product.stockQuantity} thumbnail={item.product.thumbnail} title={item.product.title} handleAddRemoveFromWishlist={handleAddRemoveFromWishlist} isWishlistCard={true}/>
                        
                        <Stack paddingLeft={2} paddingRight={2} paddingBottom={2}>

                          {/* note heading and icon */}
                          <Stack flexDirection={'row'} alignItems={'center'}>
                            <Typography 
                              variant='h6' 
                              fontWeight={400}
                              sx={{ color: '#FFFFFF' }}
                            >
                              Note
                            </Typography>
                            <IconButton 
                              onClick={()=>handleEdit(index)}
                              sx={{
                                color: '#8B5CF6',
                                '&:hover': {
                                  color: '#A78BFA',
                                  transform: 'scale(1.1)',
                                }
                              }}
                            >
                              <EditOutlinedIcon/>
                            </IconButton>
                          </Stack>

                          {
                            editIndex===index?(

                              <Stack rowGap={2}>
                                
                                <TextField 
                                  multiline 
                                  rows={4} 
                                  value={editValue} 
                                  onChange={(e)=>setEditValue(e.target.value)}
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: 2,
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
                                      '& .MuiInputBase-input': {
                                        color: '#FFFFFF',
                                      },
                                      '& .MuiInputBase-input::placeholder': {
                                        color: '#94A3B8',
                                      },
                                    },
                                  }}
                                />
                                
                                <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={1}>
                                    <Button 
                                      onClick={()=>handleNoteUpdate(item._id)} 
                                      size='small' 
                                      variant='contained'
                                      sx={{
                                        background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                                        '&:hover': {
                                          background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                                        }
                                      }}
                                    >
                                      Update
                                    </Button>
                                    <Button 
                                      onClick={()=>setEditIndex(-1)} 
                                      size='small' 
                                      variant='outlined' 
                                      color='error'
                                      sx={{
                                        borderColor: '#EF4444',
                                        color: '#EF4444',
                                        '&:hover': {
                                          borderColor: '#F87171',
                                          color: '#F87171',
                                          background: 'rgba(239, 68, 68, 0.1)',
                                        }
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                </Stack>

                              </Stack>
                            ):
                            <Box>
                              <Typography 
                                sx={{
                                  wordWrap:"break-word",
                                  color: item.note ? '#E0E7FF' : '#94A3B8'
                                }}
                              >
                                {item.note ? item.note : "Add a custom note here"}
                              </Typography>
                            </Box>
                          }

                          {
                            cartItems.some((cartItem)=>cartItem.product._id===item.product._id)?
                            <Button 
                              sx={{mt:4}} 
                              size='small' 
                              variant='outlined' 
                              component={Link} 
                              to={'/cart'}
                              sx={{
                                borderColor: '#10B981',
                                color: '#10B981',
                                '&:hover': {
                                  borderColor: '#34D399',
                                  color: '#34D399',
                                  background: 'rgba(16, 185, 129, 0.1)',
                                }
                              }}
                            >
                              Already in cart
                            </Button>
                            :
                            <Button 
                              sx={{mt:4}} 
                              size='small' 
                              onClick={()=>handleAddToCart(item.product._id)} 
                              variant='outlined'
                              sx={{
                                borderColor: '#8B5CF6',
                                color: '#8B5CF6',
                                '&:hover': {
                                  borderColor: '#A78BFA',
                                  color: '#A78BFA',
                                  background: 'rgba(139, 92, 246, 0.1)',
                                }
                              }}
                            >
                              Add To Cart
                            </Button>
                          }
                          
                          
                        </Stack>
                      </Stack>
                    ))
                  }
                </Grid>
              }
            </Stack>
        
        </Stack>
        }
        
    </Stack>
  )
}
