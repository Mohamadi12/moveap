const express=require('express')
const moveappSchema=require('../model/movapp')
const bcrypt=require('bcrypt')

exports.register=async(req,res)=>{
    try {
        const{name,email,password}=req.body
        const found=await moveappSchema.findOne({email})
        if(found){return res.status(400).json({msg:'Are you already Register'})}

        const newAdd=moveappSchema(req.body)
        const saltRounds=10
        const salt=bcrypt.genSaltSync(saltRounds)
        const hash=bcrypt.hashSync(password,salt)
        newAdd.password=hash
        await newAdd.save()
        res.status(200).json({msg:'You are welcome',newAdd})
    } catch (err) {
        console.log(err)
    }
}

exports.login=async(req,res)=>{
    try {
        const{ email,password}=req.body
        const found=await moveappSchema.findOne({email})
        if(!found){return res.status(400).json({msg:'Register on the platform first'})}

        const match=bcrypt.compare(password,found.password)
        if(!match){return res.status(400).json({msg:'Invalid Password/Email'})}

        const payload={id: found._id}
        const token=Jwt.sign(payload, process.env.privateKey)
        res.status(200).json({msg:'You are welcome',token,found})
    } catch (err) {
        console.log(err)
    }
}

exports.searchAll=async(req,res)=>{
    try {
        const search=await moveappSchema.find()
        res.status(200).json({msg:'Here is the list',search})
    } catch (err) {
        console.log(err)
    }
}

exports.searchId=async(req,res)=>{
    try {
        const {id}=req.params
        const serchId=await moveappSchema.findById(id)
        res.status(200).json({msg:'Here is what you are looking for',serchId})
    } catch (err) {
        console.log(err)
    }
}

exports.ajout=async(req,res)=>{
    try {
        const newAdd=moveappSchema(req.body)
        await newAdd.save()
        res.status(200).json({msg:'You have added a new movie'})
    } catch (err) {
        console.log(err)
    }
}

exports.update=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await moveappSchema.findByIdAndUpdate(id,{$set:{...req.body}})
        res.status(200).json({msg:'Update successfull'})
    } catch (err) {
        console.log(err)
    }
}

exports.remove=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await moveappSchema.findByIdAndDelete(id)
        res.status(200).json({msg:'Delete successfull'})
    } catch (err) {
        console.log(err)
    }
}