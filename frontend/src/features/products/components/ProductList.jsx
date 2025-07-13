import {FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Typography, useMediaQuery, useTheme, TextField, Slider, Box } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAsync, resetProductFetchStatus, selectProductFetchStatus, selectProductIsFilterOpen, selectProductTotalResults, selectProducts, toggleFilters } from '../ProductSlice'
import { ProductCard } from './ProductCard'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import { selectBrands } from '../../brands/BrandSlice'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { selectCategories } from '../../categories/CategoriesSlice'
import Pagination from '@mui/material/Pagination';
import { ITEMS_PER_PAGE } from '../../../constants'
import {createWishlistItemAsync, deleteWishlistItemByIdAsync, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItems} from '../../wishlist/WishlistSlice'
import {selectLoggedInUser} from '../../auth/AuthSlice'
import {toast} from 'react-toastify'
import {loadingAnimation} from '../../../assets'
import { resetCartItemAddStatus, selectCartItemAddStatus, selectCartItems } from '../../cart/CartSlice'
import { addToCartAsync } from '../../cart/CartSlice'
import { motion } from 'framer-motion'
import { ProductBanner } from './ProductBanner'
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Lottie from 'lottie-react'
import { useLocation, useNavigate } from 'react-router-dom'
import TuneIcon from '@mui/icons-material/Tune';


const sortOptions=[
    {name:"Price: low to high",sort:"price",order:"asc"},
    {name:"Price: high to low",sort:"price",order:"desc"},
]




