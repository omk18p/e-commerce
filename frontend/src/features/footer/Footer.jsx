import { Box, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Stack } from '@mui/material'
import React from 'react'
import { QRCodePng, appStorePng, googlePlayPng ,facebookPng,instagramPng,twitterPng,linkedinPng} from '../../assets'
import SendIcon from '@mui/icons-material/Send';
import { MotionConfig, motion } from 'framer-motion';
import { Link } from 'react-router-dom';



export const Footer = () => {

    const theme=useTheme()
    const is700=useMediaQuery(theme.breakpoints.down(700))

    const labelStyles={
        fontWeight:300,
        cursor:'pointer'
    }

  return (
    <Stack sx={{
      background: 'linear-gradient(135deg, #0A0A1A 0%, #1A0B2E 25%, #2D1B69 50%, #1A0B2E 75%, #0A0A1A 100%)',
      paddingTop:"4rem",
      paddingLeft:is700?"2rem":"4rem",
      paddingRight:is700?"2rem":"4rem",
      paddingBottom:"2rem",
      rowGap:"4rem",
      color: '#ffffff',
      justifyContent:"space-around",
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
        {[...Array(15)].map((_, i) => (
          <Box
            key={`footer-star-${i}`}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              background: '#A78BFA',
              borderRadius: '50%',
              animation: `footer-twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              '@keyframes footer-twinkle': {
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
        {[...Array(5)].map((_, i) => (
          <Box
            key={`footer-sparkle-${i}`}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'radial-gradient(circle, #FFFFFF 30%, rgba(139, 92, 246, 0.8) 70%)',
              borderRadius: '50%',
              animation: `footer-sparkle ${4 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              '@keyframes footer-sparkle': {
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

            {/* upper */}
            <Stack 
              flexDirection={'row'} 
              rowGap={'1rem'} 
              justifyContent={is700?"":'space-around'} 
              flexWrap={'wrap'}
              sx={{ position: 'relative', zIndex: 2 }}
            >

                <Stack rowGap={'1.5rem'} padding={'1rem'}>
                    <Typography variant='h5' sx={{fontWeight: 800, background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                      Exclusive
                    </Typography>
                    <Typography variant='h6' sx={{fontWeight: 600, color: '#FFFFFF'}}>Subscribe</Typography>
                    <Typography sx={{...labelStyles, color: '#94A3B8'}}>Get 10% off your first order</Typography>
                    <TextField 
                      placeholder='Enter your email' 
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(26, 26, 46, 0.6)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#8B5CF6',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#8B5CF6',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: '#ffffff',
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: '#94A3B8',
                        },
                      }} 
                      InputProps={{
                        endAdornment:(
                          <IconButton sx={{color: '#8B5CF6', '&:hover': { color: '#A78BFA' }}}>
                            <SendIcon />
                          </IconButton>
                        )
                      }}
                    />
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6' sx={{fontWeight: 600, color: '#FFFFFF'}}>Support</Typography>
                    <Typography sx={{...labelStyles, color: '#94A3B8'}}>11th Main Street, Dhaka,  DH 1515, California.</Typography>
                    <Typography sx={{...labelStyles, color: '#94A3B8'}}>exclusive@gmail.com</Typography>
                    <Typography sx={{...labelStyles, color: '#94A3B8'}}>+88015-88888-9999</Typography>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6' sx={{fontWeight: 600, color: '#FFFFFF'}}>Account</Typography>
                    <Typography sx={{...labelStyles, color: '#94A3B8', '&:hover': { color: '#A78BFA' }}}>My Account</Typography>
                    <Typography sx={{...labelStyles, color: '#94A3B8', '&:hover': { color: '#A78BFA' }}}>Login / Register</Typography>
                    <Typography sx={{...labelStyles, color: '#94A3B8', '&:hover': { color: '#A78BFA' }}}>Cart</Typography>
                    <Typography sx={{...labelStyles, color: '#94A3B8', '&:hover': { color: '#A78BFA' }}}>Wishlist</Typography>
                    <Typography sx={{...labelStyles, color: '#94A3B8', '&:hover': { color: '#A78BFA' }}}>Shop</Typography>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6' sx={{fontWeight: 600, color: '#FFFFFF'}}>Quick Links</Typography>
                    <Typography sx={{...labelStyles, color: '#94A3B8', '&:hover': { color: '#A78BFA' }}}>Privacy Policy</Typography>
                    <Typography sx={{...labelStyles, color: '#94A3B8', '&:hover': { color: '#A78BFA' }}}>Terms Of Use</Typography>
                    <Typography sx={{...labelStyles, color: '#94A3B8', '&:hover': { color: '#A78BFA' }}}>FAQ</Typography>
                    <Typography sx={{...labelStyles, color: '#94A3B8', '&:hover': { color: '#A78BFA' }}}>Contact</Typography>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6' sx={{fontWeight: 600, color: '#FFFFFF'}}>Download App</Typography>
                    <Typography sx={{...labelStyles,color:"#10B981",fontWeight:500}}>Save $3 with App New User Only</Typography>
                    <Stack flexDirection={'row'} columnGap={'.5rem'}>

                        <Box width={'100px'} height={"100px"}>
                            <img src={QRCodePng} height={'100%'} width={'100%'} style={{objectFit:'contain'}} alt="QR Code"/>
                        </Box>

                        <Stack justifyContent={'space-around'}>
                            <Stack>
                                <img style={{width:"100%",height:"100%",cursor:"pointer"}} src={googlePlayPng} alt="GooglePlay" />
                            </Stack>
                            <Stack>
                                <img style={{width:"100%",height:'100%',cursor:"pointer"}} src={appStorePng} alt="AppStore" />
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack mt={.6} flexDirection={'row'} columnGap={'2rem'}>
                        <MotionConfig whileHover={{scale:1.1}} whileTap={{scale:1}}>
                            <motion.img style={{cursor:"pointer"}} src={facebookPng} alt="Facebook" />
                            <motion.img style={{cursor:"pointer"}} src={twitterPng} alt="Twitter" />
                            <motion.img style={{cursor:"pointer"}} src={instagramPng} alt="Instagram" />
                            <motion.img style={{cursor:"pointer"}} src={linkedinPng} alt="Linkedin" />
                        </MotionConfig>
                    </Stack>
                </Stack>

            </Stack>

            {/* lower */}
            <Stack alignSelf={"center"} sx={{ position: 'relative', zIndex: 2 }}>
                <Typography sx={{color: '#94A3B8', fontWeight: 500}}>&copy; NovaMart {new Date().getFullYear()}. All right reserved</Typography>
            </Stack>

    </Stack>
  )
}
