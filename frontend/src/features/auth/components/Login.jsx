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
    if(status==='fullfilled' && loggedInUser?.isVerified===true){
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
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)',
        position: 'relative'
      }}
    >
      {/* Animated background particles */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
          zIndex: 0
        }}
      />
        
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
