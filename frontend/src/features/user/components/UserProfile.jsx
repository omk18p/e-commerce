import { Avatar, Button, Paper, Stack, Typography, useTheme ,TextField, useMediaQuery} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../UserSlice'
import { addAddressAsync, resetAddressAddStatus, resetAddressDeleteStatus, resetAddressUpdateStatus, selectAddressAddStatus, selectAddressDeleteStatus, selectAddressErrors, selectAddressStatus, selectAddressUpdateStatus, selectAddresses } from '../../address/AddressSlice'
import { Address } from '../../address/components/Address'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import {toast} from 'react-toastify'

export const UserProfile = () => {

    const dispatch=useDispatch()
    const {register,handleSubmit,watch,reset,formState: { errors }} = useForm()
    const status=useSelector(selectAddressStatus)
    const userInfo=useSelector(selectUserInfo)
    const addresses=useSelector(selectAddresses)
    const theme=useTheme()
    const [addAddress,setAddAddress]=useState(false)

    
    const addressAddStatus=useSelector(selectAddressAddStatus)
    const addressUpdateStatus=useSelector(selectAddressUpdateStatus)
    const addressDeleteStatus=useSelector(selectAddressDeleteStatus)

    const is900=useMediaQuery(theme.breakpoints.down(900))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
        })
    },[])


    useEffect(()=>{
        if(addressAddStatus==='fulfilled'){
            toast.success("Address added")
        }
        else if(addressAddStatus==='rejected'){
            toast.error("Error adding address, please try again later")
        }
    },[addressAddStatus])

    useEffect(()=>{

        if(addressUpdateStatus==='fulfilled'){
            toast.success("Address updated")
        }
        else if(addressUpdateStatus==='rejected'){
            toast.error("Error updating address, please try again later")
        }
    },[addressUpdateStatus])

    useEffect(()=>{

        if(addressDeleteStatus==='fulfilled'){
            toast.success("Address deleted")
        }
        else if(addressDeleteStatus==='rejected'){
            toast.error("Error deleting address, please try again later")
        }
    },[addressDeleteStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(resetAddressAddStatus())
            dispatch(resetAddressUpdateStatus())
            dispatch(resetAddressDeleteStatus())
        }
    },[])

    const handleAddAddress=(data)=>{
        const address={...data,user:userInfo._id}
        dispatch(addAddressAsync(address))
        setAddAddress(false)
        reset()
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
      height={'calc(100vh - 4rem)'} 
      justifyContent={'flex-start'} 
      alignItems={'center'}
    >

            <Stack 
              component={is480?'':Paper} 
              elevation={0} 
              width={is900?'100%':"50rem"} 
              p={3} 
              mt={is480?0:5} 
              rowGap={3}
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >

                    {/* user details - [name ,email ] */}
                    <Stack 
                      sx={{
                        background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(255, 107, 107, 0.1) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                        p: 3,
                        rowGap: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 20px rgba(0, 212, 255, 0.2)'
                      }}
                    >
                        <Avatar 
                          src='none' 
                          alt={userInfo?.name} 
                          sx={{
                            width: 80,
                            height: 80,
                            background: 'linear-gradient(45deg, #00d4ff, #ff6b6b)',
                            border: '3px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 25px rgba(0, 212, 255, 0.3)'
                          }}
                        />
                        <Typography 
                          sx={{ 
                            color: '#ffffff', 
                            fontWeight: 700,
                            fontSize: '1.2rem',
                            background: 'linear-gradient(45deg, #00d4ff, #ff6b6b)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}
                        >
                          {userInfo?.name}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
                          {userInfo?.email}
                        </Typography>
                    </Stack>


                    {/* address section */}
                    <Stack justifyContent={'center'} alignItems={'center'} rowGap={3}>


                        {/* heading and add button */}
                        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} columnGap={2}>
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
                              Manage Addresses
                            </Typography>
                            <Button 
                              onClick={()=>setAddAddress(true)} 
                              size={is480?'small':""} 
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
                            </Button>
                        </Stack>
                        
                        {/* add address form - state dependent*/}
                        {
                            addAddress?(
                                <Stack 
                                  width={'100%'} 
                                  component={'form'} 
                                  noValidate 
                                  onSubmit={handleSubmit(handleAddAddress)} 
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
                    
                                        <Stack>
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
                    
                                        <Stack>
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

                                        <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480?1:2}>
                                            <LoadingButton 
                                              loading={status==='pending'} 
                                              type='submit' 
                                              size={is480?"small":""} 
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
                                              onClick={()=>setAddAddress(false)} 
                                              variant={is480?"outlined":"text"} 
                                              size={is480?"small":""}
                                              sx={{
                                                borderColor: '#ff6b6b',
                                                color: '#ff6b6b',
                                                '&:hover': {
                                                  borderColor: '#ff4757',
                                                  background: 'rgba(255, 107, 107, 0.1)'
                                                }
                                              }}
                                            >
                                              Cancel
                                            </Button>
                                        </Stack>
                                </Stack>
                            ):('')
                        }

                        {/* mapping on addresses here  */}
                        <Stack width={'100%'} rowGap={2}>
                            {
                                addresses.length>0?(
                                    addresses.map((address)=>(
                                        <Address key={address._id} id={address._id} city={address.city} country={address.country} phoneNumber={address.phoneNumber} postalCode={address.postalCode} state={address.state} street={address.street} type={address.type}/>
                                    ))
                                ):(
                                    <Typography 
                                      textAlign={'center'} 
                                      mt={2} 
                                      variant='body2'
                                      sx={{ 
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: 2,
                                        p: 3,
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                                      }}
                                    >
                                      You have no added addresses
                                    </Typography>
                                )
                            }      
                        </Stack>

                    </Stack>


            </Stack>



    </Stack>
  )
}
