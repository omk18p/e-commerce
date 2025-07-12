require('dotenv').config()
const jwt=require('jsonwebtoken')
const { sanitizeUser } = require('../utils/SanitizeUser')

exports.verifyToken=async(req,res,next)=>{
    try {
        console.log('Verifying token for request:', req.path)
        console.log('Cookies:', req.cookies)
        
        // extract the token from request cookies
        const {token}=req.cookies

        // if token is not there, return 401 response
        if(!token){
            console.log('No token found in cookies')
            return res.status(401).json({message:"Token missing, please login again"})
        }

        console.log('Token found, verifying...')

        // verifies the token 
        const decodedInfo=jwt.verify(token,process.env.SECRET_KEY)

        // checks if decoded info contains legit details, then set that info in req.user and calls next
        if(decodedInfo && decodedInfo._id && decodedInfo.email){
            console.log('Token verified successfully for user:', decodedInfo._id)
            req.user=decodedInfo
            next()
        }

        // if token is invalid then sends the response accordingly
        else{
            console.log('Invalid token structure')
            return res.status(401).json({message:"Invalid Token, please login again"})
        }
        
    } catch (error) {

        console.log('Token verification error:', error);
        
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired, please login again" });
        } 
        else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid Token, please login again" });
        } 
        else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}