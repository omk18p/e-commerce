import { FormHelperText, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import {clearResetPasswordError, clearResetPasswordSuccessMessage, resetPasswordAsync, resetResetPasswordStatus, selectResetPasswordError, selectResetPasswordStatus, selectResetPasswordSuccessMessage } from '../AuthSlice'
import { LoadingButton } from '@mui/lab'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {MotionConfig,motion} from 'framer-motion'

export const ResetPassword = () => {
    const {register,handleSubmit,reset,formState: { errors }} = useForm()
    const dispatch=useDispatch()
    const status=useSelector(selectResetPasswordStatus)
    const error=useSelector(selectResetPasswordError)
    const successMessage=useSelector(selectResetPasswordSuccessMessage)
    const {userId,passwordResetToken}=useParams()
    const navigate=useNavigate()
    const theme=useTheme()
    const is500=useMediaQuery(theme.breakpoints.down(500))

    useEffect(()=>{
        if(error){
            toast.error(error.message)
        }
        return ()=>{
            dispatch(clearResetPasswordError())
        }
    },[error])

    useEffect(()=>{
        if(status==='fulfilled'){
            toast.success(successMessage?.message)
            navigate("/login")
        }
        return ()=>{
            dispatch(clearResetPasswordSuccessMessage())
        }
    },[status])

    useEffect(()=>{
        return ()=>{
            dispatch(resetResetPasswordStatus())
        }
    },[])

    const handleResetPassword=async(data)=>{
        const cred={...data,userId:userId,token:passwordResetToken}
        delete cred.confirmPassword
        dispatch(resetPasswordAsync(cred))
        reset()
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
              p={'1.5rem'} 
              rowGap={'1rem'} 
              noValidate 
              onSubmit={handleSubmit(handleResetPassword)}
            >

                <Stack rowGap={'.3rem'}>
                    <Typography 
                      variant='h4' 
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
                      Reset Password
                    </Typography>
                    <Typography 
                      sx={{
                        color: '#94A3B8',
                        fontWeight: 500,
                        textAlign: 'center'
                      }}
                    >
                      Please enter and confirm new password
                    </Typography>
                </Stack>
                        
                <Stack rowGap={'.5rem'}>
                    <MotionConfig whileHover={{y:-2}}>

                        <motion.div>
                            <TextField 
                              type='password' 
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
                              {...register("password",{
                                required:"Please enter a password",
                                pattern:{
                                  value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                  message:`at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters`
                                }
                              })} 
                              placeholder='New Password'
                            />
                            {errors.password && <FormHelperText sx={{mt:1, color: '#EF4444'}} error>{errors.password.message}</FormHelperText>}
                        </motion.div>
                        
                        <motion.div>
                            <TextField 
                              type='password' 
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
                              {...register("confirmPassword",{
                                required:"Please Confirm the password",
                                validate:(value,formValues)=>value===formValues.password || "Passwords dosen't match"
                              })} 
                              placeholder='Confirm New Password'
                            />
                            {errors.confirmPassword && <FormHelperText sx={{mt:1, color: '#EF4444'}} error>{errors.confirmPassword.message}</FormHelperText>}
                        </motion.div>
                        
                    </MotionConfig>
                </Stack>

                <motion.div whileHover={{scale:1.020}} whileTap={{scale:1}}>
                    <LoadingButton 
                      sx={{
                        height:"2.5rem",
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
                      Reset Password
                    </LoadingButton>
                </motion.div>
            </Stack>
          </Stack>
        </motion.div>

    </Stack>
  )
}
