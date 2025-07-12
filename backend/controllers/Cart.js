const Cart=require('../models/Cart')
const Product=require('../models/Product')

exports.create=async(req,res)=>{
    try {
        console.log('Cart create request:', req.body)
        console.log('Authenticated user:', req.user)
        console.log('Request headers:', req.headers)
        console.log('Request cookies:', req.cookies)
        
        const {product, quantity} = req.body
        const user = req.user._id // Get user ID from authenticated request
        
        console.log('Processing cart item:', {user, product, quantity})
        
        // Validate required fields
        if (!user) {
            console.log('No user ID found')
            return res.status(401).json({message: 'User not authenticated'})
        }
        
        if (!product) {
            console.log('No product ID provided')
            return res.status(400).json({message: 'Product ID is required'})
        }
        
        // Check if product exists
        const productExists = await Product.findById(product)
        if (!productExists) {
            console.log('Product not found:', product)
            return res.status(404).json({message: 'Product not found'})
        }
        console.log('Product found:', productExists.title)
        
        // Check if item already exists in cart
        const existingItem = await Cart.findOne({user, product})
        console.log('Existing item check result:', existingItem)
        
        if(existingItem){
            console.log('Updating existing cart item')
            // Update quantity if item exists
            existingItem.quantity += quantity || 1
            const updatedItem = await existingItem.save()
            console.log('Updated item:', updatedItem)
            const populatedItem = await Cart.findById(updatedItem._id).populate({path:"product",populate:{path:"brand"}})
            console.log('Populated updated item:', populatedItem)
            res.status(200).json(populatedItem)
        } else {
            console.log('Creating new cart item')
            // Create new cart item
            const newCartItem = new Cart({user, product, quantity: quantity || 1})
            console.log('New cart item object:', newCartItem)
            const created = await newCartItem.save()
            console.log('Created cart item:', created)
            const populatedItem = await Cart.findById(created._id).populate({path:"product",populate:{path:"brand"}})
            console.log('Populated created item:', populatedItem)
            res.status(201).json(populatedItem)
        }
    } catch (error) {
        console.log('Cart create error:', error);
        console.log('Error stack:', error.stack);
        return res.status(500).json({message:'Error adding product to cart, please try again later'})
    }
}

exports.getByUserId=async(req,res)=>{
    try {
        const {id}=req.params
        const result = await Cart.find({ user: id }).populate({path:"product",populate:{path:"brand"}});

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error fetching cart items, please trying again later'})
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Cart.findByIdAndUpdate(id,req.body,{new:true}).populate({path:"product",populate:{path:"brand"}});
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error updating cart items, please trying again later'})
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Cart.findByIdAndDelete(id)
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error deleting cart item, please trying again later'})
    }
}

exports.deleteByUserId=async(req,res)=>{

    try {
        const {id}=req.params
        await Cart.deleteMany({user:id})
        res.sendStatus(204)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Some Error occured while resetting your cart"})
    }

}