import React from 'react'
import { Box, FormHelperText, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordAsync, selectForgotPasswordStatus } from '../AuthSlice'
import { motion } from 'framer-motion'

export const ForgotPassword = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const dispatch=useDispatch()
    const status=useSelector(selectForgotPasswordStatus)
    const theme=useTheme()
    const is500=useMediaQuery(theme.breakpoints.down(500))

    const handleForgotPassword=(data)=>{
        dispatch(forgotPasswordAsync(data))
    }

return (
    <Stack 
      width={'100vw'} 
      height={'100vh'} 
      justifyContent={'center'} 
      alignItems={'center'}
      sx={{
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
        {[...Array(25)].map((_, i) => (
          <Box
            key={`forgot-star-${i}`}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              background: '#A78BFA',
              borderRadius: '50%',
              animation: `forgot-twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              '@keyframes forgot-twinkle': {
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
            key={`forgot-sparkle-${i}`}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'radial-gradient(circle, #FFFFFF 30%, rgba(139, 92, 246, 0.8) 70%)',
              borderRadius: '50%',
              animation: `forgot-sparkle ${4 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              '@keyframes forgot-sparkle': {
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
        {[...Array(12)].map((_, i) => (
          <Box
            key={`forgot-floating-star-${i}`}
            sx={{
              position: 'absolute',
              width: '1.5px',
              height: '1.5px',
              background: 'radial-gradient(circle, #FFFFFF 0%, #C4B5FD 100%)',
              borderRadius: '50%',
              animation: `forgot-float ${8 + Math.random() * 4}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.6)',
              '@keyframes forgot-float': {
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
        {[...Array(4)].map((_, i) => (
          <Box
            key={`forgot-shooting-star-${i}`}
            sx={{
              position: 'absolute',
              width: '3px',
              height: '3px',
              background: 'radial-gradient(circle, #FFFFFF 0%, #A78BFA 100%)',
              borderRadius: '50%',
              animation: `forgot-shooting-star ${6 + Math.random() * 3}s linear infinite`,
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
              '@keyframes forgot-shooting-star': {
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

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Stack 
            component={Paper} 
            elevation={0}
            sx={{
              background: 'rgba(26, 26, 46, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: 4,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Stack 
              component={'form'} 
              width={is500?"95vw":'30rem'} 
              p={is500?"1rem":'1.5rem'} 
              rowGap={'1rem'} 
              noValidate 
              onSubmit={handleSubmit(handleForgotPassword)}
            >
                        
                <Stack rowGap={'.4rem'}>
                    <Typography 
                      variant='h5' 
                      fontWeight={600}
                      sx={{
                        color: '#FFFFFF',
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center'
                      }}
                    >
                      {status==='fulfilled'?"Email has been sent!":"Forgot Your Password?"}
                    </Typography>
                    <Typography 
                      sx={{
                        color: '#94A3B8',
                        fontWeight: 500,
                        textAlign: 'center'
                      }} 
                      variant='body2'
                    >
                      {status==='fulfilled'?"Please check your inbox and click on the received link to reset your password":"Enter your registered email below to receive password reset link"}
                    </Typography>
                </Stack>
                        
                {
                    status!=='fulfilled' &&
                <>
                <motion.div whileHover={{y:-2}}>
                    <TextField 
                      fullWidth 
                      sx={{
                        mt: 1,
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
                      {...register("email",{
                        required:"Please enter a email",
                        pattern:{
                          value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                          message:"Enter a valid email"
                        }
                      })} 
                      placeholder='Enter email'
                    />
                    {errors.email && <FormHelperText sx={{fontSize:".9rem",mt:1, color: '#EF4444'}} error >{errors.email.message}</FormHelperText>}
                </motion.div>

                <motion.div whileHover={{scale:1.020}} whileTap={{scale:1}}>
                    <LoadingButton 
                      sx={{
                        height:'2.5rem',
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                          boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)',
                        }
                      }} 
                      fullWidth 
                      loading={status==='pending'} 
                      type='submit' 
                      variant='contained'
                    >
                      Send Password Reset Link
                    </LoadingButton>
                </motion.div>
                </>
                }
            </Stack>
          </Stack>
        </motion.div>
            
    </Stack>
  )
}
