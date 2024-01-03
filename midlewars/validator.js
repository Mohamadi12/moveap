const { body, validationResult } = require('express-validator');

exports.regValidation=[
    body('email','please valid your email'),
    body('password','valid your password')
]

exports.logValidation=[
    body('email','please valid your email'),
]

exports.validation=async(req,res,next)=>{
    try {
        const errors= await validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({errors:errors.array()})
        }
        next()
    } catch (err) {
        console.log(err)
    }
}