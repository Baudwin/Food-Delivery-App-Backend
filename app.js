const express = require("express")
const app = express()
const mongoose = require('mongoose')
const port  = 3005

const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin') 

const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/public/uploads",express.static('public/uploads'))

app.use(cors({
    origin:['http://localhost:3004'],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}))

app.get("/", (req,res)=>{
    res.send("server ruuning on vercel")
})

app.use(userRoute)
app.use(adminRoute)



mongoose.connect(process.env.URI).then(()=>{
    app.listen(port, ()=>{
        console.log(`db connected & server running on port ${port}`)
    })
}).catch(err=>{
    console.log(err);
})
