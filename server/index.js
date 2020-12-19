// import express from 'express'
// import bodyParser from 'body-parser'
// import cors from 'cors'
// import mongoose from 'mongoose'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// import postRoutes from './routes/posts'
const postRoutes = require('./routes/posts')

const app = express()
dotenv.config()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors()) 

app.use('/posts', postRoutes)


const PORT = process.env.PORT || 5000

 //set up mongodb
 mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`server running on ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error.message);
    })

mongoose.set('useFindAndModify', false)