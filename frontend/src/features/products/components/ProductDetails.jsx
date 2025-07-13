import { Box, Stack, Typography, useMediaQuery, useTheme, Rating, Checkbox, FormHelperText, Button, IconButton, Chip } from '@mui/material'
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
import { motion, MotionConfig } from 'framer-motion'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import { MobileStepper, Button as MuiButton } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import Lottie from 'lottie-react'
import {loadingAnimation} from '../../../assets'

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
      .glass-panel {
        background: rgba(26, 26, 46, 0.85);
        backdrop-filter: blur(18px);
        border-radius: 24px;
        box-shadow: 0 8px 32px 0 rgba(139, 92, 246, 0.18), 0 1.5px 8px 0 rgba(0,0,0,0.18);
        border: 1.5px solid rgba(139, 92, 246, 0.15);
        transition: box-shadow 0.3s, border 0.3s;
      }
      .glass-panel:hover {
        box-shadow: 0 16px 48px 0 rgba(139, 92, 246, 0.28), 0 2px 16px 0 rgba(0,0,0,0.28);
        border: 1.5px solid #8B5CF6;
      }
      .glow-text {
        color: #fff;
        text-shadow: 0 2px 8px #8B5CF6, 0 1px 2px #000;
      }
      .gradient-price {
        background: linear-gradient(90deg, #8B5CF6 0%, #A78BFA 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 800;
        font-size: 2.2rem;
        letter-spacing: 1px;
      }
      .glass-btn {
        background: linear-gradient(90deg, #8B5CF6 0%, #A78BFA 100%);
        color: #fff;
        border: none;
        border-radius: 12px;
        font-weight: 700;
        font-size: 1.1rem;
        padding: 12px 28px;
        box-shadow: 0 4px 16px 0 rgba(139, 92, 246, 0.18);
        transition: box-shadow 0.3s, transform 0.2s;
        cursor: pointer;
        outline: none;
      }
      .glass-btn:hover {
        box-shadow: 0 8px 32px 0 #8B5CF6;
        transform: translateY(-2px) scale(1.04);
      }
      .qty-btn {
        background: rgba(139, 92, 246, 0.12);
        color: #fff;
        border: 1.5px solid #8B5CF6;
        border-radius: 8px;
        font-size: 1.2rem;
        font-weight: 700;
        padding: 8px 16px;
        margin: 0 4px;
        transition: background 0.2s, border 0.2s;
      }
      .qty-btn:hover {
        background: #8B5CF6;
        color: #fff;
        border: 1.5px solid #A78BFA;
      }
      .color-dot {
        width: 40px; height: 40px; border-radius: 50%; border: 2px solid #fff; margin: 0 6px; cursor: pointer; transition: border 0.2s, box-shadow 0.2s;
      }
      .color-dot.selected {
        border: 2.5px solid #8B5CF6; box-shadow: 0 0 8px #8B5CF6;
      }
      .size-box {
        border-radius: 8px;
        width: 38px; height: 38px;
        display: flex; align-items: center; justify-content: center;
        font-weight: 700; font-size: 1.1rem;
        background: rgba(139, 92, 246, 0.08);
        color: #fff;
        border: 1.5px solid #8B5CF6;
        margin: 0 6px;
        cursor: pointer;
        transition: background 0.2s, border 0.2s;
      }
      .size-box.selected {
        background: #8B5CF6;
        color: #fff;
        border: 2px solid #A78BFA;
      }
      .perk-panel {
        background: rgba(139, 92, 246, 0.08);
        border-radius: 14px;
        border: 1.5px solid #8B5CF6;
        box-shadow: 0 2px 12px 0 rgba(139, 92, 246, 0.10);
        margin-top: 2rem;
      }
      .perk-panel .MuiTypography-root {
        color: #fff;
      }
      .perk-panel hr {
        border-color: #8B5CF6;
        opacity: 0.3;
      }
    `}</style>
    {!(productFetchStatus==='rejected' && reviewFetchStatus==='rejected') && 
      <Stack sx={{
        justifyContent:'center',
        alignItems:'center',
        mb:'2rem',
        rowGap:"2rem",
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)',
        color: '#fff',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative',
        zIndex: 1,
        boxSizing: 'border-box',
      }}>
        {
            (productFetchStatus || reviewFetchStatus) === 'pending'?
            <Stack width={is480?"35vh":'25rem'} height={'calc(100vh - 4rem)'} justifyContent={'center'} alignItems={'center'}>
                <Lottie animationData={loadingAnimation}/>
            </Stack>
            :
            <Stack alignItems="center" width="100%">
                {/* product details */}
                <Stack 
                  sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    mx: 'auto',
                    p: is480 ? 1 : 4,
                    minHeight: is840 ? 'auto' : '50rem',
                    rowGap: 5,
                    mt: is840 ? 0 : 5,
                    mb: 5,
                    flexDirection: is840 ? 'column' : 'row',
                    columnGap: is990 ? '2rem' : '3rem',
                    boxSizing: 'border-box',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: 'rgba(26, 26, 46, 0.85)',
                    boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.10)',
                  }}
                >
                    {/* left stack (images) */}
                    <Stack className="glass-panel" sx={{flexDirection:"row",columnGap:"2.5rem",alignSelf:"flex-start",height:"100%", p:3, minWidth:is840?"100%":300, maxWidth: is840 ? '100%' : 400, boxSizing: 'border-box'}}>
                        {/* image selection */}
                        {!is1420 && <Stack sx={{display:"flex",rowGap:'1.5rem',height:"100%",overflowY:"auto", maxHeight: '420px'}}>
                            {
                                product && product.images.map((image,index)=>(
                                    <motion.div  whileHover={{scale:1.1}} whileTap={{scale:1}} style={{width:"90px",cursor:"pointer",borderRadius:'12px',overflow:'hidden',boxShadow:selectedImageIndex===index?'0 0 12px #8B5CF6':'none',border:selectedImageIndex===index?'2px solid #8B5CF6':'none'}} onClick={()=>setSelectedImageIndex(index)}>
                                        <img style={{width:"100%",objectFit:"contain"}} src={image} alt={`${product.title} image`} />
                                    </motion.div>
                                ))
                            }
                        </Stack>}
                        {/* selected image */}
                        <Stack mt={is480?"0rem":'2rem'}>
                            {
                                is1420?
                                <Stack width={is480?"100%":is990?'320px':"400px"} >
                                    <Box sx={{ width: '100%', height: '100%' }}>
                                        <img 
                                            style={{
                                                width: '100%',
                                                objectFit: "contain",
                                                aspectRatio: '1/1',
                                                borderRadius: '18px',
                                                boxShadow: '0 4px 24px #8B5CF6'
                                            }} 
                                            src={product?.images[activeStep]} 
                                            alt={product?.title} 
                                        />
                                    </Box>
                                    <MobileStepper 
                                        steps={maxSteps} 
                                        position="static" 
                                        activeStep={activeStep} 
                                        nextButton={
                                            <MuiButton 
                                                size="small" 
                                                onClick={handleNext} 
                                                disabled={activeStep === maxSteps - 1}
                                            >
                                                Next{theme.direction === 'rtl' ? (<KeyboardArrowLeft />) : (<KeyboardArrowRight />)}
                                            </MuiButton>
                                        } 
                                        backButton={
                                            <MuiButton 
                                                size="small" 
                                                onClick={handleBack} 
                                                disabled={activeStep === 0}
                                            >
                                                {theme.direction === 'rtl' ? (<KeyboardArrowRight />) : (<KeyboardArrowLeft />)}Back
                                            </MuiButton>
                                        }
                                    />
                                </Stack>
                                :
                                <div style={{width:"100%"}}>
                                    <img style={{width:"100%",objectFit:"contain",aspectRatio:1/1,borderRadius:'18px',boxShadow:'0 4px 24px #8B5CF6'}} src={product?.images[selectedImageIndex]} alt={`${product?.title} image`} />
                                </div>
                            }
                        </Stack>
                    </Stack>
                    {/* right stack - about product */}
                    <Stack className="glass-panel" rowGap={"1.5rem"} width={is480?"100%":'28rem'} p={4} sx={{boxSizing: 'border-box', maxWidth: is840 ? '100%' : 420}}>
                        {/* title rating price */}
                        <Stack rowGap={".5rem"}>
                            {/* title */}
                            <Typography variant='h4' fontWeight={800} className="glow-text">{product?.title}</Typography>
                            {/* rating */}
                            <Stack sx={{flexDirection:"row",columnGap:is340?".5rem":"1rem",alignItems:"center",flexWrap:'wrap',rowGap:'1rem'}}>
                                <Rating value={averageRating} readOnly sx={{color:'#A78BFA'}}/>
                                <Typography sx={{color:'#A78BFA',fontWeight:600}}>( {totalReviews===0?"No reviews":totalReviews===1?`${totalReviews} Review`:`${totalReviews} Reviews`} )</Typography>
                                <Typography sx={{color:product?.stockQuantity<=10?"#EF4444":product?.stockQuantity<=20?"#F59E0B":"#10B981",fontWeight:700}}>{product?.stockQuantity<=10?`Only ${product?.stockQuantity} left`:product?.stockQuantity<=20?"Only few left":"In Stock"}</Typography>
                            </Stack>
                            {/* price */}
                            <Typography className="gradient-price">${product?.price}</Typography>
                        </Stack>
                        {/* description */}
                        <Stack rowGap={".8rem"}>
                            <Typography sx={{color:'#E0E7FF',fontWeight:500}}>{product?.description}</Typography>
                            <hr style={{borderColor:'#8B5CF6',opacity:0.2}} />
                        </Stack>
                        {/* color, size and add-to-cart */}
                        {
                            !loggedInUser?.isAdmin &&
                        <Stack sx={{ rowGap: '1.3rem', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            {/* colors */}
                            <Stack flexDirection={'row'} alignItems={'center'} columnGap={is387?'5px':'1rem'} width={'fit-content'}>
                                <Typography sx={{color:'#A78BFA',fontWeight:600}}>Colors: </Typography>
                                <Stack flexDirection={'row'} columnGap={is387?".5rem":".2rem"} >
                                    {
                                        COLORS.map((color,index)=>(
                                            <div className={`color-dot${selectedColorIndex===index?' selected':''}`} style={{backgroundColor:color}} onClick={()=>setSelectedColorIndex(index)}></div>
                                        ))
                                    }
                                </Stack>
                            </Stack>
                            {/* size */}
                            <Stack flexDirection={'row'} alignItems={'center'} columnGap={is387?'5px':'1rem'} width={'fit-content'}>
                                <Typography sx={{color:'#A78BFA',fontWeight:600}}>Size: </Typography>
                                <Stack flexDirection={'row'} columnGap={is387?".5rem":".2rem"} >
                                    {
                                        SIZES.map((size,index)=>(
                                            <div className={`size-box${selectedSizeIndex===index?' selected':''}`} onClick={()=>setSelectedSizeIndex(index)}>{size}</div>
                                        ))
                                    }
                                </Stack>
                            </Stack>
                            {/* quantity */}
                            <Stack flexDirection={'row'} alignItems={'center'} columnGap={is387?'5px':'1rem'} width={'fit-content'}>
                                <Typography sx={{color:'#A78BFA',fontWeight:600}}>Quantity: </Typography>
                                <Stack flexDirection={'row'} alignItems={'center'} columnGap={is387?".5rem":".2rem"} >
                                    <button className="qty-btn" onClick={()=>setQuantity(Math.max(1,quantity-1))}>-</button>
                                    <Typography sx={{color:'#FFFFFF',fontWeight:700,minWidth:'20px',textAlign:'center'}}>{quantity}</Typography>
                                    <button className="qty-btn" onClick={()=>setQuantity(Math.min(product?.stockQuantity,quantity+1))}>+</button>
                                </Stack>
                            </Stack>
                            {/* add to cart button */}
                            <Stack sx={{ mt: 2, mb: 2, width: '100%', alignItems: 'center' }}>
                                <motion.button 
                                    whileHover={{scale:1.05}} 
                                    whileTap={{scale:1}} 
                                    onClick={handleAddToCart} 
                                    className="glass-btn"
                                    disabled={product?.stockQuantity===0}
                                    style={{ minWidth: '200px' }}
                                >
                                    {product?.stockQuantity===0?"Out of Stock":"Add to Cart"}
                                </motion.button>
                            </Stack>
                        </Stack>
                        }
                        {/* product perks */}
                        <Stack mt={3} className="perk-panel">
                            <Stack p={2} flexDirection={'row'} alignItems={"center"} columnGap={'1rem'} width={'100%'} justifyContent={'flex-sart'}>
                                <Box>
                                    <LocalShippingOutlinedIcon sx={{color:'#A78BFA'}}/>
                                </Box>
                                <Stack>
                                    <Typography sx={{fontWeight:700}}>Free Delivery</Typography>
                                    <Typography sx={{color:'#A78BFA'}}>Enter your postal for delivery availabity</Typography>
                                </Stack>
                            </Stack>
                            <hr style={{width:"100%"}} />
                            <Stack p={2} flexDirection={'row'} alignItems={"center"} width={'100%'} columnGap={'1rem'} justifyContent={'flex-start'}>
                                <Box>
                                    <CachedOutlinedIcon sx={{color:'#A78BFA'}}/>
                                </Box>
                                <Stack>
                                    <Typography sx={{fontWeight:700}}>Return Delivery</Typography>
                                    <Typography sx={{color:'#A78BFA'}}>Free 30 Days Delivery Returns</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                {/* reviews */}
                <Stack width="100%" maxWidth="1200px" mx="auto" p={is480?2:0}>
                    <Reviews productId={id} averageRating={averageRating}/>       
                </Stack>
            </Stack>
        }
      </Stack>
    }
    </>
  )
}
