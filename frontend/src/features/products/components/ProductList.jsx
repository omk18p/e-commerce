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
        const data={product:productId,quantity:1}
        console.log('Adding to cart:', data)
        dispatch(addToCartAsync(data))
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

            {/* fitlers section */}
            <Stack mb={'5rem'}  sx={{scrollBehavior:"smooth",overflowY:"scroll"}}>

                    
                        <Typography 
                          variant='h4' 
                          sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 3
                          }}
                        >
                          New Arrivals
                        </Typography>


                            <IconButton 
                              onClick={handleFilterClose} 
                              style={{position:"absolute",top:15,right:15}}
                              sx={{
                                color: '#8B5CF6',
                                '&:hover': {
                                  background: 'rgba(139, 92, 246, 0.1)',
                                }
                              }}
                            >
                                <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
                                    <ClearIcon fontSize='medium'/>
                                </motion.div>
                            </IconButton>

                    {/* Advanced Search */}
                    <Stack mt={4} rowGap={2}>
                        <Typography sx={{ color: '#FFFFFF', fontWeight: 600, mb: 1 }}>Search Products</Typography>
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
                    <Stack mt={3} rowGap={2}>
                        <Typography sx={{ color: '#FFFFFF', fontWeight: 600, mb: 1 }}>Price Range</Typography>
                        <Box sx={{ px: 2 }}>
                            <Slider
                                value={priceRange}
                                onChange={(event, newValue) => setPriceRange(newValue)}
                                valueLabelDisplay="auto"
                                min={0}
                                max={1000}
                                sx={{
                                    color: '#8B5CF6',
                                    '& .MuiSlider-thumb': {
                                        background: '#8B5CF6',
                                        '&:hover': {
                                            boxShadow: '0 0 0 8px rgba(139, 92, 246, 0.2)',
                                        },
                                    },
                                    '& .MuiSlider-track': {
                                        background: 'linear-gradient(90deg, #8B5CF6, #A78BFA)',
                                    },
                                    '& .MuiSlider-rail': {
                                        background: 'rgba(139, 92, 246, 0.2)',
                                    },
                                }}
                            />
                            <Stack flexDirection="row" justifyContent="space-between" mt={1}>
                                <Typography sx={{ color: '#94A3B8', fontSize: '0.9rem' }}>
                                    ${priceRange[0]}
                                </Typography>
                                <Typography sx={{ color: '#94A3B8', fontSize: '0.9rem' }}>
                                    ${priceRange[1]}
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack rowGap={2} mt={4} >
                        <Typography sx={{cursor:"pointer", color: '#E0E7FF', fontWeight: 500, '&:hover': { color: '#8B5CF6' }}} variant='body2'>Totes</Typography>
                        <Typography sx={{cursor:"pointer", color: '#E0E7FF', fontWeight: 500, '&:hover': { color: '#8B5CF6' }}} variant='body2'>Backpacks</Typography>
                        <Typography sx={{cursor:"pointer", color: '#E0E7FF', fontWeight: 500, '&:hover': { color: '#8B5CF6' }}} variant='body2'>Travel Bags</Typography>
                        <Typography sx={{cursor:"pointer", color: '#E0E7FF', fontWeight: 500, '&:hover': { color: '#8B5CF6' }}} variant='body2'>Hip Bags</Typography>
                        <Typography sx={{cursor:"pointer", color: '#E0E7FF', fontWeight: 500, '&:hover': { color: '#8B5CF6' }}} variant='body2'>Laptop Sleeves</Typography>
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
        
        <Stack mb={'3rem'}>
            {/* HERO SECTION REMOVED */}

            {/* banners section */}
            {
                !is600 && 
            <Stack sx={{width:"100%",height:is800?"300px":is1200?"400px":"500px"}}>
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
                mt: 4,
                mb: 6,
                zIndex: 2,
              }}
            >
              {/* Feature Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 #8B5CF6' }}
                style={{ display: 'flex' }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                >
                  <Stack
                    alignItems="center"
                    sx={{
                      background: 'rgba(24, 24, 47, 0.92)',
                      borderRadius: '22px',
                      px: 4,
                      py: 3,
                      minWidth: '200px',
                      boxShadow: '0 0 32px 0 #8B5CF6',
                      backdropFilter: 'blur(10px)',
                      border: '1.5px solid rgba(139, 92, 246, 0.18)',
                      transition: 'box-shadow 0.3s',
                    }}
                  >
                    <Box sx={{ fontSize: 40, mb: 1 }}>🚚</Box>
                    <Typography fontWeight={700} color="#fff">Free Shipping</Typography>
                    <Typography color="#E0E7FF" fontSize={'.95rem'}>On all orders above $50</Typography>
                  </Stack>
                </motion.div>
              </motion.div>
              {/* Feature Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 #8B5CF6' }}
                style={{ display: 'flex' }}
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 }}
                >
                  <Stack
                    alignItems="center"
                    sx={{
                      background: 'rgba(24, 24, 47, 0.92)',
                      borderRadius: '22px',
                      px: 4,
                      py: 3,
                      minWidth: '200px',
                      boxShadow: '0 0 32px 0 #8B5CF6',
                      backdropFilter: 'blur(10px)',
                      border: '1.5px solid rgba(139, 92, 246, 0.18)',
                      transition: 'box-shadow 0.3s',
                    }}
                  >
                    <Box sx={{ fontSize: 40, mb: 1 }}>💬</Box>
                    <Typography fontWeight={700} color="#fff">24/7 Support</Typography>
                    <Typography color="#E0E7FF" fontSize={'.95rem'}>We’re here for you anytime</Typography>
                  </Stack>
                </motion.div>
              </motion.div>
              {/* Feature Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 #8B5CF6' }}
                style={{ display: 'flex' }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 2 }}
                >
                  <Stack
                    alignItems="center"
                    sx={{
                      background: 'rgba(24, 24, 47, 0.92)',
                      borderRadius: '22px',
                      px: 4,
                      py: 3,
                      minWidth: '200px',
                      boxShadow: '0 0 32px 0 #8B5CF6',
                      backdropFilter: 'blur(10px)',
                      border: '1.5px solid rgba(139, 92, 246, 0.18)',
                      transition: 'box-shadow 0.3s',
                    }}
                  >
                    <Box sx={{ fontSize: 40, mb: 1 }}>🔄</Box>
                    <Typography fontWeight={700} color="#fff">Easy Returns</Typography>
                    <Typography color="#E0E7FF" fontSize={'.95rem'}>30-day hassle-free returns</Typography>
                  </Stack>
                </motion.div>
              </motion.div>
            </Stack>

                {/* products */}
                <Stack rowGap={5} mt={is600?2:0}>

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
