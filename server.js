const express=require('express')
require('dotenv').config()
const cors=require('cors')
const connect = require('./config/connectDB')
const routeController = require('./routes/routeController')
const app=express()
const Port=5001 || process.env.Port


app.use(express.json())
app.use('/api/movie',routeController)
app.use(cors())
connect()

app.listen(Port,(err)=>{
    err?console.log(err):console.log(`Yes;successfull ${Port}`)
})