import {axiosi} from '../../config/axios'

export const addToCart=async(item)=>{
    try {
        console.log('Sending cart request:', item)
        console.log('Request headers:', axiosi.defaults.headers)
        console.log('Base URL:', axiosi.defaults.baseURL)
        
        const res=await axiosi.post('/cart',item)
        console.log('Cart response:', res.data)
        return res.data
    } catch (error) {
        console.error('Cart API error:', error)
        console.error('Error status:', error.response?.status)
        console.error('Error response:', error.response?.data)
        console.error('Error config:', error.config)
        
        if (error.response?.status === 401) {
            throw { message: 'Authentication failed. Please login again.' }
        } else if (error.response?.status === 404) {
            throw { message: 'Product not found.' }
        } else if (error.response?.status === 500) {
            throw { message: 'Server error. Please try again later.' }
        } else if (!error.response) {
            throw { message: 'Network error. Please check your connection.' }
        } else {
            throw error.response?.data || {message: 'An unexpected error occurred'}
        }
    }
}
export const fetchCartByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`/cart/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateCartItemById=async(update)=>{
    try {
        const res=await axiosi.patch(`/cart/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const deleteCartItemById=async(id)=>{
    try {
        const res=await axiosi.delete(`/cart/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const resetCartByUserId=async(userId)=>{
    try {
        const res=await axiosi.delete(`/cart/user/${userId}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

// Test authentication function
export const testAuth=async()=>{
    try {
        console.log('Testing authentication...')
        const res=await axiosi.get('/cart/test-auth')
        console.log('Auth test response:', res.data)
        return res.data
    } catch (error) {
        console.error('Auth test error:', error)
        throw error.response?.data || {message: 'Authentication test failed'}
    }
}
