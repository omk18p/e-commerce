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
    const [selectedPaymentMethod,setSelectedPaymentMethod]=useState('cash')
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
    
    const handleAddAddress=(data)=>{
        const address={...data,user:loggedInUser._id}
        dispatch(addAddressAsync(address))
    }

    const handleCreateOrder=()=>{
        const order={user:loggedInUser._id,item:cartItems,address:selectedAddress,paymentMode:selectedPaymentMethod,total:orderTotal+SHIPPING+TAXES}
        dispatch(createOrderAsync(order))
    }

  return (
    <Stack 
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        color: '#ffffff',
        p: 2,
        pt: 4
      }}
      flexDirection={'row'} 
      rowGap={10} 
      justifyContent={'center'} 
      flexWrap={'wrap'} 
      mb={'5rem'} 
      columnGap={4} 
      alignItems={'flex-start'}
    >

        {/* left box */}
        <Stack rowGap={4} sx={{ width: is900 ? '100%' : 'auto' }}>

            {/* heading */}
            <Stack flexDirection={'row'} columnGap={is480?0.3:1} alignItems={'center'}>
                <motion.div whileHover={{x:-5}}>
                    <IconButton 
                      component={Link} 
                      to={"/cart"}
                      sx={{
                        color: '#00d4ff',
                        '&:hover': {
                          background: 'rgba(0, 212, 255, 0.1)',
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <ArrowBackIcon fontSize={is480?"medium":'large'}/>
                    </IconButton>
                </motion.div>
                <Typography 
                  variant='h4' 
                  sx={{
                    background: 'linear-gradient(45deg, #00d4ff, #ff6b6b)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700,
                    textShadow: '0 0 20px rgba(0, 212, 255, 0.3)'
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
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 3,
                p: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
                    <Stack>
                        <Typography sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }} gutterBottom>Type</Typography>
                        <TextField 
                          placeholder='Eg. Home, Business' 
                          {...register("type",{required:true})}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#ffffff',
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: '#00d4ff',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#00d4ff',
                              },
                              '& input::placeholder': {
                                color: 'rgba(255, 255, 255, 0.6)',
                              }
                            }
                          }}
                        />
                    </Stack>

                    <Stack>
                        <Typography sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }} gutterBottom>Street</Typography>
                        <TextField 
                          {...register("street",{required:true})}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#ffffff',
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: '#00d4ff',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#00d4ff',
                              },
                              '& input::placeholder': {
                                color: 'rgba(255, 255, 255, 0.6)',
                              }
                            }
                          }}
                        />
                    </Stack>

                    <Stack>
                        <Typography sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }} gutterBottom>Country</Typography>
                        <TextField 
                          {...register("country",{required:true})}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#ffffff',
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: '#00d4ff',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#00d4ff',
                              },
                              '& input::placeholder': {
                                color: 'rgba(255, 255, 255, 0.6)',
                              }
                            }
                          }}
                        />
                    </Stack>

                    <Stack>
                        <Typography sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }} gutterBottom>Phone Number</Typography>
                        <TextField 
                          type='number' 
                          {...register("phoneNumber",{required:true})}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#ffffff',
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: '#00d4ff',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#00d4ff',
                              },
                              '& input::placeholder': {
                                color: 'rgba(255, 255, 255, 0.6)',
                              }
                            }
                          }}
                        />
                    </Stack>

                    <Stack flexDirection={'row'} columnGap={2}>
                        <Stack width={'100%'}>
                            <Typography sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }} gutterBottom>City</Typography>
                            <TextField  
                              {...register("city",{required:true})}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  color: '#ffffff',
                                  '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: '#00d4ff',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#00d4ff',
                                  },
                                  '& input::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.6)',
                                  }
                                }
                              }}
                            />
                        </Stack>
                        <Stack width={'100%'}>
                            <Typography sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }} gutterBottom>State</Typography>
                            <TextField  
                              {...register("state",{required:true})}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  color: '#ffffff',
                                  '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: '#00d4ff',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#00d4ff',
                                  },
                                  '& input::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.6)',
                                  }
                                }
                              }}
                            />
                        </Stack>
                        <Stack width={'100%'}>
                            <Typography sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }} gutterBottom>Postal Code</Typography>
                            <TextField 
                              type='number' 
                              {...register("postalCode",{required:true})}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  color: '#ffffff',
                                  '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: '#00d4ff',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#00d4ff',
                                  },
                                  '& input::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.6)',
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
                            background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                            color: '#ffffff',
                            fontWeight: 600,
                            '&:hover': {
                              background: 'linear-gradient(45deg, #0099cc, #00d4ff)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 25px rgba(0, 212, 255, 0.4)'
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
                            borderColor: '#ff6b6b',
                            color: '#ff6b6b',
                            '&:hover': {
                              borderColor: '#ff4757',
                              background: 'rgba(255, 107, 107, 0.1)'
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
                        color: '#ffffff', 
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #00d4ff, #ff6b6b)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      Address
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }} variant='body2'>Choose from existing Addresses</Typography>
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
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: 2,
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                          transform: 'translateY(-5px)',
                                          boxShadow: '0 12px 40px rgba(0, 212, 255, 0.2)',
                                          borderColor: '#00d4ff'
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
                                                color: '#00d4ff',
                                                '&.Mui-checked': {
                                                  color: '#00d4ff',
                                                }
                                              }}
                                            />
                                            <Typography sx={{ color: '#ffffff', fontWeight: 600 }}>{address.type}</Typography>
                                        </Stack>

                                        {/* details */}
                                        <Stack>
                                            <Typography sx={{ color: '#ffffff' }}>{address.street}</Typography>
                                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>{address.state}, {address.city}, {address.country}, {address.postalCode}</Typography>
                                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>{address.phoneNumber}</Typography>
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
                            color: '#ffffff', 
                            fontWeight: 600,
                            background: 'linear-gradient(45deg, #00d4ff, #ff6b6b)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}
                        >
                          Payment Methods
                        </Typography>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }} variant='body2'>Please select a payment method</Typography>
                    </Stack>
                    
                    <Stack 
                      rowGap={2}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
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
                              onChange={()=>setSelectedPaymentMethod('COD')}
                              sx={{
                                color: '#00d4ff',
                                '&.Mui-checked': {
                                  color: '#00d4ff',
                                }
                              }}
                            />
                            <Typography sx={{ color: '#ffffff', fontWeight: 500 }}>Cash on Delivery</Typography>
                        </Stack>

                        <Stack flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                            <Radio 
                              value={selectedPaymentMethod} 
                              name='paymentMethod' 
                              checked={selectedPaymentMethod==='CARD'} 
                              onChange={()=>setSelectedPaymentMethod('CARD')}
                              sx={{
                                color: '#00d4ff',
                                '&.Mui-checked': {
                                  color: '#00d4ff',
                                }
                              }}
                            />
                            <Typography sx={{ color: '#ffffff', fontWeight: 500 }}>Credit/Debit Card</Typography>
                        </Stack>

                    </Stack>


            </Stack>
        </Stack>

        {/* right box */}
        <Stack  
          width={is900?'100%':'auto'} 
          alignItems={is900?'flex-start':''}
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            p: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
            <Typography 
              variant='h4' 
              sx={{
                background: 'linear-gradient(45deg, #00d4ff, #ff6b6b)',
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
              sx={{
                background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                color: '#ffffff',
                fontWeight: 600,
                mt: 2,
                height: 56,
                fontSize: '1.1rem',
                '&:hover': {
                  background: 'linear-gradient(45deg, #0099cc, #00d4ff)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 212, 255, 0.4)'
                }
              }}
            >
              Pay and Order
            </LoadingButton>
        </Stack>

    </Stack>
  )
}
