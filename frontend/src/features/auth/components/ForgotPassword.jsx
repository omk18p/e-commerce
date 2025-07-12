import React from 'react'
import { FormHelperText, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
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
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
        color: '#FFFFFF'
      }}
    >

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
