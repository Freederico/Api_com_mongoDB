// Initial Data 

const express = require('express')
const mongoose = require("mongoose")
require('dotenv').config() 

const rota = require('./routes/rota')

const app  = express()

app.use(express.urlencoded({extended:true,}))
app.use(express.json())
app.use('/' , rota)


const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.dppievp.mongodb.net/bancodaapi?retryWrites=true&w=majority`)

.then(()=>{
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})

.catch((err)=> console.log(err))

