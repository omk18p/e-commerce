import React, { useEffect, useState } from 'react'
import { Stack, Typography, Grid, Box, useMediaQuery, useTheme, Chip, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductsAsync, selectProducts } from '../ProductSlice'
import { ProductCard } from './ProductCard'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import GroupIcon from '@mui/icons-material/Group'
import Lottie from 'lottie-react'
import { loadingAnimation } from '../../../assets'
import { addToCartAsync } from '../../cart/CartSlice'
import { createWishlistItemAsync, deleteWishlistItemByIdAsync, selectWishlistItems } from '../../wishlist/WishlistSlice'
import { selectCartItems } from '../../cart/CartSlice'
import { toast } from 'react-toastify'

export const RelatedProducts = ({ currentProduct, currentCategory, currentBrand }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const is1200 = useMediaQuery(theme.breakpoints.down(1200))
  const is800 = useMediaQuery(theme.breakpoints.down(800))
  const is600 = useMediaQuery(theme.breakpoints.down(600))
  const is480 = useMediaQuery(theme.breakpoints.down(480))

  const [relatedProducts, setRelatedProducts] = useState([])
  const [frequentlyBoughtTogether, setFrequentlyBoughtTogether] = useState([])
  const [loading, setLoading] = useState(true)

  const allProducts = useSelector(selectProducts)
  const loggedInUser = useSelector(state => state.AuthSlice.loggedInUser)
  const wishlistItems = useSelector(selectWishlistItems)
  const cartItems = useSelector(selectCartItems)

  // Get related products based on category and brand
  useEffect(() => {
    if (allProducts.length > 0 && currentProduct) {
      const related = allProducts.filter(product => 
        product._id !== currentProduct._id && 
        (product.category?._id === currentCategory?._id || 
         product.brand?._id === currentBrand?._id)
      ).slice(0, 6)

      // Simulate frequently bought together (in real app, this would come from order data)
      const frequentlyBought = allProducts.filter(product => 
        product._id !== currentProduct._id && 
        product.category?._id === currentCategory?._id
      ).slice(0, 4)

      setRelatedProducts(related)
      setFrequentlyBoughtTogether(frequentlyBought)
      setLoading(false)
    }
  }, [allProducts, currentProduct, currentCategory, currentBrand])

  // Fetch products if not already loaded
  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProductsAsync({}))
    }
  }, [dispatch, allProducts.length])

  const handleAddRemoveFromWishlist = (e, productId) => {
    if (!loggedInUser) {
      navigate('/login')
      return
    }
    
    if (e.target.checked) {
      const data = { user: loggedInUser._id, product: productId }
      dispatch(createWishlistItemAsync(data))
      toast.success("Product added to wishlist")
    } else {
      const wishlistItem = wishlistItems.find((item) => item.product._id === productId)
      if (wishlistItem) {
        dispatch(deleteWishlistItemByIdAsync(wishlistItem._id))
        toast.success("Product removed from wishlist")
      }
    }
  }

  const handleAddToCart = (e, productId) => {
    e.preventDefault()
    e.stopPropagation()
    if (!loggedInUser) {
      navigate('/login')
      return
    }
    const data = { user: loggedInUser._id, product: productId, quantity: 1 }
    dispatch(addToCartAsync(data))
    toast.success("Product added to cart")
  }

  if (loading) {
    return (
      <Stack width="100%" maxWidth="1200px" mx="auto" p={is480 ? 2 : 4} mt={4}>
        <Stack alignItems="center" justifyContent="center" minHeight="200px">
          <Lottie animationData={loadingAnimation} style={{ width: 100 }} />
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack width="100%" maxWidth="1400px" mx="auto" p={is480 ? 2 : 4} mt={4} spacing={4}>
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Stack 
            sx={{
              background: 'rgba(26, 26, 46, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '24px',
              p: is480 ? 2 : 4,
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)',
            }}
            spacing={3}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <TrendingUpIcon sx={{ color: '#8B5CF6', fontSize: 28 }} />
              <Typography 
                variant="h5" 
                fontWeight={700}
                sx={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Related Products
              </Typography>
            </Stack>
            
            <Grid container spacing={is600 ? 1 : 2} justifyContent="center">
              {relatedProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product._id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <ProductCard
                      id={product._id}
                      title={product.title}
                      thumbnail={product.thumbnail}
                      brand={product.brand?.name}
                      price={product.price}
                      handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                      handleAddToCart={handleAddToCart}
                      isProductAlreadyinWishlist={wishlistItems.some((item) => item.product._id === product._id)}
                      isProductAlreadyInCart={cartItems.some((item) => item.product._id === product._id)}
                      isWishlistCard={false}
                      isAdminCard={loggedInUser?.isAdmin}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
            
            <Stack alignItems="center" mt={2}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate(`/?category=${currentCategory?._id}`)}
                  sx={{
                    borderColor: '#8B5CF6',
                    color: '#8B5CF6',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#A78BFA',
                      color: '#A78BFA',
                      background: 'rgba(139, 92, 246, 0.1)',
                    }
                  }}
                >
                  View All {currentCategory?.name} Products
                </Button>
              </motion.div>
            </Stack>
          </Stack>
        </motion.div>
      )}

      {/* Frequently Bought Together Section */}
      {frequentlyBoughtTogether.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Stack 
            sx={{
              background: 'rgba(26, 26, 46, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '24px',
              p: is480 ? 2 : 4,
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)',
            }}
            spacing={3}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <GroupIcon sx={{ color: '#8B5CF6', fontSize: 28 }} />
              <Typography 
                variant="h5" 
                fontWeight={700}
                sx={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Frequently Bought Together
              </Typography>
              <Chip 
                label="Save 15%" 
                size="small"
                sx={{
                  background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                  color: '#fff',
                  fontWeight: 600,
                  '& .MuiChip-label': {
                    color: '#fff'
                  }
                }}
              />
            </Stack>
            
            <Grid container spacing={is600 ? 1 : 2} justifyContent="center">
              {frequentlyBoughtTogether.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={product._id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <ProductCard
                      id={product._id}
                      title={product.title}
                      thumbnail={product.thumbnail}
                      brand={product.brand?.name}
                      price={product.price}
                      handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                      handleAddToCart={handleAddToCart}
                      isProductAlreadyinWishlist={wishlistItems.some((item) => item.product._id === product._id)}
                      isProductAlreadyInCart={cartItems.some((item) => item.product._id === product._id)}
                      isWishlistCard={false}
                      isAdminCard={loggedInUser?.isAdmin}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </motion.div>
      )}

      {/* No Related Products Message */}
      {relatedProducts.length === 0 && frequentlyBoughtTogether.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Stack 
            sx={{
              background: 'rgba(26, 26, 46, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '24px',
              p: is480 ? 2 : 4,
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)',
            }}
            alignItems="center" 
            spacing={2} 
            py={4}
          >
            <Typography 
              variant="h6" 
              color="#94A3B8"
              textAlign="center"
            >
              No related products found
            </Typography>
            <Typography 
              variant="body2" 
              color="#64748B"
              textAlign="center"
            >
              Check back later for more products in this category
            </Typography>
          </Stack>
        </motion.div>
      )}
    </Stack>
  )
} 