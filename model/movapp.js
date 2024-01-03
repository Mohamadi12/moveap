const mongoose=require('mongoose')


const moveappSchema=mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
},{timestamps:true})

module.exports=mongoose.model('moveapp',moveappSchema)