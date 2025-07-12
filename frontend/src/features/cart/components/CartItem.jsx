import { Button, IconButton, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { deleteCartItemByIdAsync, updateCartItemByIdAsync } from '../CartSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const CartItem = ({id,thumbnail,title,category,brand,price,quantity,stockQuantity,productId}) => {


    const dispatch=useDispatch()
    const theme=useTheme()
    const is900=useMediaQuery(theme.breakpoints.down(900))
    const is480=useMediaQuery(theme.breakpoints.down(480))
    const is552=useMediaQuery(theme.breakpoints.down(552))

    const handleAddQty=()=>{
        const update={_id:id,quantity:quantity+1}
        dispatch(updateCartItemByIdAsync(update))
    }
    const handleRemoveQty=()=>{
        if(quantity===1){
            dispatch(deleteCartItemByIdAsync(id))
        }
        else{
            const update={_id:id,quantity:quantity-1}
            dispatch(updateCartItemByIdAsync(update))
        }
    }

    const handleProductRemove=()=>{
        dispatch(deleteCartItemByIdAsync(id))
    }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Stack 
        sx={{
          background: 'rgba(26, 26, 46, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: 3,
          p: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(139, 92, 246, 0.2)',
            border: '1px solid rgba(139, 92, 246, 0.4)',
          }
        }}
        component={is900?'':Paper} 
        elevation={0}
        flexDirection={'row'} 
        justifyContent={'space-between'} 
        alignItems={'center'}
      >
        
        {/* image and details */}
        <Stack flexDirection={'row'} rowGap={'1rem'} alignItems={'center'} columnGap={2} flexWrap={'wrap'}>

            <Stack width={is552?"auto":'200px'} height={is552?"auto":'200px'} component={Link} to={`/product-details/${productId}`}>
                <img 
                  style={{
                    width:"100%",
                    height:is552?"auto":"100%",
                    aspectRatio:is552?1/1:'',
                    objectFit:'contain',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)'
                  }} 
                  src={thumbnail} 
                  alt={`${title} image unavailabe`} 
                />
            </Stack>

            <Stack alignSelf={''}>
                <Typography 
                  component={Link} 
                  to={`/product-details/${productId}`} 
                  sx={{
                    textDecoration:"none",
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    '&:hover': {
                      color: '#8B5CF6',
                      textShadow: '0 0 8px rgba(139, 92, 246, 0.5)'
                    }
                  }} 
                  variant='h6' 
                  fontWeight={500}
                >
                  {title}
                </Typography>
                <Typography sx={{ color: '#94A3B8', fontWeight: 500 }}>{brand}</Typography>
                <Typography sx={{ color: '#E0E7FF', fontWeight: 600, mt: 1 }}>Quantity</Typography>
                <Stack flexDirection={'row'} alignItems={'center'} sx={{ mt: 1 }}>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <IconButton 
                        onClick={handleRemoveQty}
                        sx={{
                          color: '#8B5CF6',
                          background: 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          '&:hover': {
                            background: 'rgba(139, 92, 246, 0.2)',
                            border: '1px solid #8B5CF6',
                          }
                        }}
                      >
                        <RemoveIcon fontSize='small'/>
                      </IconButton>
                    </motion.div>
                    <Typography sx={{ color: '#FFFFFF', fontWeight: 700, mx: 2, minWidth: '20px', textAlign: 'center' }}>
                      {quantity}
                    </Typography>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <IconButton 
                        onClick={handleAddQty}
                        sx={{
                          color: '#8B5CF6',
                          background: 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          '&:hover': {
                            background: 'rgba(139, 92, 246, 0.2)',
                            border: '1px solid #8B5CF6',
                          }
                        }}
                      >
                        <AddIcon fontSize='small'/>
                      </IconButton>
                    </motion.div>
                </Stack>
            </Stack>
        </Stack>

        {/* price and remove button */}
        <Stack justifyContent={'space-evenly'} alignSelf={is552?'flex-end':''} height={'100%'} rowGap={'1rem'} alignItems={'flex-end'}>
            <Typography 
              sx={{ 
                color: '#8B5CF6', 
                fontWeight: 700, 
                fontSize: '1.2rem',
                textShadow: '0 0 10px rgba(139, 92, 246, 0.3)'
              }}
            >
              ${price}
            </Typography>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size={is480?"small":""} 
                onClick={handleProductRemove} 
                variant='contained'
                sx={{
                  background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
                    boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)',
                  }
                }}
              >
                Remove
              </Button>
            </motion.div>
        </Stack>
      </Stack>
    </motion.div>
  )
}
