import SwipeableViews from 'react18-swipeable-views';
import { autoPlay, virtualize } from 'react-swipeable-views-utils';
import MobileStepper from '@mui/material/MobileStepper';
import { Box, useTheme, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// Advanced banner data with cutting-edge text
const bannerData = [
  {
    image: require('../../../assets/images/newbannerimage1.jpg'),
    title: "Unleash Your Style",
    subtitle: "Shop the hottest trends and turn every street into your runway.",
    cta: "Get the Look",
    color: "#8B5CF6",
    badge: "HOT DROP"
  },
  {
    image: require('../../../assets/images/newbannerimage2.jpg'),
    title: "Steals & Thrills",
    subtitle: "Flash deals, wild discounts, and jaw-dropping offers—only for you.",
    cta: "Snag the Deal",
    color: "#EF4444",
    badge: "FLASH SALE"
  },
  {
    image: require('../../../assets/images/newbannerimage3.jpg'),
    title: "Fresh Finds Daily",
    subtitle: "New arrivals, exclusive drops, and must-have picks—every single day.",
    cta: "See What's New",
    color: "#10B981",
    badge: "NEW IN"
  },
  {
    image: require('../../../assets/images/newbannerimage4.jpg'),
    title: "Cart, Click, Wow!",
    subtitle: "Add to cart, check out fast, and get ready to be amazed. Shopping made sexy.",
    cta: "Shop Instantly",
    color: "#F59E0B",
    badge: "INSTANT JOY"
  }
];

export const ProductBanner = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = bannerData.length;

    // Looping logic
    const handleStepChange = (step) => {
        setActiveStep((step + maxSteps) % maxSteps);
    };

    // Animation variants
    const slideVariants = {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
      exit: { opacity: 0, x: -60, transition: { duration: 0.5, ease: 'easeIn' } }
    };

    const handleCTAClick = () => {
        navigate('/products');
    };

    return (
        <>
            <AutoPlaySwipeableViews
                style={{ overflow: "hidden", borderRadius: "16px" }}
                width={'100%'}
                height={'100%'}
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                interval={5000}
                slideStyle={{ display: 'flex', alignItems: 'stretch', height: '100%' }}
                // Infinite loop by resetting to 0 after last
                onTransitionEnd={() => {
                  if (activeStep === maxSteps) setActiveStep(0);
                }}
            >
                {bannerData.map((banner, index) => (
                    <motion.div
                        key={index}
                        variants={slideVariants}
                        initial="initial"
                        animate={activeStep === index ? "animate" : "initial"}
                        exit="exit"
                        style={{ width: "100%", height: '100%', position: 'relative', display: 'flex', alignItems: 'stretch' }}
                    >
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                {/* Background Image */}
                                <Box
                                    component="img"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: "cover",
                                        filter: 'brightness(0.7)',
                                        borderRadius: "16px"
                                    }}
                                    src={banner.image}
                                    alt={`Banner ${index + 1}`}
                                />

                                {/* Overlay Gradient */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6) 100%)`,
                                        borderRadius: "16px"
                                    }}
                                />

                                {/* Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    style={{
                                        position: 'absolute',
                                        top: '10%',
                                        right: '10%',
                                        zIndex: 3
                                    }}
                                >
                                    <Box
                                        sx={{
                                            background: `linear-gradient(135deg, ${banner.color} 0%, ${banner.color}80 100%)`,
                                            color: '#FFFFFF',
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: 700,
                                            letterSpacing: '1px',
                                            textTransform: 'uppercase',
                                            boxShadow: `0 4px 16px ${banner.color}40`,
                                            backdropFilter: 'blur(10px)',
                                            border: `1px solid ${banner.color}30`
                                        }}
                                    >
                                        {banner.badge}
                                    </Box>
                                </motion.div>

                                {/* Content Overlay */}
                                <Stack
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        textAlign: 'center',
                                        color: '#FFFFFF',
                                        zIndex: 2,
                                        width: '80%',
                                        maxWidth: '600px'
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                    >
                                        <Typography
                                            variant="h2"
                                            sx={{
                                                fontWeight: 900,
                                                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem' },
                                                textShadow: `0 0 20px ${banner.color}, 2px 2px 4px rgba(0,0,0,0.8)`,
                                                mb: 2,
                                                background: `linear-gradient(135deg, ${banner.color} 0%, #FFFFFF 50%, ${banner.color} 100%)`,
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                letterSpacing: '2px',
                                                textTransform: 'uppercase',
                                                fontFamily: 'monospace',
                                                animation: 'glow 2s ease-in-out infinite alternate'
                                            }}
                                        >
                                            {banner.title}
                                        </Typography>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 500,
                                                mb: 4,
                                                textShadow: `0 0 10px ${banner.color}, 1px 1px 2px rgba(0,0,0,0.8)`,
                                                color: '#F8FAFC',
                                                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                                                lineHeight: 1.6,
                                                maxWidth: '500px',
                                                mx: 'auto',
                                                opacity: 0.95
                                            }}
                                        >
                                            {banner.subtitle}
                                        </Typography>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            onClick={handleCTAClick}
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                background: `linear-gradient(135deg, ${banner.color} 0%, ${banner.color}80 100%)`,
                                                borderRadius: '50px',
                                                px: 5,
                                                py: 2,
                                                fontSize: '1.2rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                boxShadow: `0 8px 32px ${banner.color}40, 0 0 20px ${banner.color}20`,
                                                backdropFilter: 'blur(10px)',
                                                border: `2px solid ${banner.color}30`,
                                                position: 'relative',
                                                overflow: 'hidden',
                                                '&:hover': {
                                                    background: `linear-gradient(135deg, ${banner.color} 0%, ${banner.color} 100%)`,
                                                    boxShadow: `0 12px 40px ${banner.color}60, 0 0 30px ${banner.color}30`,
                                                    transform: 'translateY(-3px) scale(1.05)',
                                                    '&::before': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: '-100%',
                                                        width: '100%',
                                                        height: '100%',
                                                        background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                                                        transition: 'left 0.5s'
                                                    }
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: '-100%',
                                                    width: '100%',
                                                    height: '100%',
                                                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                                                    transition: 'left 0.5s'
                                                }
                                            }}
                                        >
                                            {banner.cta}
                                        </Button>
                                    </motion.div>
                                </Stack>

                                {/* Floating Elements */}
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '20%',
                                        right: '10%',
                                        width: '60px',
                                        height: '60px',
                                        background: `linear-gradient(135deg, ${banner.color}20 0%, ${banner.color}40 100%)`,
                                        borderRadius: '50%',
                                        backdropFilter: 'blur(10px)',
                                        border: `1px solid ${banner.color}30`
                                    }}
                                />

                                <motion.div
                                    animate={{
                                        y: [0, 10, 0],
                                        rotate: [0, -5, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                    style={{
                                        position: 'absolute',
                                        bottom: '20%',
                                        left: '10%',
                                        width: '40px',
                                        height: '40px',
                                        background: `linear-gradient(135deg, ${banner.color}30 0%, ${banner.color}50 100%)`,
                                        borderRadius: '50%',
                                        backdropFilter: 'blur(10px)',
                                        border: `1px solid ${banner.color}40`
                                    }}
                                />
                            </Box>
                        ) : null}
                    </motion.div>
                ))}
            </AutoPlaySwipeableViews>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    sx={{
                        background: 'transparent',
                        '& .MuiMobileStepper-dot': {
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            '&.MuiMobileStepper-dotActive': {
                                backgroundColor: '#8B5CF6'
                            }
                        }
                    }}
                />
            </Box>
        </>
    );
};
