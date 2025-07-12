import {Button, FormHelperText, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearOtpVerificationError, clearResendOtpError, clearResendOtpSuccessMessage, resendOtpAsync, resetOtpVerificationStatus, resetResendOtpStatus, selectLoggedInUser, selectOtpVerificationError, selectOtpVerificationStatus, selectResendOtpError, selectResendOtpStatus, selectResendOtpSuccessMessage, verifyOtpAsync } from '../AuthSlice'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import {toast} from 'react-toastify'
import { motion } from 'framer-motion'


export const OtpVerfication = () => {
    
    const {register,handleSubmit,formState: { errors }} = useForm()
    const dispatch=useDispatch()
    const loggedInUser=useSelector(selectLoggedInUser)
    const navigate=useNavigate()
    const resendOtpStatus=useSelector(selectResendOtpStatus)
    const resendOtpError=useSelector(selectResendOtpError)
    const resendOtpSuccessMessage=useSelector(selectResendOtpSuccessMessage)
    const otpVerificationStatus=useSelector(selectOtpVerificationStatus)
    const otpVerificationError=useSelector(selectOtpVerificationError)

    // handles the redirection
    useEffect(()=>{
        if(!loggedInUser){
            navigate('/login')
        }
        else if(loggedInUser && loggedInUser?.isVerified){
            navigate("/")
        }
    },[loggedInUser])

    const handleSendOtp=()=>{
        const data={user:loggedInUser?._id}
        dispatch(resendOtpAsync(data))
    }
    
    const handleVerifyOtp=(data)=>{
        const cred={...data,userId:loggedInUser?._id}
        dispatch(verifyOtpAsync(cred))
    }

    // handles resend otp error
    useEffect(()=>{
        if(resendOtpError){
            toast.error(resendOtpError.message)
        }
        return ()=>{
            dispatch(clearResendOtpError())
        }
    },[resendOtpError])

    // handles resend otp success message
    useEffect(()=>{
        if(resendOtpSuccessMessage){
            toast.success(resendOtpSuccessMessage.message)
        }
        return ()=>{
            dispatch(clearResendOtpSuccessMessage())
        }
    },[resendOtpSuccessMessage])

    // handles error while verifying otp
    useEffect(()=>{
        if(otpVerificationError){
            toast.error(otpVerificationError.message)
        }
        return ()=>{
            dispatch(clearOtpVerificationError())
        }
    },[otpVerificationError])

    useEffect(()=>{
        if(otpVerificationStatus==='fulfilled'){
            toast.success("Email verified! We are happy to have you here")
            dispatch(resetResendOtpStatus())
        }
        return ()=>{
            dispatch(resetOtpVerificationStatus())
        }
    },[otpVerificationStatus])

  return (
    <Stack 
      width={'100vw'} 
      height={'100vh'} 
      noValidate 
      flexDirection={'column'} 
      rowGap={3} 
      justifyContent="center" 
      alignItems="center"
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
            position={'relative'} 
            justifyContent={'center'} 
            alignItems={'center'} 
            p={'2rem'} 
            rowGap={'2rem'}
            sx={{
              background: 'rgba(26, 26, 46, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: 4,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              minWidth: '30rem',
              maxWidth: '35rem'
            }}
          >
            
            <Typography 
              mt={4} 
              variant='h5' 
              fontWeight={500}
              sx={{
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center'
              }}
            >
              Verify Your Email Address
            </Typography>

            {
                resendOtpStatus==='fulfilled'?(
                    <Stack width={'100%'} rowGap={'1rem'} component={'form'} noValidate onSubmit={handleSubmit(handleVerifyOtp)}>
                        <Stack rowGap={'1rem'}> 
                            <Stack>
                                <Typography sx={{ color: '#94A3B8', fontWeight: 500 }}>Enter the 4 digit OTP sent on</Typography>
                                <Typography sx={{ color: '#8B5CF6', fontWeight: 600 }}>{loggedInUser?.email}</Typography>
                            </Stack>
                            <Stack>
                                <TextField 
                                  {...register("otp",{
                                    required:"OTP is required",
                                    minLength:{value:4,message:"Please enter a 4 digit OTP"}
                                  })} 
                                  fullWidth 
                                  type='number'
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
                                {errors?.otp && <FormHelperText sx={{color:"#EF4444"}}>{errors.otp.message}</FormHelperText>}
                            </Stack>
                       </Stack>
                        <LoadingButton 
                          loading={otpVerificationStatus==='pending'}  
                          type='submit' 
                          fullWidth 
                          variant='contained'
                          sx={{
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
                        >
                          Verify
                        </LoadingButton>
                    </Stack>
                ):
                <>
                <Stack>
                    <Typography sx={{ color: '#94A3B8', fontWeight: 500 }}>We will send you a OTP on</Typography>
                    <Typography sx={{ color: '#8B5CF6', fontWeight: 600 }}>{loggedInUser?.email}</Typography>
                </Stack>
                <LoadingButton 
                  onClick={handleSendOtp} 
                  loading={resendOtpStatus==='pending'} 
                  fullWidth 
                  variant='contained'
                  sx={{
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
                >
                  Get OTP
                </LoadingButton>
                </>
             }

          </Stack>
        </motion.div>
    </Stack>
  )
}
