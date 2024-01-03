const express=require('express')
const routeController=express.Router()
const { register,login,searchAll,searchId,ajout,update,remove}=require('../controller/controllerRoute')
const{isAuth}=require('../midlewars/isAuth')
const{regValidation, logValidation, validation}=require('../midlewars/validator')

routeController.post('/register',regValidation,validation,register)
routeController.post('/login',logValidation,validation,login)
routeController.get('/search',searchAll)
routeController.get('/search/:id',searchId)
routeController.post('ajout',ajout)
routeController.put('/updated/:id',update)
routeController.delete('/remove/:id',remove)
routeController.get('/user',isAuth,(req,res)=>{
    res.send(req.user)
})




module.exports=routeController