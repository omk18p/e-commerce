import {Box, FormHelperText, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import Lottie from 'lottie-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { ecommerceOutlookAnimation, shoppingBagAnimation} from '../../../assets'
import {useDispatch,useSelector} from 'react-redux'
import { LoadingButton } from '@mui/lab';
import {selectLoggedInUser,loginAsync,selectLoginStatus, selectLoginError, clearLoginError, resetLoginStatus} from '../AuthSlice'
import { toast } from 'react-toastify'
import {MotionConfig, motion} from 'framer-motion'

export const Login = () => {
  const dispatch=useDispatch()
  const status=useSelector(selectLoginStatus)
  const error=useSelector(selectLoginError)
  const loggedInUser=useSelector(selectLoggedInUser)
  const {register,handleSubmit,reset,formState: { errors }} = useForm()
  const navigate=useNavigate()
  const theme=useTheme()
  const is900=useMediaQuery(theme.breakpoints.down(900))
  const is480=useMediaQuery(theme.breakpoints.down(480))
  
  // handles user redirection
  useEffect(()=>{
    if(loggedInUser && loggedInUser?.isVerified){
      navigate("/")
    }
    else if(loggedInUser && !loggedInUser?.isVerified){
      navigate("/verify-otp")
    }
  },[loggedInUser])

  // handles login error and toast them
  useEffect(()=>{
    if(error){
      toast.error(error.message)
    }
  },[error])

  // handles login status and dispatches reset actions to relevant states in cleanup
  useEffect(()=>{
    if(status==='fulfilled' && loggedInUser?.isVerified===true){
      toast.success(`Login successful`)
      reset()
    }
    return ()=>{
      dispatch(clearLoginError())
      dispatch(resetLoginStatus())
    }
  },[status])

  const handleLogin=(data)=>{
    const cred={...data}
    delete cred.confirmPassword
    dispatch(loginAsync(cred))
  }

  return (
    <Stack 
      width={'100vw'} 
      height={'100vh'} 
      flexDirection={'row'} 
      sx={{
        overflowY:"hidden",
        background: 'linear-gradient(135deg, #0A0A1A 0%, #1A0B2E 25%, #2D1B69 50%, #1A0B2E 75%, #0A0A1A 100%)',
        color: '#FFFFFF',
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
      }}>
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
        {[...Array(30)].map((_, i) => (
          <Box
            key={`login-star-${i}`}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              background: '#A78BFA',
              borderRadius: '50%',
              animation: `login-twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              '@keyframes login-twinkle': {
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
        {[...Array(10)].map((_, i) => (
          <Box
            key={`login-sparkle-${i}`}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'radial-gradient(circle, #FFFFFF 30%, rgba(139, 92, 246, 0.8) 70%)',
              borderRadius: '50%',
              animation: `login-sparkle ${4 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              '@keyframes login-sparkle': {
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

        {/* Floating Stars */}
        {[...Array(15)].map((_, i) => (
          <Box
            key={`login-floating-star-${i}`}
            sx={{
              position: 'absolute',
              width: '1.5px',
              height: '1.5px',
              background: 'radial-gradient(circle, #FFFFFF 0%, #C4B5FD 100%)',
              borderRadius: '50%',
              animation: `login-float ${8 + Math.random() * 4}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.6)',
              '@keyframes login-float': {
                '0%, 100%': {
                  transform: 'translateY(0px) translateX(0px)',
                  opacity: 0.4,
                },
                '25%': {
                  transform: 'translateY(-20px) translateX(10px)',
                  opacity: 0.8,
                },
                '50%': {
                  transform: 'translateY(-40px) translateX(-5px)',
                  opacity: 1,
                },
                '75%': {
                  transform: 'translateY(-20px) translateX(-15px)',
                  opacity: 0.8,
                },
              },
            }}
          />
        ))}

        {/* Shooting Stars */}
        {[...Array(5)].map((_, i) => (
          <Box
            key={`login-shooting-star-${i}`}
            sx={{
              position: 'absolute',
              width: '3px',
              height: '3px',
              background: 'radial-gradient(circle, #FFFFFF 0%, #A78BFA 100%)',
              borderRadius: '50%',
              animation: `login-shooting-star ${6 + Math.random() * 3}s linear infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '1px',
                height: '40px',
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(167, 139, 250, 0.7) 50%, transparent 100%)',
                transform: 'translate(-50%, -50%) rotate(-30deg)',
                transformOrigin: 'center',
              },
              '@keyframes login-shooting-star': {
                '0%': {
                  transform: 'translateX(-50px) translateY(-50px)',
                  opacity: 0,
                },
                '10%': {
                  opacity: 1,
                },
                '90%': {
                  opacity: 1,
                },
                '100%': {
                  transform: 'translateX(calc(100vw + 50px)) translateY(calc(100vh + 50px))',
                  opacity: 0,
                },
              },
            }}
          />
        ))}
      </Box>
        
      {
        !is900 && 
        <Stack 
          flex={1} 
          justifyContent={'center'} 
          alignItems={'center'}
          sx={{
            background: 'rgba(26, 26, 46, 0.3)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            zIndex: 1
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Lottie animationData={ecommerceOutlookAnimation}/>
          </motion.div>
        </Stack> 
      }

      <Stack 
        flex={1} 
        justifyContent={'center'} 
        alignItems={'center'}
        sx={{ position: 'relative', zIndex: 2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Stack 
            sx={{
              background: 'rgba(26, 26, 46, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 4,
              p: 4,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              minWidth: is480 ? '95vw' : '28rem',
              maxWidth: '28rem'
            }}
          >
            <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'} mb={4}>
              <Stack rowGap={'.4rem'} alignItems={'center'}>
                <Typography 
                  variant='h2' 
                  sx={{
                    wordBreak:"break-word",
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center'
                  }}
                >
                  NovaMart
                </Typography>
                <Typography 
                  alignSelf={'center'} 
                  sx={{
                    color: '#94A3B8',
                    fontWeight: 500,
                    fontSize: '1.1rem'
                  }} 
                  variant='body2'
                >
                  - Shop Anything
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={3} component={'form'} noValidate onSubmit={handleSubmit(handleLogin)}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <TextField 
                  fullWidth 
                  {...register("email",{
                    required:"Email is required",
                    pattern:{
                      value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                      message:"Enter a valid email"
                    }
                  })} 
                  placeholder='Email'
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
                {errors.email && (
                  <FormHelperText sx={{mt:1, color: '#EF4444'}} error>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <TextField 
                  type='password' 
                  fullWidth 
                  {...register("password",{required:"Password is required"})} 
                  placeholder='Password'
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
                {errors.password && (
                  <FormHelperText sx={{mt:1, color: '#EF4444'}} error>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </motion.div>
              
              <motion.div whileHover={{scale:1.02}} whileTap={{scale:0.98}}>
                <LoadingButton 
                  fullWidth  
                  sx={{
                    height:'3rem',
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                    },
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 16px -4px rgba(139, 92, 246, 0.3)',
                    '&:hover': {
                      boxShadow: '0 12px 24px -6px rgba(139, 92, 246, 0.4)',
                    }
                  }} 
                  loading={status==='pending'} 
                  type='submit' 
                  variant='contained'
                >
                  Login
                </LoadingButton>
              </motion.div>

              <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap-reverse'} mt={2}>
                <MotionConfig whileHover={{x:2}} whileTap={{scale:1.050}}>
                  <motion.div>
                    <Typography 
                      mr={'1.5rem'} 
                      sx={{
                        textDecoration:"none",
                        color:"#8B5CF6",
                        fontWeight: 500,
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#A78BFA',
                        }
                      }} 
                      to={'/forgot-password'} 
                      component={Link}
                    >
                      Forgot password
                    </Typography>
                  </motion.div>

                  <motion.div>
                    <Typography 
                      sx={{
                        textDecoration:"none",
                        color:"#94A3B8",
                        fontWeight: 500
                      }} 
                      to={'/signup'} 
                      component={Link}
                    >
                      Don't have an account?{' '}
                      <span style={{
                        color: '#8B5CF6',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}>
                        Register
                      </span>
                    </Typography>
                  </motion.div>
                </MotionConfig>
              </Stack>
            </Stack>
          </Stack>
        </motion.div>
      </Stack>
    </Stack>
  )
}
