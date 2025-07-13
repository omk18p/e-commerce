import { Avatar, Button, Paper, Stack, Typography, useTheme ,TextField, useMediaQuery, Box} from '@mui/material'
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
      height={'calc(100vh - 4rem)'} 
      justifyContent={'flex-start'} 
      alignItems={'center'}
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
        {[...Array(22)].map((_, i) => (
          <Box
            key={`profile-star-${i}`}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              background: '#A78BFA',
              borderRadius: '50%',
              animation: `profile-twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              '@keyframes profile-twinkle': {
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
        {[...Array(7)].map((_, i) => (
          <Box
            key={`profile-sparkle-${i}`}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'radial-gradient(circle, #FFFFFF 30%, rgba(139, 92, 246, 0.8) 70%)',
              borderRadius: '50%',
              animation: `profile-sparkle ${4 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              '@keyframes profile-sparkle': {
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
              component={is480?'':Paper} 
              elevation={0} 
              width={is900?'100%':"50rem"} 
              p={3} 
              mt={is480?0:5} 
              rowGap={3}
              sx={{
                background: 'rgba(26, 26, 46, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                zIndex: 2
              }}
            >

                    {/* user details - [name ,email ] */}
                    <Stack 
                      sx={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: 2,
                        p: 3,
                        rowGap: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)'
                      }}
                    >
                        <Avatar 
                          src='none' 
                          alt={userInfo?.name} 
                          sx={{
                            width: 80,
                            height: 80,
                            background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                            border: '3px solid rgba(139, 92, 246, 0.3)',
                            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
                          }}
                        />
                        <Typography 
                          sx={{ 
                            color: '#FFFFFF', 
                            fontWeight: 700,
                            fontSize: '1.2rem',
                            background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}
                        >
                          {userInfo?.name}
                        </Typography>
                        <Typography sx={{ color: '#94A3B8', fontWeight: 500 }}>
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
                                color: '#FFFFFF', 
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
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
                                    background: 'rgba(26, 26, 46, 0.85)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(139, 92, 246, 0.2)',
                                    borderRadius: 2,
                                    p: 3,
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
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
                    
                                        <Stack>
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
                    
                                        <Stack>
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

                                        <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480?1:2}>
                                            <LoadingButton 
                                              loading={status==='pending'} 
                                              type='submit' 
                                              size={is480?"small":""} 
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
                                              onClick={()=>setAddAddress(false)} 
                                              variant={is480?"outlined":"text"} 
                                              size={is480?"small":""}
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
                                        color: '#94A3B8',
                                        background: 'rgba(26, 26, 46, 0.85)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(139, 92, 246, 0.2)',
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
