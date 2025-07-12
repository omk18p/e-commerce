const express=require('express')
const cartController=require('../controllers/Cart')
const { verifyToken } = require('../middleware/VerifyToken')
const router=express.Router()

// Test endpoint to check authentication
router.get("/test-auth", verifyToken, (req, res) => {
    res.json({message: "Authentication working", user: req.user})
})

router
    .post("/", verifyToken, cartController.create)
    .get("/user/:id", verifyToken, cartController.getByUserId)
    .patch("/:id", verifyToken, cartController.updateById)
    .delete("/:id", verifyToken, cartController.deleteById)
    .delete("/user/:id", verifyToken, cartController.deleteByUserId)

module.exports=router