import { Box, Button, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { resetCurrentOrder, selectCurrentOrder } from '../features/order/OrderSlice'
import { selectUserInfo } from '../features/user/UserSlice'
import { orderSuccessAnimation } from '../assets'
import Lottie from 'lottie-react'
import { motion } from 'framer-motion'

export const OrderSuccessPage = () => {


    const navigate=useNavigate()
    const dispatch=useDispatch()
    const currentOrder=useSelector(selectCurrentOrder)
    const userDetails=useSelector(selectUserInfo)
    const {id}=useParams()

    const theme=useTheme()
    const is480=useMediaQuery(theme.breakpoints.down(480))

    useEffect(()=>{
        if(!currentOrder){
            navigate("/")
        }
    },[currentOrder])

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
      }}
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
        {[...Array(30)].map((_, i) => (
          <Box
            key={`success-star-${i}`}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              background: '#A78BFA',
              borderRadius: '50%',
              animation: `success-twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              '@keyframes success-twinkle': {
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
            key={`success-sparkle-${i}`}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'radial-gradient(circle, #FFFFFF 30%, rgba(139, 92, 246, 0.8) 70%)',
              borderRadius: '50%',
              animation: `success-sparkle ${4 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              '@keyframes success-sparkle': {
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

        {/* Celebration Particles */}
        {[...Array(20)].map((_, i) => (
          <Box
            key={`celebration-${i}`}
            sx={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: `hsl(${Math.random() * 360}, 70%, 60%)`,
              borderRadius: '50%',
              animation: `celebration ${3 + Math.random() * 2}s ease-out infinite`,
              left: '50%',
              top: '50%',
              animationDelay: `${Math.random() * 2}s`,
              '@keyframes celebration': {
                '0%': {
                  transform: 'translate(-50%, -50%) scale(0)',
                  opacity: 1,
                },
                '100%': {
                  transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(0)`,
                  opacity: 0,
                },
              },
            }}
          />
        ))}
      </Box>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <Stack 
            component={Paper} 
            boxShadow={is480?'none':""} 
            rowGap={3} 
            elevation={1} 
            p={is480?1:4} 
            justifyContent={'center'} 
            alignItems={'center'}
            sx={{
              background: 'rgba(26, 26, 46, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              minWidth: is480 ? '90%' : '400px',
              maxWidth: '500px',
            }}
          >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <Box width={'10rem'} height={'7rem'}>
                    <Lottie animationData={orderSuccessAnimation}></Lottie>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Stack mt={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'} rowGap={1}>
                    <Typography 
                      variant='h6' 
                      fontWeight={400}
                      sx={{ color: '#E0E7FF' }}
                    >
                      Hey {userDetails?.name}
                    </Typography>
                    <Typography 
                      variant='h5'
                      sx={{
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 700,
                      }}
                    >
                      Your Order #{currentOrder?._id} is confirmed
                    </Typography>
                    <Typography 
                      variant='body2' 
                      sx={{ color: '#94A3B8' }}
                    >
                      Thankyou for shopping with us❤️
                    </Typography>
                </Stack>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  component={Link} 
                  to={'/orders'} 
                  onClick={()=>dispatch(resetCurrentOrder())} 
                  size={is480?"small":""}  
                  variant='contained'
                  sx={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                      boxShadow: '0 12px 35px rgba(139, 92, 246, 0.4)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Check order status in my orders
                </Button>
              </motion.div>
          </Stack>
        </motion.div>

    </Stack>
  )
}
