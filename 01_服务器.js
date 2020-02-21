var express = require('express')
var fs = require('fs')
const path = require('path')
var app = express()

app.get('/',(req,res)=>{
    
    res.redirect('/home')
})
app.get('/home',(req,res)=>{
    
    fs.readFile('./dist/index.html',(err,data)=>{
        res.end(data)
    })
})

app.get('/category',(req,res)=>{
    
    fs.readFile('./dist/index.html',(err,data)=>{
        res.end(data)
    })
})
app.get('/cart',(req,res)=>{
    
    fs.readFile('./dist/index.html',(err,data)=>{
        res.end(data)
    })
})

app.get('/profile',(re,res)=>{
    fs.readFile('./dist/index.html',(err,data)=>{
        res.end(data)
    })
})

app.use(express.static(path.join(__dirname,'dist')))

app.listen(8081, () => {
    console.log('server is running ......', 8081)
})