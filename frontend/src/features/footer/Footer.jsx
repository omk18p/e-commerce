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
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)',
      paddingTop:"4rem",
      paddingLeft:is700?"2rem":"4rem",
      paddingRight:is700?"2rem":"4rem",
      paddingBottom:"2rem",
      rowGap:"4rem",
      color: '#ffffff',
      justifyContent:"space-around"
    }}>

            {/* upper */}
            <Stack flexDirection={'row'} rowGap={'1rem'} justifyContent={is700?"":'space-around'} flexWrap={'wrap'}>

                <Stack rowGap={'1.5rem'} padding={'1rem'}>
                    <Typography variant='h5' sx={{fontWeight: 800, background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                      Exclusive
                    </Typography>
                    <Typography variant='h6' sx={{fontWeight: 600}}>Subscribe</Typography>
                    <Typography sx={{...labelStyles, color: '#CBD5E1'}}>Get 10% off your first order</Typography>
                    <TextField 
                      placeholder='Enter your email' 
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                          },
                                                  '&:hover fieldset': {
                          borderColor: '#8B5CF6',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#8B5CF6',
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
                          <IconButton sx={{color: '#8B5CF6'}}>
                            <SendIcon />
                          </IconButton>
                        )
                      }}
                    />
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6' sx={{fontWeight: 600, color: '#ffffff'}}>Support</Typography>
                    <Typography sx={{...labelStyles, color: '#CBD5E1'}}>11th Main Street, Dhaka,  DH 1515, California.</Typography>
                    <Typography sx={{...labelStyles, color: '#CBD5E1'}}>exclusive@gmail.com</Typography>
                    <Typography sx={{...labelStyles, color: '#CBD5E1'}}>+88015-88888-9999</Typography>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6' sx={{fontWeight: 600, color: '#ffffff'}}>Account</Typography>
                    <Typography sx={{...labelStyles, color: '#CBD5E1'}}>My Account</Typography>
                    <Typography sx={{...labelStyles, color: '#CBD5E1'}}>Login / Register</Typography>
                    <Typography sx={{...labelStyles, color: '#CBD5E1'}}>Cart</Typography>
                    <Typography sx={{...labelStyles, color: '#CBD5E1'}}>Wishlist</Typography>
                    <Typography sx={{...labelStyles, color: '#CBD5E1'}}>Shop</Typography>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6' sx={{fontWeight: 600, color: '#ffffff'}}>Quick Links</Typography>
                    <Typography sx={{...labelStyles, color: '#CBD5E1'}}>Privacy Policy</Typography>
                    <Typography sx={{...labelStyles, color: '#CBD5E1'}}>Terms Of Use</Typography>
                    <Typography sx={{...labelStyles, color: '#CBD5E1'}}>FAQ</Typography>
                    <Typography sx={{...labelStyles, color: '#CBD5E1'}}>Contact</Typography>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6' sx={{fontWeight: 600, color: '#ffffff'}}>Download App</Typography>
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
            <Stack alignSelf={"center"}>
                <Typography sx={{color: '#94A3B8', fontWeight: 500}}>&copy; NovaMart {new Date().getFullYear()}. All right reserved</Typography>
            </Stack>

    </Stack>
  )
}
