import React, { useEffect } from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { ProductList } from '../features/products/components/ProductList'
import { resetAddressStatus, selectAddressStatus } from '../features/address/AddressSlice'
import { useDispatch, useSelector } from 'react-redux'
import {Footer} from '../features/footer/Footer'
import { Box } from '@mui/material'

export const HomePage = () => {

  const dispatch=useDispatch()
  const addressStatus=useSelector(selectAddressStatus)

  useEffect(()=>{
    if(addressStatus==='fulfilled'){

      dispatch(resetAddressStatus())
    }
  },[addressStatus])

  return (
    <Box sx={{
      minHeight: '100vh',
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
        {[...Array(50)].map((_, i) => (
          <Box
            key={`homepage-star-${i}`}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              background: '#A78BFA',
              borderRadius: '50%',
              animation: `homepage-twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              '@keyframes homepage-twinkle': {
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
        {[...Array(15)].map((_, i) => (
          <Box
            key={`homepage-sparkle-${i}`}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'radial-gradient(circle, #FFFFFF 30%, rgba(139, 92, 246, 0.8) 70%)',
              borderRadius: '50%',
              animation: `homepage-sparkle ${4 + Math.random() * 2}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              '@keyframes homepage-sparkle': {
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
        {[...Array(20)].map((_, i) => (
          <Box
            key={`homepage-floating-star-${i}`}
            sx={{
              position: 'absolute',
              width: '1.5px',
              height: '1.5px',
              background: 'radial-gradient(circle, #FFFFFF 0%, #C4B5FD 100%)',
              borderRadius: '50%',
              animation: `homepage-float ${8 + Math.random() * 4}s ease-in-out infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.6)',
              '@keyframes homepage-float': {
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

        {/* Rotating Stars */}
        {[...Array(12)].map((_, i) => (
          <Box
            key={`homepage-rotating-star-${i}`}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'radial-gradient(circle, #A78BFA 0%, #8B5CF6 100%)',
              borderRadius: '50%',
              animation: `homepage-rotate ${6 + Math.random() * 3}s linear infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              boxShadow: '0 0 8px rgba(139, 92, 246, 0.8)',
              '@keyframes homepage-rotate': {
                '0%': {
                  transform: 'rotate(0deg) scale(1)',
                  opacity: 0.6,
                },
                '50%': {
                  transform: 'rotate(180deg) scale(1.2)',
                  opacity: 1,
                },
                '100%': {
                  transform: 'rotate(360deg) scale(1)',
                  opacity: 0.6,
                },
              },
            }}
          />
        ))}

        {/* Comets */}
        {[...Array(5)].map((_, i) => (
          <Box
            key={`homepage-comet-${i}`}
            sx={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: 'radial-gradient(circle, #FFFFFF 0%, #A78BFA 50%, transparent 100%)',
              borderRadius: '50%',
              animation: `homepage-comet ${6 + Math.random() * 3}s linear infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(139, 92, 246, 0.6)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '2px',
                height: '80px',
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(167, 139, 250, 0.7) 50%, transparent 100%)',
                transform: 'translate(-50%, -50%) rotate(-45deg)',
                transformOrigin: 'center',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)',
              },
              '@keyframes homepage-comet': {
                '0%': {
                  transform: 'translateX(-100px) translateY(-100px)',
                  opacity: 0,
                },
                '10%': {
                  opacity: 1,
                },
                '90%': {
                  opacity: 1,
                },
                '100%': {
                  transform: 'translateX(calc(100vw + 100px)) translateY(calc(100vh + 100px))',
                  opacity: 0,
                },
              },
            }}
          />
        ))}

        {/* Rockets */}
        {[...Array(3)].map((_, i) => (
          <Box
            key={`homepage-rocket-${i}`}
            sx={{
              position: 'absolute',
              width: '30px',
              height: '50px',
              animation: `homepage-rocket ${8 + Math.random() * 4}s linear infinite`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              '&::before': {
                content: '"🚀"',
                fontSize: '30px',
                filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.9))',
                animation: 'rocket-glow 1.5s ease-in-out infinite alternate',
                '@keyframes rocket-glow': {
                  '0%': {
                    filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.9))',
                  },
                  '100%': {
                    filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 1)) drop-shadow(0 0 30px rgba(139, 92, 246, 0.8))',
                  },
                },
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                width: '12px',
                height: '25px',
                background: 'linear-gradient(to top, #FF6B35 0%, #FF8E53 50%, transparent 100%)',
                borderRadius: '50% 50% 0 0',
                transform: 'translateX(-50%)',
                animation: 'rocket-flame 0.3s ease-in-out infinite alternate',
                boxShadow: '0 0 8px rgba(255, 107, 53, 0.8)',
                '@keyframes rocket-flame': {
                  '0%': {
                    height: '25px',
                    opacity: 0.9,
                  },
                  '100%': {
                    height: '35px',
                    opacity: 1,
                  },
                },
              },
              '@keyframes homepage-rocket': {
                '0%': {
                  transform: 'translateX(-50px) translateY(calc(100vh + 50px)) rotate(0deg)',
                  opacity: 0,
                },
                '10%': {
                  opacity: 1,
                },
                '90%': {
                  opacity: 1,
                },
                '100%': {
                  transform: 'translateX(calc(100vw + 50px)) translateY(-50px) rotate(0deg)',
                  opacity: 0,
                },
              },
            }}
          />
        ))}

        {/* Shooting Stars */}
        {[...Array(4)].map((_, i) => (
          <Box
            key={`homepage-shooting-star-${i}`}
            sx={{
              position: 'absolute',
              width: '3px',
              height: '3px',
              background: 'radial-gradient(circle, #FFFFFF 0%, #A78BFA 100%)',
              borderRadius: '50%',
              animation: `homepage-shooting-star ${6 + Math.random() * 3}s linear infinite`,
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
              '@keyframes homepage-shooting-star': {
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
      
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Navbar isProductList={true}/>
        <ProductList/>
        <Footer/>
      </Box>
    </Box>
  )
}
