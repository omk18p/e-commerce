import { Stack, TextField, Typography ,Button, Menu, MenuItem, Select, Grid, FormControl, Radio, Paper, IconButton, Box, useTheme, useMediaQuery} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState } from 'react'
import { Cart } from '../../cart/components/Cart'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addAddressAsync, selectAddressStatus, selectAddresses } from '../../address/AddressSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import { Link, useNavigate } from 'react-router-dom'
import { createOrderAsync, selectCurrentOrder, selectOrderStatus } from '../../order/OrderSlice'
import { resetCartByUserIdAsync, selectCartItems } from '../../cart/CartSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SHIPPING, TAXES } from '../../../constants'
import {motion} from 'framer-motion'


export const Checkout = () => {

    const status=''
    const addresses=useSelector(selectAddresses)
    const [selectedAddress,setSelectedAddress]=useState(addresses[0])
    const [selectedPaymentMethod,setSelectedPaymentMethod]=useState('')
    const [hasSelectedPayment,setHasSelectedPayment]=useState(false)
    const { register, handleSubmit, watch, reset,formState: { errors }} = useForm()
    const dispatch=useDispatch()
    const loggedInUser=useSelector(selectLoggedInUser)
    const addressStatus=useSelector(selectAddressStatus)
    const navigate=useNavigate()
    const cartItems=useSelector(selectCartItems)
    const orderStatus=useSelector(selectOrderStatus)
    const currentOrder=useSelector(selectCurrentOrder)
    const orderTotal=cartItems.reduce((acc,item)=>(item.product.price*item.quantity)+acc,0)
    const theme=useTheme()
    const is900=useMediaQuery(theme.breakpoints.down(900))
    const is480=useMediaQuery(theme.breakpoints.down(480))
    
    useEffect(()=>{
        if(addressStatus==='fulfilled'){
            reset()
        }
        else if(addressStatus==='rejected'){
            alert('Error adding your address')
        }
    },[addressStatus])

    useEffect(()=>{
        if(currentOrder && currentOrder?._id){
            dispatch(resetCartByUserIdAsync(loggedInUser?._id))
            navigate(`/order-success/${currentOrder?._id}`)
        }
    },[currentOrder])
    
    // Set default payment method
    useEffect(() => {
        if (!hasSelectedPayment) {
            setSelectedPaymentMethod('COD')
            setHasSelectedPayment(true)
        }
    }, [])
    
    const handleAddAddress=(data)=>{
        const address={...data,user:loggedInUser._id}
        dispatch(addAddressAsync(address))
    }

    const handleCreateOrder=()=>{
        if (!selectedAddress) {
            alert('Please select an address first')
            return
        }
        if (!hasSelectedPayment) {
            alert('Please select a payment method first')
            return
        }
        const order={user:loggedInUser._id,item:cartItems,address:selectedAddress,paymentMode:selectedPaymentMethod,total:orderTotal+SHIPPING+TAXES}
        dispatch(createOrderAsync(order))
    }

  return (
    <Stack 
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A0A1A 0%, #1A0B2E 25%, #2D1B69 50%, #1A0B2E 75%, #0A0A1A 100%)',
        color: '#ffffff',
        p: 2,
        pt: 4,
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
      flexDirection={'row'} 
      rowGap={10} 
      justifyContent={'center'} 
      flexWrap={'wrap'} 
      pb={'5rem'} 
      columnGap={4} 
      alignItems={'flex-start'}
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
        {[...Array(25)].map((_, i) => (
          <Box
            key={`checkout-star-${i}`}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              background: '#A78BFA',
              borderRadius: '50%',
              animation: `checkout-twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              '@keyframes checkout-twinkle': {
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
        {[...Array(8)].map((_, i) => (
          <Box
            key={`checkout-sparkle-${i}`}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'radial-gradient(circle, #FFFFFF 30%, rgba(139, 92, 246, 0.8) 70%)',
              borderRadius: '50%',
              animation: `checkout-sparkle ${4 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              '@keyframes checkout-sparkle': {
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

        {/* left box */}
        <Stack rowGap={4} sx={{ width: is900 ? '100%' : 'auto', position: 'relative', zIndex: 2 }}>

            {/* heading */}
            <Stack flexDirection={'row'} columnGap={is480?0.3:1} alignItems={'center'}>
                <motion.div whileHover={{x:-5}}>
                    <IconButton 
                      component={Link} 
                      to={"/cart"}
                      sx={{
                        color: '#8B5CF6',
                        '&:hover': {
                          color: '#A78BFA',
                          transform: 'scale(1.1)',
                          background: 'rgba(139, 92, 246, 0.1)',
                        }
                      }}
                    >
                      <ArrowBackIcon fontSize={is480?"medium":'large'}/>
                    </IconButton>
                </motion.div>
                <Typography 
                  variant='h4' 
                  sx={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700,
                    textShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  Shipping Information
                </Typography>
            </Stack>

            {/* address form */}
            <Stack 
              component={'form'} 
              noValidate 
              rowGap={2} 
              onSubmit={handleSubmit(handleAddAddress)}
              sx={{
                background: 'rgba(26, 26, 46, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: 3,
                p: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            >
                    <Stack>
                        <Typography sx={{ color: '#E0E7FF', fontWeight: 600, mb: 1 }} gutterBottom>Type</Typography>
                        <TextField 
                          placeholder='Eg. Home, Business' 
                          {...register("type",{required:true})}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#FFFFFF',
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
                              '& input::placeholder': {
                                color: '#94A3B8',
                              }
                            }
                          }}
                        />
                    </Stack>

                    <Stack>
                        <Typography sx={{ color: '#E0E7FF', fontWeight: 600, mb: 1 }} gutterBottom>Street</Typography>
                        <TextField 
                          {...register("street",{required:true})}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#FFFFFF',
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
                              '& input::placeholder': {
                                color: '#94A3B8',
                              }
                            }
                          }}
                        />
                    </Stack>

                    <Stack>
                        <Typography sx={{ color: '#E0E7FF', fontWeight: 600, mb: 1 }} gutterBottom>Country</Typography>
                        <TextField 
                          {...register("country",{required:true})}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#FFFFFF',
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
                              '& input::placeholder': {
                                color: '#94A3B8',
                              }
                            }
                          }}
                        />
                    </Stack>

                    <Stack>
                        <Typography sx={{ color: '#E0E7FF', fontWeight: 600, mb: 1 }} gutterBottom>Phone Number</Typography>
                        <TextField 
                          type='number' 
                          {...register("phoneNumber",{required:true})}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#FFFFFF',
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
                              '& input::placeholder': {
                                color: '#94A3B8',
                              }
                            }
                          }}
                        />
                    </Stack>

                    <Stack flexDirection={'row'} columnGap={2}>
                        <Stack width={'100%'}>
                            <Typography sx={{ color: '#E0E7FF', fontWeight: 600, mb: 1 }} gutterBottom>City</Typography>
                            <TextField  
                              {...register("city",{required:true})}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  color: '#FFFFFF',
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
                                  '& input::placeholder': {
                                    color: '#94A3B8',
                                  }
                                }
                              }}
                            />
                        </Stack>
                        <Stack width={'100%'}>
                            <Typography sx={{ color: '#E0E7FF', fontWeight: 600, mb: 1 }} gutterBottom>State</Typography>
                            <TextField  
                              {...register("state",{required:true})}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  color: '#FFFFFF',
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
                                  '& input::placeholder': {
                                    color: '#94A3B8',
                                  }
                                }
                              }}
                            />
                        </Stack>
                        <Stack width={'100%'}>
                            <Typography sx={{ color: '#E0E7FF', fontWeight: 600, mb: 1 }} gutterBottom>Postal Code</Typography>
                            <TextField 
                              type='number' 
                              {...register("postalCode",{required:true})}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  color: '#FFFFFF',
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
                                  '& input::placeholder': {
                                    color: '#94A3B8',
                                  }
                                }
                              }}
                            />
                        </Stack>
                    </Stack>

                    <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={1}>
                        <LoadingButton 
                          loading={status==='pending'} 
                          type='submit' 
                          variant='contained'
                          sx={{
                            background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                            color: '#FFFFFF',
                            fontWeight: 600,
                            '&:hover': {
                              background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
                            }
                          }}
                        >
                          Add Address
                        </LoadingButton>
                        <Button 
                          color='error' 
                          variant='outlined' 
                          onClick={()=>reset()}
                          sx={{
                            borderColor: '#EF4444',
                            color: '#EF4444',
                            '&:hover': {
                              borderColor: '#F87171',
                              color: '#F87171',
                              background: 'rgba(239, 68, 68, 0.1)'
                            }
                          }}
                        >
                          Reset
                        </Button>
                    </Stack>
            </Stack>

            {/* existing address */}
            <Stack rowGap={3}>

                <Stack>
                    <Typography 
                      variant='h6' 
                      sx={{ 
                        color: '#FFFFFF', 
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      Address
                    </Typography>
                    <Typography sx={{ color: '#94A3B8' }} variant='body2'>Choose from existing Addresses</Typography>
                    {!selectedAddress && (
                      <Typography sx={{ color: '#EF4444', fontSize: '0.9rem', mt: 1 }} variant='body2'>
                        ⚠️ Please select an address first
                      </Typography>
                    )}
                </Stack>

                <Grid container gap={2} width={is900?"auto":'50rem'} justifyContent={'flex-start'} alignContent={'flex-start'}>
                        {
                            addresses.map((address,index)=>(
                                <FormControl item key={address._id}>
                                    <Stack 
                                      p={is480?2:2} 
                                      width={is480?'100%':'20rem'} 
                                      height={is480?'auto':'15rem'}  
                                      rowGap={2} 
                                      component={Paper} 
                                      elevation={0}
                                      sx={{
                                        background: 'rgba(26, 26, 46, 0.85)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(139, 92, 246, 0.2)',
                                        borderRadius: 2,
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                          transform: 'translateY(-5px)',
                                          boxShadow: '0 12px 40px rgba(139, 92, 246, 0.2)',
                                          borderColor: '#8B5CF6'
                                        }
                                      }}
                                    >

                                        <Stack flexDirection={'row'} alignItems={'center'}>
                                            <Radio 
                                              checked={selectedAddress===address} 
                                              name='addressRadioGroup' 
                                              value={selectedAddress} 
                                              onChange={(e)=>setSelectedAddress(addresses[index])}
                                              sx={{
                                                color: '#8B5CF6',
                                                '&.Mui-checked': {
                                                  color: '#8B5CF6',
                                                }
                                              }}
                                            />
                                            <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>{address.type}</Typography>
                                        </Stack>

                                        {/* details */}
                                        <Stack>
                                            <Typography sx={{ color: '#FFFFFF' }}>{address.street}</Typography>
                                            <Typography sx={{ color: '#94A3B8' }}>{address.state}, {address.city}, {address.country}, {address.postalCode}</Typography>
                                            <Typography sx={{ color: '#94A3B8' }}>{address.phoneNumber}</Typography>
                                        </Stack>
                                    </Stack>
                                </FormControl>
                            ))
                        }
                </Grid>

            </Stack>
            
            {/* payment methods */}
            <Stack rowGap={3}>

                    <Stack>
                        <Typography 
                          variant='h6' 
                          sx={{ 
                            color: '#FFFFFF', 
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}
                        >
                          Payment Methods
                        </Typography>
                        <Typography sx={{ color: '#94A3B8' }} variant='body2'>Please select a payment method</Typography>
                        {!hasSelectedPayment && (
                          <Typography sx={{ color: '#EF4444', fontSize: '0.9rem', mt: 1 }} variant='body2'>
                            ⚠️ Please select a payment method first
                          </Typography>
                        )}
                    </Stack>
                    
                    <Stack 
                      rowGap={2}
                      sx={{
                        background: 'rgba(26, 26, 46, 0.85)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: 2,
                        p: 3,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                      }}
                    >

                        <Stack flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                            <Radio 
                              value={selectedPaymentMethod} 
                              name='paymentMethod' 
                              checked={selectedPaymentMethod==='COD'} 
                              onChange={()=>{
                                setSelectedPaymentMethod('COD')
                                setHasSelectedPayment(true)
                              }}
                              sx={{
                                color: '#8B5CF6',
                                '&.Mui-checked': {
                                  color: '#8B5CF6',
                                }
                              }}
                            />
                            <Typography sx={{ color: '#FFFFFF', fontWeight: 500 }}>Cash on Delivery</Typography>
                        </Stack>

                        <Stack flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                            <Radio 
                              value={selectedPaymentMethod} 
                              name='paymentMethod' 
                              checked={selectedPaymentMethod==='CARD'} 
                              onChange={()=>{
                                setSelectedPaymentMethod('CARD')
                                setHasSelectedPayment(true)
                              }}
                              sx={{
                                color: '#8B5CF6',
                                '&.Mui-checked': {
                                  color: '#8B5CF6',
                                }
                              }}
                            />
                            <Typography sx={{ color: '#FFFFFF', fontWeight: 500 }}>Credit/Debit Card</Typography>
                        </Stack>

                    </Stack>


            </Stack>
        </Stack>

        {/* right box */}
        <Stack  
          width={is900?'100%':'auto'} 
          alignItems={is900?'flex-start':''}
          sx={{
            background: 'rgba(26, 26, 46, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: 3,
            p: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            zIndex: 2
          }}
        >
            <Typography 
              variant='h4' 
              sx={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                mb: 2
              }}
            >
              Order Summary
            </Typography>
            <Cart checkout={true}/>
            <LoadingButton 
              fullWidth 
              loading={orderStatus==='pending'} 
              variant='contained' 
              onClick={handleCreateOrder} 
              size='large'
              disabled={!selectedAddress || !hasSelectedPayment}
              sx={{
                background: !selectedAddress || !hasSelectedPayment 
                  ? 'linear-gradient(135deg, #64748B 0%, #94A3B8 100%)' 
                  : 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
                mt: 2,
                height: 56,
                fontSize: '1.1rem',
                '&:hover': {
                  background: !selectedAddress || !hasSelectedPayment 
                    ? 'linear-gradient(135deg, #64748B 0%, #94A3B8 100%)' 
                    : 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                  transform: !selectedAddress || !hasSelectedPayment ? 'none' : 'translateY(-2px)',
                  boxShadow: !selectedAddress || !hasSelectedPayment ? 'none' : '0 8px 25px rgba(139, 92, 246, 0.4)'
                }
              }}
            >
              {!selectedAddress || !hasSelectedPayment 
                ? 'Please select address and payment method' 
                : 'Pay and Order'
              }
            </LoadingButton>
        </Stack>

    </Stack>
  )
}
