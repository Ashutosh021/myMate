const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send("Home")
})

app.listen(2200,()=>{
    console.log('http://localhost:2200')
})