export const ProductList = () => {
    const [filters,setFilters]=useState({})
    const [page,setPage]=useState(1)
    const [sort,setSort]=useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [filteredProducts, setFilteredProducts] = useState([])
    const theme=useTheme()
    const location = useLocation()
    const productGridRef = useRef(null);

    const is1200=useMediaQuery(theme.breakpoints.down(1200))
    const is800=useMediaQuery(theme.breakpoints.down(800))
    const is700=useMediaQuery(theme.breakpoints.down(700))
    const is600=useMediaQuery(theme.breakpoints.down(600))
    const is500=useMediaQuery(theme.breakpoints.down(500))
    const is488=useMediaQuery(theme.breakpoints.down(488))

    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const products=useSelector(selectProducts)
    const totalResults=useSelector(selectProductTotalResults)
    const loggedInUser=useSelector(selectLoggedInUser)

    const productFetchStatus=useSelector(selectProductFetchStatus)

    const wishlistItems=useSelector(selectWishlistItems)
    const wishlistItemAddStatus=useSelector(selectWishlistItemAddStatus)
    const wishlistItemDeleteStatus=useSelector(selectWishlistItemDeleteStatus)

    const cartItems=useSelector(selectCartItems)
    const cartItemAddStatus=useSelector(selectCartItemAddStatus)

    const isProductFilterOpen=useSelector(selectProductIsFilterOpen)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    // Read search query from URL parameters
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const urlSearchQuery = searchParams.get('search');
        if (urlSearchQuery) {
            setSearchQuery(urlSearchQuery);
        } else {
            setSearchQuery('');
        }
    }, [location.search]);

    // Scroll to product grid or top on search change
    useEffect(() => {
        if (searchQuery.trim()) {
            // Scroll to product grid
            setTimeout(() => {
                productGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [searchQuery]);

    // Advanced search and filtering
    useEffect(() => {
        let filtered = products;
        
        // Only filter if there's a search query
        if (searchQuery.trim()) {
            filtered = products.filter(product => {
                const matchesSearch = (product.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                                    (product.brand?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                                    (product.category?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase())
                
                const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
                
                return matchesSearch && matchesPrice
            });
        } else {
            // When search is empty, only apply price filter
            filtered = products.filter(product => {
                const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
                return matchesPrice
            });
        }
        
        setFilteredProducts(filtered)
    }, [products, searchQuery, priceRange])

    const handleBrandFilters=(e)=>{

        const filterSet=new Set(filters.brand)

        if(e.target.checked){filterSet.add(e.target.value)}
        else{filterSet.delete(e.target.value)}

        const filterArray = Array.from(filterSet);
        setFilters({...filters,brand:filterArray})
    }

    const handleCategoryFilters=(e)=>{
        const filterSet=new Set(filters.category)

        if(e.target.checked){filterSet.add(e.target.value)}
        else{filterSet.delete(e.target.value)}

        const filterArray = Array.from(filterSet);
        setFilters({...filters,category:filterArray})
    }

    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
        })
    },[])

    useEffect(()=>{
        setPage(1)
    },[totalResults])


    useEffect(()=>{
        const finalFilters={...filters}

        finalFilters['pagination']={page:page,limit:ITEMS_PER_PAGE}
        finalFilters['sort']=sort

        if(!loggedInUser?.isAdmin){
            finalFilters['user']=true
        }

        dispatch(fetchProductsAsync(finalFilters))
        
    },[filters,page,sort])


    const handleAddRemoveFromWishlist=(e,productId)=>{
        if(e.target.checked){
            const data={user:loggedInUser?._id,product:productId}
            dispatch(createWishlistItemAsync(data))
        }

        else if(!e.target.checked){
            const index=wishlistItems.findIndex((item)=>item.product._id===productId)
            dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
        }
    }

    const handleAddToCart=(e,productId)=>{
        e.preventDefault()
        e.stopPropagation()
        if(!loggedInUser){
            navigate('/login')
            return
        }
        
        const data={user:loggedInUser._id,product:productId,quantity:1}
        console.log('Adding to cart:', data)
        console.log('User ID:', loggedInUser._id)
        console.log('Product ID:', productId)
        console.log('Base URL:', process.env.REACT_APP_BASE_URL)
        console.log('Stored token:', localStorage.getItem('authToken'))
        
        // Add a small delay to prevent rapid clicking
        setTimeout(() => {
            dispatch(addToCartAsync(data))
        }, 100)
    }

    useEffect(()=>{
        if(wishlistItemAddStatus==='fulfilled'){
            toast.success("Product added to wishlist")
        }
        else if(wishlistItemAddStatus==='rejected'){
            toast.error("Error adding product to wishlist, please try again later")
        }

    },[wishlistItemAddStatus])

    useEffect(()=>{
        if(wishlistItemDeleteStatus==='fulfilled'){
            toast.success("Product removed from wishlist")
        }
        else if(wishlistItemDeleteStatus==='rejected'){
            toast.error("Error removing product from wishlist, please try again later")
        }
    },[wishlistItemDeleteStatus])

    useEffect(()=>{
        if(cartItemAddStatus==='fulfilled'){
            toast.success("Product added to cart")
        }
        else if(cartItemAddStatus==='rejected'){
            toast.error("Error adding product to cart, please try again later")
        }
        
    },[cartItemAddStatus])

    useEffect(()=>{
        if(productFetchStatus==='rejected'){
            toast.error("Error fetching products, please try again later")
        }
    },[productFetchStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(resetProductFetchStatus())
            dispatch(resetWishlistItemAddStatus())
            dispatch(resetWishlistItemDeleteStatus())
            dispatch(resetCartItemAddStatus())
        }
    },[])


    const handleFilterClose=()=>{
        dispatch(toggleFilters())
    }

  return (
    <>
    {/* filters side bar */}

    {
        productFetchStatus==='pending'?
        <Stack width={is500?"35vh":'25rem'} height={'calc(100vh - 4rem)'} justifyContent={'center'} marginRight={'auto'} marginLeft={'auto'}>
            <Lottie animationData={loadingAnimation}/>
        </Stack>
        :
        <>
        <motion.div style={{
          position:"fixed",
          background:"rgba(26, 26, 46, 0.95)",
          backdropFilter: 'blur(20px)',
          height:"100vh",
          padding:'2rem',
          overflowY:"scroll",
          width:is500?"100vw":"30rem",
          zIndex:500,
          borderRight: '1px solid rgba(139, 92, 246, 0.2)',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.4)',
          color: '#FFFFFF'
        }}  variants={{show:{left:0},hide:{left:-500}}} initial={'hide'} transition={{ease:"easeInOut",duration:.7,type:"spring"}} animate={isProductFilterOpen===true?"show":"hide"}>

            {/* Animated Stars for Filter Sidebar */}
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
              {[...Array(8)].map((_, i) => (
                <Box
                  key={`filter-star-${i}`}
                  sx={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    background: '#A78BFA',
                    borderRadius: '50%',
                    animation: `filter-twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    '@keyframes filter-twinkle': {
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
            </Box>

            {/* fitlers section */}
            <Stack mb={'5rem'} sx={{scrollBehavior:"smooth",overflowY:"scroll", position: 'relative', zIndex: 2}}>

                    {/* Header with Icon */}
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Box sx={{ 
                                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                                borderRadius: '50%',
                                width: 40,
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                            }}>
                                <TuneIcon sx={{ color: '#FFFFFF', fontSize: 20 }} />
                            </Box>
                            <Typography 
                              variant='h4' 
                              sx={{
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >
                              Filters
                            </Typography>
                        </Stack>

                        <IconButton 
                          onClick={handleFilterClose} 
                          sx={{
                            color: '#8B5CF6',
                            background: 'rgba(139, 92, 246, 0.1)',
                            borderRadius: '50%',
                            '&:hover': {
                              background: 'rgba(139, 92, 246, 0.2)',
                              transform: 'scale(1.1)',
                            }
                          }}
                        >
                            <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
                                <ClearIcon fontSize='medium'/>
                            </motion.div>
                        </IconButton>
                    </Stack>

                    {/* Advanced Search */}
                    <Stack mt={4} rowGap={2}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                            <SearchIcon sx={{ color: '#8B5CF6', fontSize: 20 }} />
                            <Typography sx={{ 
                                color: '#FFFFFF', 
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Search Products
                            </Typography>
                        </Stack>
                        <TextField
                            fullWidth
                            placeholder="Search by name, brand, or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ color: '#8B5CF6', mr: 1 }} />,
                            }}
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
                    </Stack>

                    {/* Price Range Filter */}
                    <Stack mt={4} rowGap={2}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                            <Box sx={{ 
                                background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                            }}>
                                <Typography sx={{ color: '#FFFFFF', fontSize: 14, fontWeight: 600 }}>$</Typography>
                            </Box>
                            <Typography sx={{ 
                                color: '#FFFFFF', 
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Price Range
                            </Typography>
                        </Stack>
                        <Box sx={{ 
                            px: 3, 
                            py: 3,
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: 3,
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderColor: 'rgba(16, 185, 129, 0.4)',
                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                            }
                        }}>
                            <Slider
                                value={priceRange}
                                onChange={(event, newValue) => {
                                    setPriceRange(newValue);
                                    // Trigger immediate search update
                                    setTimeout(() => {
                                        const filtered = products.filter(product => {
                                            const matchesSearch = !searchQuery.trim() || 
                                                (product.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                                                (product.brand?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                                                (product.category?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase());
                                            
                                            const matchesPrice = product.price >= newValue[0] && product.price <= newValue[1];
                                            
                                            return matchesSearch && matchesPrice;
                                        });
                                        setFilteredProducts(filtered);
                                    }, 100);
                                }}
                                valueLabelDisplay="on"
                                min={0}
                                max={1000}
                                step={10}
                                sx={{
                                    color: '#10B981',
                                    height: 8,
                                    '& .MuiSlider-thumb': {
                                        background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                                        width: 24,
                                        height: 24,
                                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                                        '&:hover': {
                                            boxShadow: '0 0 0 12px rgba(16, 185, 129, 0.2)',
                                            transform: 'scale(1.2)',
                                        },
                                        '&.Mui-active': {
                                            boxShadow: '0 0 0 16px rgba(16, 185, 129, 0.3)',
                                        },
                                        transition: 'all 0.2s ease',
                                    },
                                    '& .MuiSlider-track': {
                                        background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
                                        height: 8,
                                        borderRadius: 4,
                                        boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)',
                                    },
                                    '& .MuiSlider-rail': {
                                        background: 'rgba(16, 185, 129, 0.2)',
                                        height: 8,
                                        borderRadius: 4,
                                    },
                                    '& .MuiSlider-valueLabel': {
                                        background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                                        color: '#FFFFFF',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                                    },
                                }}
                            />
                            <Stack flexDirection="row" justifyContent="space-between" mt={3}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Typography sx={{ 
                                        color: '#10B981', 
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        px: 2,
                                        py: 1,
                                        borderRadius: 2,
                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.2)',
                                        textAlign: 'center',
                                        minWidth: '80px'
                                    }}>
                                        ${priceRange[0]}
                                    </Typography>
                                </motion.div>
                                <Typography sx={{ 
                                    color: '#94A3B8', 
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    alignSelf: 'center'
                                }}>
                                    to
                                </Typography>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Typography sx={{ 
                                        color: '#10B981', 
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        px: 2,
                                        py: 1,
                                        borderRadius: 2,
                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.2)',
                                        textAlign: 'center',
                                        minWidth: '80px'
                                    }}>
                                        ${priceRange[1]}
                                    </Typography>
                                </motion.div>
                            </Stack>
                            
                            {/* Price Range Info */}
                            <Stack direction="row" justifyContent="center" mt={2}>
                                <Typography sx={{ 
                                    color: '#94A3B8', 
                                    fontSize: '0.8rem',
                                    fontWeight: 500,
                                    textAlign: 'center',
                                    background: 'rgba(148, 163, 184, 0.1)',
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1
                                }}>
                                    {products.filter(product => 
                                        product.price >= priceRange[0] && product.price <= priceRange[1]
                                    ).length} products in range
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>

                    {/* Quick Categories */}
                    <Stack mt={4} rowGap={2}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                            <Box sx={{ 
                                background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
                            }}>
                                <Typography sx={{ color: '#FFFFFF', fontSize: 14, fontWeight: 600 }}>🎒</Typography>
                            </Box>
                            <Typography sx={{ 
                                color: '#FFFFFF', 
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Quick Categories
                            </Typography>
                        </Stack>
                        <Stack rowGap={1}>
                            {['Totes', 'Backpacks', 'Travel Bags', 'Hip Bags', 'Laptop Sleeves'].map((category, index) => (
                                <motion.div
                                    key={category}
                                    whileHover={{ x: 5, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Typography 
                                        sx={{
                                            cursor: "pointer", 
                                            color: '#E0E7FF', 
                                            fontWeight: 500, 
                                            py: 1,
                                            px: 2,
                                            borderRadius: 1,
                                            transition: 'all 0.3s ease',
                                            '&:hover': { 
                                                color: '#F59E0B',
                                                background: 'rgba(245, 158, 11, 0.1)',
                                                transform: 'translateX(5px)'
                                            }
                                        }} 
                                        variant='body2'
                                    >
                                        {category}
                                    </Typography>
                                </motion.div>
                            ))}
                        </Stack>
                    </Stack>

                    {/* brand filters */}
                    <Stack mt={2}>
                        <Accordion sx={{
                          background: 'rgba(15, 15, 35, 0.3)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(139, 92, 246, 0.1)',
                          borderRadius: 2,
                          '&:before': { display: 'none' },
                          '& .MuiAccordionSummary-root': {
                            color: '#FFFFFF',
                            '&:hover': {
                              background: 'rgba(139, 92, 246, 0.05)',
                            }
                          },
                          '& .MuiAccordionDetails-root': {
                            color: '#94A3B8'
                          }
                        }}>
                            <AccordionSummary expandIcon={<AddIcon sx={{ color: '#8B5CF6' }} />}  aria-controls="brand-filters" id="brand-filters" >
                                    <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>Brands</Typography>
                            </AccordionSummary>

                            <AccordionDetails sx={{p:0}}>
                                <FormGroup onChange={handleBrandFilters}>
                                    {
                                        brands?.map((brand)=>(
                                            <motion.div style={{width:"fit-content"}} whileHover={{x:5}} whileTap={{scale:0.9}}>
                                                <FormControlLabel 
                                                  sx={{
                                                    ml: 1,
                                                    '& .MuiFormControlLabel-label': {
                                                      color: '#94A3B8',
                                                      fontWeight: 500
                                                    }
                                                  }} 
                                                  control={
                                                    <Checkbox 
                                                      sx={{
                                                        color: '#8B5CF6',
                                                        '&.Mui-checked': {
                                                          color: '#8B5CF6',
                                                        }
                                                      }}
                                                      whileHover={{scale:1.1}} 
                                                    />
                                                  } 
                                                  label={brand.name} 
                                                  value={brand._id} 
                                                />
                                            </motion.div>
                                        ))
                                    }
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>

                    {/* category filters */}
                    <Stack mt={2}>
                        <Accordion sx={{
                          background: 'rgba(15, 15, 35, 0.3)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(139, 92, 246, 0.1)',
                          borderRadius: 2,
                          '&:before': { display: 'none' },
                          '& .MuiAccordionSummary-root': {
                            color: '#FFFFFF',
                            '&:hover': {
                              background: 'rgba(139, 92, 246, 0.05)',
                            }
                          },
                          '& .MuiAccordionDetails-root': {
                            color: '#94A3B8'
                          }
                        }}>
                            <AccordionSummary expandIcon={<AddIcon sx={{ color: '#8B5CF6' }} />}  aria-controls="brand-filters" id="brand-filters" >
                                    <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>Category</Typography>
                            </AccordionSummary>

                            <AccordionDetails sx={{p:0}}>
                                <FormGroup onChange={handleCategoryFilters}>
                                    {
                                        categories?.map((category)=>(
                                            <motion.div style={{width:"fit-content"}} whileHover={{x:5}} whileTap={{scale:0.9}}>
                                                <FormControlLabel 
                                                  sx={{
                                                    ml: 1,
                                                    '& .MuiFormControlLabel-label': {
                                                      color: '#94A3B8',
                                                      fontWeight: 500
                                                    }
                                                  }} 
                                                  control={
                                                    <Checkbox 
                                                      sx={{
                                                        color: '#8B5CF6',
                                                        '&.Mui-checked': {
                                                          color: '#8B5CF6',
                                                        }
                                                      }}
                                                      whileHover={{scale:1.1}} 
                                                    />
                                                  } 
                                                  label={category.name} 
                                                  value={category._id} 
                                                />
                                            </motion.div>
                                        ))
                                    }
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
            </Stack>

        </motion.div>
        
        <Stack mb={'3rem'} sx={{
          background: 'linear-gradient(135deg, #0A0A1A 0%, #1A0B2E 25%, #2D1B69 50%, #1A0B2E 75%, #0A0A1A 100%)',
          minHeight: '100vh',
          color: '#fff',
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'hidden',
          position: 'relative',
          zIndex: 1,
          boxSizing: 'border-box',
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
              {/* Large Stars */}
              {[...Array(15)].map((_, i) => (
                <Box
                  key={`large-star-${i}`}
                  sx={{
                    position: 'absolute',
                    width: '3px',
                    height: '3px',
                    background: '#FFFFFF',
                    borderRadius: '50%',
                    boxShadow: '0 0 6px #FFFFFF, 0 0 12px rgba(139, 92, 246, 0.6)',
                    animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite, float ${8 + Math.random() * 4}s ease-in-out infinite, rotate ${12 + Math.random() * 6}s linear infinite`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    '@keyframes twinkle': {
                      '0%, 100%': {
                        opacity: 0.3,
                        transform: 'scale(1)',
                      },
                      '50%': {
                        opacity: 1,
                        transform: 'scale(1.2)',
                      },
                    },
                    '@keyframes float': {
                      '0%, 100%': {
                        transform: 'translateY(0px) translateX(0px)',
                      },
                      '25%': {
                        transform: 'translateY(-10px) translateX(5px)',
                      },
                      '50%': {
                        transform: 'translateY(-5px) translateX(-3px)',
                      },
                      '75%': {
                        transform: 'translateY(-15px) translateX(8px)',
                      },
                    },
                    '@keyframes rotate': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' },
                    },
                  }}
                />
              ))}
              
              {/* Medium Stars */}
              {[...Array(25)].map((_, i) => (
                <Box
                  key={`medium-star-${i}`}
                  sx={{
                    position: 'absolute',
                    width: '2px',
                    height: '2px',
                    background: '#E0E7FF',
                    borderRadius: '50%',
                    boxShadow: '0 0 4px rgba(139, 92, 246, 0.4)',
                    animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite, float-reverse ${6 + Math.random() * 3}s ease-in-out infinite, pulse ${4 + Math.random() * 2}s ease-in-out infinite`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    '@keyframes float-reverse': {
                      '0%, 100%': {
                        transform: 'translateY(0px) translateX(0px)',
                      },
                      '33%': {
                        transform: 'translateY(8px) translateX(-6px)',
                      },
                      '66%': {
                        transform: 'translateY(12px) translateX(4px)',
                      },
                    },
                    '@keyframes pulse': {
                      '0%, 100%': {
                        boxShadow: '0 0 4px rgba(139, 92, 246, 0.4)',
                      },
                      '50%': {
                        boxShadow: '0 0 8px rgba(139, 92, 246, 0.8), 0 0 12px rgba(167, 139, 250, 0.6)',
                      },
                    },
                  }}
                />
              ))}
              
              {/* Small Stars */}
              {[...Array(40)].map((_, i) => (
                <Box
                  key={`small-star-${i}`}
                  sx={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    background: '#A78BFA',
                    borderRadius: '50%',
                    animation: `twinkle ${1.5 + Math.random() * 2}s ease-in-out infinite, drift ${10 + Math.random() * 5}s linear infinite, color-shift ${6 + Math.random() * 3}s ease-in-out infinite`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    '@keyframes drift': {
                      '0%': {
                        transform: 'translateX(0px) translateY(0px)',
                      },
                      '25%': {
                        transform: 'translateX(15px) translateY(-8px)',
                      },
                      '50%': {
                        transform: 'translateX(25px) translateY(5px)',
                      },
                      '75%': {
                        transform: 'translateX(10px) translateY(12px)',
                      },
                      '100%': {
                        transform: 'translateX(0px) translateY(0px)',
                      },
                    },
                    '@keyframes color-shift': {
                      '0%, 100%': {
                        background: '#A78BFA',
                      },
                      '25%': {
                        background: '#C4B5FD',
                      },
                      '50%': {
                        background: '#DDD6FE',
                      },
                      '75%': {
                        background: '#E0E7FF',
                      },
                    },
                  }}
                />
              ))}
              
              {/* Shooting Stars */}
              {[...Array(3)].map((_, i) => (
                <Box
                  key={`shooting-star-${i}`}
                  sx={{
                    position: 'absolute',
                    width: '2px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #FFFFFF, transparent)',
                    borderRadius: '50%',
                    animation: `shooting-star ${8 + Math.random() * 4}s linear infinite, shooting-trail ${8 + Math.random() * 4}s linear infinite`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 8}s`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '100px',
                      height: '1px',
                      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(139, 92, 246, 0.6), transparent)',
                      transform: 'translateX(-100px)',
                      animation: 'shooting-trail 8s linear infinite',
                    },
                    '@keyframes shooting-star': {
                      '0%': {
                        transform: 'translateX(-100px) translateY(0px)',
                        opacity: 0,
                      },
                      '10%': {
                        opacity: 1,
                      },
                      '90%': {
                        opacity: 1,
                      },
                      '100%': {
                        transform: 'translateX(calc(100vw + 100px)) translateY(100px)',
                        opacity: 0,
                      },
                    },
                    '@keyframes shooting-trail': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateX(-100px) scaleX(0)',
                      },
                      '10%': {
                        opacity: 1,
                        transform: 'translateX(-50px) scaleX(1)',
                      },
                      '90%': {
                        opacity: 1,
                        transform: 'translateX(50px) scaleX(1)',
                      },
                      '100%': {
                        opacity: 0,
                        transform: 'translateX(100px) scaleX(0)',
                      },
                    },
                  }}
                />
              ))}
              
              {/* Sparkle Stars */}
              {[...Array(8)].map((_, i) => (
                <Box
                  key={`sparkle-star-${i}`}
                  sx={{
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    background: 'radial-gradient(circle, #FFFFFF 30%, rgba(139, 92, 246, 0.8) 70%)',
                    borderRadius: '50%',
                    animation: `sparkle ${5 + Math.random() * 3}s ease-in-out infinite, sparkle-float ${7 + Math.random() * 4}s ease-in-out infinite`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    '@keyframes sparkle': {
                      '0%, 100%': {
                        opacity: 0.2,
                        transform: 'scale(0.5) rotate(0deg)',
                        boxShadow: '0 0 4px rgba(255, 255, 255, 0.3)',
                      },
                      '25%': {
                        opacity: 1,
                        transform: 'scale(1.5) rotate(90deg)',
                        boxShadow: '0 0 12px rgba(255, 255, 255, 0.8), 0 0 20px rgba(139, 92, 246, 0.6)',
                      },
                      '50%': {
                        opacity: 0.8,
                        transform: 'scale(1.2) rotate(180deg)',
                        boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
                      },
                      '75%': {
                        opacity: 1,
                        transform: 'scale(1.8) rotate(270deg)',
                        boxShadow: '0 0 16px rgba(255, 255, 255, 0.9), 0 0 24px rgba(139, 92, 246, 0.8)',
                      },
                    },
                    '@keyframes sparkle-float': {
                      '0%, 100%': {
                        transform: 'translateY(0px) translateX(0px)',
                      },
                      '20%': {
                        transform: 'translateY(-20px) translateX(10px)',
                      },
                      '40%': {
                        transform: 'translateY(-10px) translateX(-15px)',
                      },
                      '60%': {
                        transform: 'translateY(-25px) translateX(5px)',
                      },
                      '80%': {
                        transform: 'translateY(-5px) translateX(20px)',
                      },
                    },
                  }}
                />
              ))}
              
              {/* Constellation Lines */}
              <Box sx={{
                position: 'absolute',
                top: '20%',
                left: '15%',
                width: '200px',
                height: '150px',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: `
                    linear-gradient(45deg, transparent 40%, rgba(139, 92, 246, 0.1) 50%, transparent 60%),
                    linear-gradient(-45deg, transparent 30%, rgba(139, 92, 246, 0.08) 40%, transparent 50%),
                    linear-gradient(90deg, transparent 60%, rgba(139, 92, 246, 0.06) 70%, transparent 80%)
                  `,
                  animation: 'constellation-glow 6s ease-in-out infinite',
                  '@keyframes constellation-glow': {
                    '0%, 100%': { opacity: 0.3 },
                    '50%': { opacity: 0.8 },
                  },
                },
              }} />
              
              {/* Additional Constellation */}
              <Box sx={{
                position: 'absolute',
                top: '60%',
                right: '20%',
                width: '150px',
                height: '120px',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: `
                    linear-gradient(135deg, transparent 35%, rgba(167, 139, 250, 0.12) 45%, transparent 55%),
                    linear-gradient(225deg, transparent 25%, rgba(139, 92, 246, 0.09) 35%, transparent 45%)
                  `,
                  animation: 'constellation-glow 8s ease-in-out infinite',
                  animationDelay: '2s',
                },
              }} />
            </Box>

            {/* banners section */}
            {
                !is600 && 
            <Stack sx={{width:"100%",height:is800?"300px":is1200?"400px":"500px", position: 'relative', zIndex: 2}}>
                <ProductBanner />
            </Stack>
            }

            {/* Feature Highlights Row */}
            <Stack
              direction={is700 ? 'column' : 'row'}
              spacing={is700 ? 2 : 4}
              alignItems="center"
              justifyContent="center"
              sx={{
                width: '100%',
                maxWidth: '1200px',
                mx: 'auto',
                mt: 6,
                mb: 8,
                zIndex: 2,
                position: 'relative',
              }}
            >
              {/* Floating particles effect */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(167, 139, 250, 0.08) 0%, transparent 40%)',
                pointerEvents: 'none',
                zIndex: 1,
              }} />
              {/* Feature Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.08, 
                  rotateY: 5,
                  boxShadow: '0 20px 60px 0 rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)',
                  zIndex: 10
                }}
                style={{ display: 'flex', position: 'relative', zIndex: 2 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -12, 0],
                    rotateZ: [0, 1, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                >
                  <Stack
                    alignItems="center"
                    sx={{
                      background: 'linear-gradient(135deg, rgba(24, 24, 47, 0.95) 0%, rgba(45, 27, 105, 0.9) 100%)',
                      borderRadius: '28px',
                      px: 5,
                      py: 4,
                      minWidth: '220px',
                      boxShadow: '0 8px 40px 0 rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      border: '2px solid rgba(139, 92, 246, 0.25)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.6s',
                      },
                      '&:hover::before': {
                        transform: 'translateX(100%)',
                      }
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Box sx={{ fontSize: 48, mb: 2, filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3))' }}>🚚</Box>
                    </motion.div>
                    <Typography fontWeight={800} color="#fff" fontSize="1.3rem" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Free Shipping</Typography>
                    <Typography color="#E0E7FF" fontSize="1rem" sx={{ textAlign: 'center', opacity: 0.9 }}>On all orders above $50</Typography>
                  </Stack>
                </motion.div>
              </motion.div>
              {/* Feature Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.08, 
                  rotateY: -5,
                  boxShadow: '0 20px 60px 0 rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)',
                  zIndex: 10
                }}
                style={{ display: 'flex', position: 'relative', zIndex: 2 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, 12, 0],
                    rotateZ: [0, -1, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 }}
                >
                  <Stack
                    alignItems="center"
                    sx={{
                      background: 'linear-gradient(135deg, rgba(24, 24, 47, 0.95) 0%, rgba(45, 27, 105, 0.9) 100%)',
                      borderRadius: '28px',
                      px: 5,
                      py: 4,
                      minWidth: '220px',
                      boxShadow: '0 8px 40px 0 rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      border: '2px solid rgba(139, 92, 246, 0.25)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.6s',
                      },
                      '&:hover::before': {
                        transform: 'translateX(100%)',
                      }
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    >
                      <Box sx={{ fontSize: 48, mb: 2, filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3))' }}>💬</Box>
                    </motion.div>
                    <Typography fontWeight={800} color="#fff" fontSize="1.3rem" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>24/7 Support</Typography>
                    <Typography color="#E0E7FF" fontSize="1rem" sx={{ textAlign: 'center', opacity: 0.9 }}>We're here for you anytime</Typography>
                  </Stack>
                </motion.div>
              </motion.div>
              {/* Feature Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.08, 
                  rotateY: 5,
                  boxShadow: '0 20px 60px 0 rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)',
                  zIndex: 10
                }}
                style={{ display: 'flex', position: 'relative', zIndex: 2 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -12, 0],
                    rotateZ: [0, 1, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 2 }}
                >
                  <Stack
                    alignItems="center"
                    sx={{
                      background: 'linear-gradient(135deg, rgba(24, 24, 47, 0.95) 0%, rgba(45, 27, 105, 0.9) 100%)',
                      borderRadius: '28px',
                      px: 5,
                      py: 4,
                      minWidth: '220px',
                      boxShadow: '0 8px 40px 0 rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      border: '2px solid rgba(139, 92, 246, 0.25)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.6s',
                      },
                      '&:hover::before': {
                        transform: 'translateX(100%)',
                      }
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    >
                      <Box sx={{ fontSize: 48, mb: 2, filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3))' }}>🔄</Box>
                    </motion.div>
                    <Typography fontWeight={800} color="#fff" fontSize="1.3rem" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Easy Returns</Typography>
                    <Typography color="#E0E7FF" fontSize="1rem" sx={{ textAlign: 'center', opacity: 0.9 }}>30-day hassle-free returns</Typography>
                  </Stack>
                </motion.div>
              </motion.div>
            </Stack>

                {/* products */}
                <Stack rowGap={5} mt={is600?2:0} sx={{ position: 'relative', zIndex: 2 }}>

                    {/* sort options */}
                    <Stack flexDirection={'row'} mr={'2rem'} justifyContent={'flex-end'} alignItems={'center'} columnGap={5}>
                                        
                        <Stack alignSelf={'flex-end'} width={'12rem'}>
                            <FormControl fullWidth>
                                    <InputLabel id="sort-dropdown" sx={{ color: '#94A3B8' }}>Sort</InputLabel>
                                    <Select
                                        variant='standard'
                                        labelId="sort-dropdown"
                                        label="Sort"
                                        onChange={(e)=>setSort(e.target.value)}
                                        value={sort}
                                        sx={{
                                          color: '#FFFFFF',
                                          '& .MuiSelect-icon': {
                                            color: '#8B5CF6'
                                          },
                                          '&:before': {
                                            borderColor: 'rgba(139, 92, 246, 0.3)',
                                          },
                                          '&:after': {
                                            borderColor: '#8B5CF6',
                                          },
                                          '& .MuiSelect-select': {
                                            color: '#FFFFFF'
                                          }
                                        }}
                                    >
                                        <MenuItem sx={{ color: '#94A3B8' }} value={null}>Reset</MenuItem>
                                        {
                                            sortOptions.map((option)=>(
                                                <MenuItem key={option} value={option} sx={{ color: '#94A3B8' }}>{option.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                            </FormControl>
                        </Stack>
                    
                    </Stack>

                    {/* Search Results Info */}
                    {searchQuery.trim() && (
                        <Stack alignItems="center" sx={{ mb: 2 }}>
                            <Typography sx={{ color: '#94A3B8', fontWeight: 500 }}>
                                Found {filteredProducts.length} products matching "{searchQuery}"
                            </Typography>
                        </Stack>
                    )}

                    {/* product grid */}
                    <Grid ref={productGridRef} gap={is700?1:2} container justifyContent={'center'} alignContent={'center'}>
                        {
                            filteredProducts.map((product)=>(
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={product._id}>
                                    <ProductCard 
                                        id={product._id} 
                                        title={product.title} 
                                        thumbnail={product.thumbnail} 
                                        brand={product.brand.name} 
                                        price={product.price} 
                                        handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                                        handleAddToCart={handleAddToCart}
                                        isProductAlreadyinWishlist={wishlistItems.some((item)=>item.product._id===product._id)}
                                        isProductAlreadyInCart={cartItems.some((item)=>item.product._id===product._id)}
                                        isWishlistCard={false}
                                        isAdminCard={loggedInUser?.isAdmin}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                    
                    {/* pagination */}
                    <Stack alignSelf={is488?'center':'flex-end'} mr={is488?0:5} rowGap={2} p={is488?1:0}>
                        <Pagination 
                          size={is488?'medium':'large'} 
                          page={page}  
                          onChange={(e,page)=>setPage(page)} 
                          count={Math.ceil(totalResults/ITEMS_PER_PAGE)} 
                          variant="outlined" 
                          shape="rounded"
                          sx={{
                            '& .MuiPaginationItem-root': {
                              color: '#94A3B8',
                              borderColor: 'rgba(139, 92, 246, 0.3)',
                              '&:hover': {
                                background: 'rgba(139, 92, 246, 0.1)',
                                borderColor: '#8B5CF6',
                              },
                              '&.Mui-selected': {
                                background: '#8B5CF6',
                                color: '#FFFFFF',
                                borderColor: '#8B5CF6',
                                '&:hover': {
                                  background: '#7C3AED',
                                }
                              }
                            }
                          }}
                        />
                        <Typography 
                          textAlign={'center'}
                          sx={{ color: '#94A3B8', fontWeight: 500 }}
                        >
                          Showing {(page-1)*ITEMS_PER_PAGE+1} to {page*ITEMS_PER_PAGE>totalResults?totalResults:page*ITEMS_PER_PAGE} of {totalResults} results
                        </Typography>
                    </Stack>    
                
                </Stack>
                
        </Stack>
        </>
    }

    </>
  )
}
