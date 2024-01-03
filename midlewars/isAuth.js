const jwt=require('jsonwebtoken')
const moveappSchema=require('../model/movapp')

exports.isAuth=async(req,res,next)=>{
    try {
        const token=req.header('Authorization')
        const decoded=jwt.verify(token, process.env.privateKey)
        if(!decoded){
            res.status(400).json({errors})
        }

        const user=await moveappSchema.findById(decoded.id)
        res.user=user
        next()
    } catch (err) {
        console.log(err)
    }
}