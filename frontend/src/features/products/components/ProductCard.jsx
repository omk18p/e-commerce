import { Checkbox, Stack, Typography, useMediaQuery, useTheme, IconButton, Dialog, DialogContent, DialogTitle, Rating, Chip, Box } from '@mui/material'
import React from 'react'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const ProductCard = ({id,title,thumbnail,brand,price,handleAddRemoveFromWishlist,isProductAlreadyinWishlist,isProductAlreadyInCart,handleAddToCart,isWishlistCard,isAdminCard}) => {
    const theme=useTheme()
    const navigate = useNavigate()
    const is408=useMediaQuery(theme.breakpoints.down(408))
    const is488=useMediaQuery(theme.breakpoints.down(488))
    const is500=useMediaQuery(theme.breakpoints.down(500))

    const [quickViewOpen, setQuickViewOpen] = React.useState(false)

    const handleQuickView = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setQuickViewOpen(true)
    }

    const handleCloseQuickView = () => {
        setQuickViewOpen(false)
    }

    const handleViewFullDetails = () => {
        setQuickViewOpen(false)
        navigate(`/product-details/${id}`)
    }

    return (
        <>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            style={{ width: '100%' }}
        >
            <Stack 
                component={Link} 
                to={`/product-details/${id}`} 
                sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    background: 'rgba(26, 26, 46, 0.85)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: 2,
                    p: 1.5,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    '&:hover': {
                        boxShadow: '0 12px 40px rgba(139, 92, 246, 0.2)',
                        border: '1px solid rgba(139, 92, 246, 0.4)',
                    }
                }}
            >
                {/* Product Image */}
                <Stack position="relative">
                    <img 
                        style={{
                            width: '100%',
                            aspectRatio: '1/1',
                            objectFit: 'contain',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)'
                        }} 
                        src={thumbnail} 
                        alt={`${title} image`} 
                    />
                    
                    {/* Quick View Overlay */}
                    <Stack
                        position="absolute"
                        top={8}
                        right={8}
                        sx={{
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            '.MuiStack-root:hover &': {
                                opacity: 1
                            }
                        }}
                    >
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <IconButton
                                onClick={handleQuickView}
                                sx={{
                                    background: 'rgba(139, 92, 246, 0.9)',
                                    color: '#FFFFFF',
                                    '&:hover': {
                                        background: '#8B5CF6',
                                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
                                    }
                                }}
                            >
                                <VisibilityIcon fontSize="small" />
                            </IconButton>
                        </motion.div>
                    </Stack>
                </Stack>

                {/* Product Info */}
                <Stack mt={1.5} rowGap={0.5}>
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography 
                            variant='h6' 
                            fontWeight={600} 
                            sx={{
                                color: '#FFFFFF',
                                fontSize: is408 ? '0.8rem' : is488 ? '0.75rem' : is500 ? '0.8rem' : '0.9rem',
                                lineHeight: 1.2
                            }}
                        >
                            {title}
                        </Typography>
                        {
                        !isAdminCard && 
                        <motion.div whileHover={{scale:1.2,y:-5,zIndex:100}} whileTap={{scale:1}} transition={{duration:.3,type:"spring"}}>
                            <Checkbox 
                              onClick={(e)=>e.stopPropagation()} 
                              checked={isProductAlreadyinWishlist} 
                              onChange={(e)=>handleAddRemoveFromWishlist(e,id)} 
                              icon={<FavoriteBorder sx={{color: '#8B5CF6'}} />} 
                              checkedIcon={<Favorite sx={{color:'#EF4444'}} />} 
                              size="small"
                            />
                        </motion.div>
                        }
                    </Stack>
                    <Typography sx={{color: '#94A3B8', fontWeight: 500, fontSize: is408 ? '0.7rem' : '0.8rem'}}>{brand}</Typography>
                </Stack>

                {/* Price and Actions */}
                <Stack sx={{flexDirection:"row",justifyContent:"space-between",alignItems:"center", mt: 1.5}}>
                    <Typography sx={{
                        fontWeight: 700, 
                        fontSize: is408?'0.9rem':is488?'0.8rem':is500?'0.85rem':'1rem', 
                        color: '#8B5CF6',
                        textShadow: '0 0 10px rgba(139, 92, 246, 0.3)'
                    }}>
                        ${price}
                    </Typography>
                    {
                        !isWishlistCard? isProductAlreadyInCart?
                        <Typography sx={{color: '#10B981', fontWeight: 600, fontSize: is408 ? '0.7rem' : '0.8rem'}}>Added to cart</Typography>
                        :
                        !isAdminCard &&
                        <motion.button  
                          whileHover={{scale:1.05}} 
                          whileTap={{scale:1}} 
                          onClick={(e)=>handleAddToCart(e, id)} 
                          style={{
                            padding: is408 ? "4px 8px" : is488 ? "3px 6px" : is500 ? "4px 10px" : "6px 12px",
                            borderRadius:"6px",
                            outline:"none",
                            border:"none",
                            cursor:"pointer",
                            background:"linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
                            color:"white",
                            fontSize: is408?'.6rem':is488?'.55rem':is500?'.6rem':'.7rem',
                            fontWeight: 600,
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.2s ease'
                          }}
                        >
                            <div style={{display:"flex",alignItems:"center",columnGap:".2rem"}}>
                                <ShoppingCartIcon sx={{ fontSize: is408 ? '0.6rem' : '0.7rem' }} />
                                <span>Add</span>
                            </div>
                        </motion.button>
                        :''
                    }
                </Stack>
            </Stack>
        </motion.div>

        {/* Quick View Modal */}
        <Dialog
            open={quickViewOpen}
            onClose={handleCloseQuickView}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    background: 'rgba(26, 26, 46, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: 3,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }
            }}
        >
            <DialogTitle sx={{ 
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                textAlign: 'center'
            }}>
                Quick View - {title}
            </DialogTitle>
            <DialogContent>
                <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                    {/* Product Image */}
                    <Box sx={{ flex: 1 }}>
                        <img 
                            src={thumbnail} 
                            alt={title}
                            style={{
                                width: '100%',
                                maxHeight: '300px',
                                objectFit: 'contain',
                                borderRadius: '12px',
                                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
                            }}
                        />
                    </Box>
                    
                    {/* Product Details */}
                    <Stack sx={{ flex: 1, color: '#FFFFFF' }} spacing={2}>
                        <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 700 }}>
                            {title}
                        </Typography>
                        
                        <Typography sx={{ color: '#94A3B8', fontWeight: 500 }}>
                            Brand: {brand}
                        </Typography>
                        
                        <Typography sx={{ 
                            color: '#8B5CF6', 
                            fontWeight: 800, 
                            fontSize: '1.5rem',
                            textShadow: '0 0 15px rgba(139, 92, 246, 0.4)'
                        }}>
                            ${price}
                        </Typography>
                        
                        <Rating 
                            value={4.5} 
                            readOnly 
                            sx={{ color: '#A78BFA' }}
                        />
                        
                        <Stack direction="row" spacing={1}>
                            <Chip 
                                label="Free Shipping" 
                                sx={{ 
                                    background: 'rgba(16, 185, 129, 0.2)',
                                    color: '#10B981',
                                    border: '1px solid #10B981'
                                }} 
                            />
                            <Chip 
                                label="In Stock" 
                                sx={{ 
                                    background: 'rgba(139, 92, 246, 0.2)',
                                    color: '#8B5CF6',
                                    border: '1px solid #8B5CF6'
                                }} 
                            />
                        </Stack>
                        
                        <Typography sx={{ color: '#E0E7FF', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Experience premium quality with this amazing product. Perfect for your daily needs with exceptional durability and style.
                        </Typography>
                        
                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleViewFullDetails}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                                    color: '#FFFFFF',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                                }}
                            >
                                View Full Details
                            </motion.button>
                            
                            {!isAdminCard && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                        handleAddToCart(e, id)
                                        handleCloseQuickView()
                                    }}
                                    style={{
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        border: '1px solid #8B5CF6',
                                        background: 'rgba(139, 92, 246, 0.1)',
                                        color: '#8B5CF6',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Add to Cart
                                </motion.button>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
        </>
    )
}
