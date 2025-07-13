import { Box, Stack, Typography, useMediaQuery, useTheme, Rating, Checkbox, FormHelperText, Button, IconButton, Chip, Divider, Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductByIdAsync, resetProductFetchStatus, selectProductFetchStatus, selectSelectedProduct } from '../ProductSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { Reviews } from '../../review/components/Reviews'
import { fetchReviewsByProductIdAsync, resetReviewFetchStatus, selectReviewFetchStatus, selectReviews } from '../../review/ReviewSlice'
import { addToCartAsync, selectCartItems } from '../../cart/CartSlice'
import { createWishlistItemAsync, deleteWishlistItemByIdAsync, selectWishlistItems } from '../../wishlist/WishlistSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import { toast } from 'react-toastify'
import { motion, MotionConfig, AnimatePresence } from 'framer-motion'
import { Favorite, FavoriteBorder, ShoppingCart, Star, LocalShipping, Refresh, Security, Support } from '@mui/icons-material'
import { MobileStepper, Button as MuiButton } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import Lottie from 'lottie-react'
import {loadingAnimation} from '../../../assets'
import { RelatedProducts } from './RelatedProducts'

const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']
const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

export const ProductDetails = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const theme = useTheme()
    const dispatch = useDispatch()

    const is1420 = useMediaQuery(theme.breakpoints.down(1420))
    const is990 = useMediaQuery(theme.breakpoints.down(990))
    const is840 = useMediaQuery(theme.breakpoints.down(840))
    const is480 = useMediaQuery(theme.breakpoints.down(480))
    const is387 = useMediaQuery(theme.breakpoints.down(387))
    const is340 = useMediaQuery(theme.breakpoints.down(340))

    const product = useSelector(selectSelectedProduct)
    const productFetchStatus = useSelector(selectProductFetchStatus)
    const reviews = useSelector(selectReviews)
    const reviewFetchStatus = useSelector(selectReviewFetchStatus)
    const loggedInUser = useSelector(selectLoggedInUser)
    const cartItems = useSelector(selectCartItems)
    const wishlistItems = useSelector(selectWishlistItems)

    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [selectedColorIndex, setSelectedColorIndex] = useState(0)
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [activeStep, setActiveStep] = useState(0)

    const maxSteps = product?.images?.length || 0

    const isProductAlreadyInCart = cartItems.some((item) => item.product._id === id)
    const isProductAlreadyinWishlist = wishlistItems.some((item) => item.product._id === id)

    const averageRating = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0
    const totalReviews = reviews.length

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])

    useEffect(() => {
        dispatch(fetchProductByIdAsync(id))
        dispatch(fetchReviewsByProductIdAsync(id))
    }, [id, dispatch])

    useEffect(() => {
        if (productFetchStatus === 'rejected') {
            toast.error("Error fetching product details, please try again later")
        }
    }, [productFetchStatus])

    useEffect(() => {
        if (reviewFetchStatus === 'rejected') {
            toast.error("Error fetching reviews, please try again later")
        }
    }, [reviewFetchStatus])

    useEffect(() => {
        return () => {
            dispatch(resetProductFetchStatus())
            dispatch(resetReviewFetchStatus())
        }
    }, [dispatch])

    const handleAddToCart = () => {
        if (!loggedInUser) {
            navigate('/login')
            return
        }
        const data = { user: loggedInUser._id, product: id }
        dispatch(addToCartAsync(data))
        toast.success("Product added to cart")
    }

    const handleDecreaseQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncreaseQty = () => {
        if (quantity < product?.stockQuantity) {
            setQuantity(quantity + 1)
        }
    }

    const handleSizeSelect = (size) => {
        setSelectedSizeIndex(SIZES.indexOf(size))
    }

    const handleAddRemoveFromWishlist = (e) => {
        if (!loggedInUser) {
            navigate('/login')
            return
        }
        if (e.target.checked) {
            const data = { user: loggedInUser._id, product: id }
            dispatch(createWishlistItemAsync(data))
            toast.success("Product added to wishlist")
        } else {
            const wishlistItem = wishlistItems.find((item) => item.product._id === id)
            if (wishlistItem) {
                dispatch(deleteWishlistItemByIdAsync(wishlistItem._id))
                toast.success("Product removed from wishlist")
            }
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

  return (
    <>
    <style>{`
      .product-hero {
        background: linear-gradient(135deg, #0A0A1A 0%, #1A0B2E 25%, #2D1B69 50%, #1A0B2E 75%, #0A0A1A 100%);
        min-height: 100vh;
        position: relative;
        overflow: hidden;
      }
      
      .product-hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 60% 60%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 10% 30%, rgba(147, 51, 234, 0.06) 0%, transparent 50%);
        pointer-events: none;
        z-index: 0;
      }
      
      .product-hero::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B5CF6' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"),
                    url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A78BFA' fill-opacity='0.02'%3E%3Ccircle cx='60' cy='60' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"),
                    url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C4B5FD' fill-opacity='0.015'%3E%3Ccircle cx='90' cy='90' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 0;
      }
      
      .glass-container {
        background: rgba(26, 26, 46, 0.85);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        border: 1px solid rgba(139, 92, 246, 0.2);
        box-shadow: 0 8px 32px rgba(139, 92, 246, 0.1);
        transition: all 0.3s ease;
      }
      
      .glass-container:hover {
        box-shadow: 0 16px 48px rgba(139, 92, 246, 0.2);
        border-color: rgba(139, 92, 246, 0.4);
      }
      
      .product-image-container {
        position: relative;
        border-radius: 20px;
        overflow: hidden;
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(167, 139, 250, 0.05) 100%);
        border: 1px solid rgba(139, 92, 246, 0.2);
      }
      
      .product-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      
      .product-image:hover {
        transform: scale(1.05);
      }
      
      .thumbnail-container {
        display: flex;
        gap: 12px;
        margin-top: 16px;
        overflow-x: auto;
        padding: 8px 0;
      }
      
      .thumbnail {
        width: 80px;
        height: 80px;
        border-radius: 12px;
        cursor: pointer;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        overflow: hidden;
        background: rgba(139, 92, 246, 0.1);
      }
      
      .thumbnail.selected {
        border-color: #8B5CF6;
        box-shadow: 0 0 16px rgba(139, 92, 246, 0.4);
        transform: scale(1.1);
      }
      
      .thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .price-tag {
        background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
        color: white;
        padding: 12px 24px;
        border-radius: 16px;
        font-weight: 800;
        font-size: 2rem;
        text-align: center;
        box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
        position: relative;
        overflow: hidden;
      }
      
      .price-tag::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
      }
      
      .price-tag:hover::before {
        left: 100%;
      }
      
      .action-button {
        background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
        color: white;
        border: none;
        border-radius: 16px;
        padding: 16px 32px;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
        position: relative;
        overflow: hidden;
      }
      
      .action-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 32px rgba(139, 92, 246, 0.4);
      }
      
      .action-button:disabled {
        background: #64748B;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
      
      .quantity-control {
        display: flex;
        align-items: center;
        gap: 16px;
        background: rgba(139, 92, 246, 0.1);
        padding: 12px 20px;
        border-radius: 16px;
        border: 1px solid rgba(139, 92, 246, 0.3);
      }
      
      .quantity-btn {
        background: rgba(139, 92, 246, 0.2);
        color: white;
        border: 1px solid #8B5CF6;
        border-radius: 8px;
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .quantity-btn:hover {
        background: #8B5CF6;
        transform: scale(1.1);
      }
      
      .quantity-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
      
      .color-option {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
      }
      
      .color-option.selected {
        border-color: #8B5CF6;
        box-shadow: 0 0 16px rgba(139, 92, 246, 0.6);
        transform: scale(1.2);
      }
      
      .size-option {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        border: 2px solid rgba(139, 92, 246, 0.3);
        background: rgba(139, 92, 246, 0.1);
        color: white;
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .size-option.selected {
        background: #8B5CF6;
        border-color: #A78BFA;
        box-shadow: 0 0 16px rgba(139, 92, 246, 0.4);
        transform: scale(1.1);
      }
      
      .feature-card {
        background: rgba(139, 92, 246, 0.1);
        border-radius: 16px;
        border: 1px solid rgba(139, 92, 246, 0.3);
        padding: 20px;
        transition: all 0.3s ease;
      }
      
      .feature-card:hover {
        background: rgba(139, 92, 246, 0.15);
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
      }
      
      .rating-badge {
        background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .stock-badge {
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 700;
        color: white;
      }
      
      .stock-badge.low {
        background: linear-gradient(135deg, #EF4444 0%, #F87171 100%);
      }
      
      .stock-badge.medium {
        background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);
      }
      
      .stock-badge.high {
        background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
      }
      
      .wishlist-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(26, 26, 46, 0.8);
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }
      
      .wishlist-btn:hover {
        background: rgba(139, 92, 246, 0.2);
        border-color: #8B5CF6;
        transform: scale(1.1);
      }
      
      .section-title {
        background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 800;
        font-size: 2rem;
        margin-bottom: 24px;
        text-align: center;
      }
      
      .floating-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 1;
      }
      
      .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(139, 92, 246, 0.3);
        border-radius: 50%;
        animation: float 6s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
      }

      .product-stars {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
      }
      
      .product-star {
        position: absolute;
        width: 1px;
        height: 1px;
        background: #A78BFA;
        border-radius: 50%;
        animation: product-twinkle 3s ease-in-out infinite;
      }
      
      @keyframes product-twinkle {
        0%, 100% {
          opacity: 0.2;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.5);
        }
      }
      
      .product-sparkle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: radial-gradient(circle, #FFFFFF 30%, rgba(139, 92, 246, 0.8) 70%);
        border-radius: 50%;
        animation: product-sparkle 5s ease-in-out infinite;
      }
      
      @keyframes product-sparkle {
        0%, 100% {
          opacity: 0.3;
          transform: scale(0.8) rotate(0deg);
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
        }
        50% {
          opacity: 1;
          transform: scale(1.3) rotate(180deg);
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 12px rgba(139, 92, 246, 0.6);
        }
      }
    `}</style>
    
    {!(productFetchStatus==='rejected' && reviewFetchStatus==='rejected') && 
      <div className="product-hero">
        {/* Animated Stars Background */}
        <div className="product-stars">
          {/* Small Stars */}
          {[...Array(35)].map((_, i) => (
            <div
              key={`product-star-${i}`}
              className="product-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
          
          {/* Sparkle Stars */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`product-sparkle-${i}`}
              className="product-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating particles */}
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        <Stack sx={{
          justifyContent:'center',
          alignItems:'center',
          mb:'2rem',
          rowGap:"2rem",
          minHeight: '100vh',
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'hidden',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
          pt: 4,
          pb: 8
        }}>
          {
              (productFetchStatus || reviewFetchStatus) === 'pending'?
              <Stack width={is480?"35vh":'25rem'} height={'calc(100vh - 4rem)'} justifyContent={'center'} alignItems={'center'}>
                  <Lottie animationData={loadingAnimation}/>
              </Stack>
              :
              <Stack alignItems="center" width="100%">
                  {/* Main Product Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}
                  >
                    <Stack 
                      className="glass-container"
                      sx={{
                        width: '100%',
                        mx: 'auto',
                        p: is480 ? 2 : 4,
                        rowGap: 4,
                        flexDirection: is840 ? 'column' : 'row',
                        columnGap: is990 ? '2rem' : '3rem',
                        boxSizing: 'border-box',
                        position: 'relative',
                        background: 'rgba(26, 26, 46, 0.85)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: '24px',
                        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 16px 48px rgba(139, 92, 246, 0.2)',
                          borderColor: 'rgba(139, 92, 246, 0.4)',
                        },
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
                          borderRadius: '24px',
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
                          borderRadius: '24px',
                        }
                                              }}
                      >
                        {/* Animated Stars for Product Info */}
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          overflow: 'hidden',
                          pointerEvents: 'none',
                          zIndex: 1,
                          borderRadius: '24px',
                        }}>
                          {/* Small Stars for Product Info */}
                          {[...Array(15)].map((_, i) => (
                            <Box
                              key={`product-info-star-${i}`}
                              sx={{
                                position: 'absolute',
                                width: '1px',
                                height: '1px',
                                background: '#A78BFA',
                                borderRadius: '50%',
                                animation: `product-info-twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                '@keyframes product-info-twinkle': {
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
                          
                          {/* Sparkle Stars for Product Info */}
                          {[...Array(6)].map((_, i) => (
                            <Box
                              key={`product-info-sparkle-${i}`}
                              sx={{
                                position: 'absolute',
                                width: '2px',
                                height: '2px',
                                background: 'radial-gradient(circle, #FFFFFF 30%, rgba(139, 92, 246, 0.8) 70%)',
                                borderRadius: '50%',
                                animation: `product-info-sparkle ${4 + Math.random() * 2}s ease-in-out infinite`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                '@keyframes product-info-sparkle': {
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
                        
                        {/* Left Section - Product Images */}
                        <Stack sx={{
                          flex: 1,
                          minWidth: is840 ? '100%' : 400,
                          maxWidth: is840 ? '100%' : 500
                        }}>
                          <Box className="product-image-container" sx={{ position: 'relative' }}>
                            {/* Wishlist Button */}
                            {!loggedInUser?.isAdmin && (
                              <motion.div
                                className="wishlist-btn"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Checkbox
                                  checked={isProductAlreadyinWishlist}
                                  onChange={handleAddRemoveFromWishlist}
                                  icon={<FavoriteBorder sx={{ color: '#A78BFA' }} />}
                                  checkedIcon={<Favorite sx={{ color: '#EF4444' }} />}
                                />
                              </motion.div>
                            )}
                            
                            {/* Main Product Image */}
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={selectedImageIndex}
                                className="product-image"
                                src={product?.images[selectedImageIndex]}
                                alt={product?.title}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                              />
                            </AnimatePresence>
                          </Box>
                          
                          {/* Image Thumbnails */}
                          {!is1420 && product?.images?.length > 1 && (
                            <div className="thumbnail-container">
                              {product.images.map((image, index) => (
                                <motion.div
                                  key={index}
                                  className={`thumbnail ${selectedImageIndex === index ? 'selected' : ''}`}
                                  onClick={() => setSelectedImageIndex(index)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <img src={image} alt={`${product.title} ${index + 1}`} />
                                </motion.div>
                              ))}
                            </div>
                          )}
                          
                          {/* Mobile Image Stepper */}
                          {is1420 && product?.images?.length > 1 && (
                            <Box sx={{ mt: 2 }}>
                              <MobileStepper 
                                steps={maxSteps} 
                                position="static" 
                                activeStep={activeStep} 
                                nextButton={
                                  <MuiButton 
                                    size="small" 
                                    onClick={handleNext} 
                                    disabled={activeStep === maxSteps - 1}
                                    sx={{ color: '#8B5CF6' }}
                                  >
                                    Next{theme.direction === 'rtl' ? (<KeyboardArrowLeft />) : (<KeyboardArrowRight />)}
                                  </MuiButton>
                                } 
                                backButton={
                                  <MuiButton 
                                    size="small" 
                                    onClick={handleBack} 
                                    disabled={activeStep === 0}
                                    sx={{ color: '#8B5CF6' }}
                                  >
                                    {theme.direction === 'rtl' ? (<KeyboardArrowRight />) : (<KeyboardArrowLeft />)}Back
                                  </MuiButton>
                                }
                              />
                            </Box>
                          )}
                        </Stack>
                        
                        {/* Right Section - Product Info */}
                        <Stack sx={{
                          flex: 1,
                          minWidth: is480 ? '100%' : 400,
                          maxWidth: is840 ? '100%' : 500,
                          rowGap: 3
                        }}>
                          {/* Product Title */}
                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          >
                            <Typography 
                              variant='h3' 
                              fontWeight={800} 
                              sx={{ 
                                color: '#FFFFFF',
                                textShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
                                mb: 2
                              }}
                            >
                              {product?.title}
                            </Typography>
                          </motion.div>
                          
                          {/* Rating and Stock Status */}
                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" sx={{ mb: 3 }}>
                              <div className="rating-badge">
                                <Star />
                                <span>{averageRating.toFixed(1)}</span>
                                <span>({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})</span>
                              </div>
                              
                              <div className={`stock-badge ${
                                product?.stockQuantity <= 10 ? 'low' : 
                                product?.stockQuantity <= 20 ? 'medium' : 'high'
                              }`}>
                                {product?.stockQuantity <= 10 ? `Only ${product?.stockQuantity} left` :
                                 product?.stockQuantity <= 20 ? 'Only few left' : 'In Stock'}
                              </div>
                            </Stack>
                          </motion.div>
                          
                          {/* Price */}
                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                          >
                            <div className="price-tag">
                              ${product?.price}
                            </div>
                          </motion.div>
                          
                          {/* Description */}
                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                          >
                            <Typography 
                              sx={{
                                color: '#E0E7FF',
                                fontWeight: 500,
                                lineHeight: 1.6,
                                fontSize: '1.1rem',
                                mb: 3
                              }}
                            >
                              {product?.description}
                            </Typography>
                          </motion.div>
                          
                          {/* Product Options */}
                          {!loggedInUser?.isAdmin && (
                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 1.0 }}
                            >
                              <Stack spacing={3}>
                                {/* Colors */}
                                <Stack spacing={2}>
                                  <Typography sx={{ color: '#A78BFA', fontWeight: 600, fontSize: '1.1rem' }}>
                                    Colors:
                                  </Typography>
                                  <Stack direction="row" spacing={1}>
                                    {COLORS.map((color, index) => (
                                      <motion.div
                                        key={index}
                                        className={`color-option ${selectedColorIndex === index ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColorIndex(index)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                      />
                                    ))}
                                  </Stack>
                                </Stack>
                                
                                {/* Sizes */}
                                <Stack spacing={2}>
                                  <Typography sx={{ color: '#A78BFA', fontWeight: 600, fontSize: '1.1rem' }}>
                                    Size:
                                  </Typography>
                                  <Stack direction="row" spacing={1}>
                                    {SIZES.map((size, index) => (
                                      <motion.div
                                        key={index}
                                        className={`size-option ${selectedSizeIndex === index ? 'selected' : ''}`}
                                        onClick={() => setSelectedSizeIndex(index)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        {size}
                                      </motion.div>
                                    ))}
                                  </Stack>
                                </Stack>
                                
                                {/* Quantity */}
                                <Stack spacing={2}>
                                  <Typography sx={{ color: '#A78BFA', fontWeight: 600, fontSize: '1.1rem' }}>
                                    Quantity:
                                  </Typography>
                                  <div className="quantity-control">
                                    <button 
                                      className="quantity-btn"
                                      onClick={handleDecreaseQty}
                                      disabled={quantity <= 1}
                                    >
                                      -
                                    </button>
                                    <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.2rem', minWidth: '40px', textAlign: 'center' }}>
                                      {quantity}
                                    </Typography>
                                    <button 
                                      className="quantity-btn"
                                      onClick={handleIncreaseQty}
                                      disabled={quantity >= product?.stockQuantity}
                                    >
                                      +
                                    </button>
                                  </div>
                                </Stack>
                                
                                {/* Add to Cart Button */}
                                <motion.button
                                  className="action-button"
                                  onClick={handleAddToCart}
                                  disabled={product?.stockQuantity === 0}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  style={{ 
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                  }}
                                >
                                  <ShoppingCart />
                                  {product?.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
                                </motion.button>
                              </Stack>
                            </motion.div>
                          )}
                        </Stack>
                    </Stack>
                  </motion.div>
                  
                  {/* Features Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', mt: 4 }}
                  >
                    <Stack 
                      className="glass-container"
                      sx={{
                        p: is480 ? 2 : 4,
                        rowGap: 3
                      }}
                    >
                      <Typography className="section-title">
                        Product Features
                      </Typography>
                      
                      <Stack 
                        direction={is840 ? 'column' : 'row'} 
                        spacing={3}
                        sx={{ justifyContent: 'space-around' }}
                      >
                        <motion.div 
                          className="feature-card"
                          whileHover={{ scale: 1.02 }}
                        >
                          <Stack direction="row" spacing={2} alignItems="center">
                            <LocalShipping sx={{ color: '#A78BFA', fontSize: '2rem' }} />
                            <Stack>
                              <Typography sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1.1rem' }}>
                                Free Delivery
                              </Typography>
                              <Typography sx={{ color: '#A78BFA', fontSize: '0.9rem' }}>
                                Enter your postal code for delivery availability
                              </Typography>
                            </Stack>
                          </Stack>
                        </motion.div>
                        
                        <motion.div 
                          className="feature-card"
                          whileHover={{ scale: 1.02 }}
                        >
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Refresh sx={{ color: '#A78BFA', fontSize: '2rem' }} />
                            <Stack>
                              <Typography sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1.1rem' }}>
                                Easy Returns
                              </Typography>
                              <Typography sx={{ color: '#A78BFA', fontSize: '0.9rem' }}>
                                Free 30-day return policy
                              </Typography>
                            </Stack>
                          </Stack>
                        </motion.div>
                        
                        <motion.div 
                          className="feature-card"
                          whileHover={{ scale: 1.02 }}
                        >
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Security sx={{ color: '#A78BFA', fontSize: '2rem' }} />
                            <Stack>
                              <Typography sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1.1rem' }}>
                                Secure Payment
                              </Typography>
                              <Typography sx={{ color: '#A78BFA', fontSize: '0.9rem' }}>
                                100% secure payment processing
                              </Typography>
                            </Stack>
                          </Stack>
                        </motion.div>
                        
                        <motion.div 
                          className="feature-card"
                          whileHover={{ scale: 1.02 }}
                        >
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Support sx={{ color: '#A78BFA', fontSize: '2rem' }} />
                            <Stack>
                              <Typography sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1.1rem' }}>
                                24/7 Support
                              </Typography>
                              <Typography sx={{ color: '#A78BFA', fontSize: '0.9rem' }}>
                                Round-the-clock customer support
                              </Typography>
                            </Stack>
                          </Stack>
                        </motion.div>
                      </Stack>
                    </Stack>
                  </motion.div>
                  
                  {/* Reviews Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', mt: 4 }}
                  >
                    <Stack 
                      className="glass-container"
                      sx={{
                        p: is480 ? 2 : 4
                      }}
                    >
                      <Reviews productId={id} averageRating={averageRating}/>       
                    </Stack>
                  </motion.div>

                  {/* Related Products */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', mt: 4 }}
                  >
                    <RelatedProducts 
                      currentProduct={product}
                      currentCategory={product?.category}
                      currentBrand={product?.brand}
                    />
                  </motion.div>
              </Stack>
          }
        </Stack>
      </div>
    }
    </>
  )
}
