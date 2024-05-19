const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()
const port  = process.env.PORT || 3005

const userRoute = require('../routes/user')
const adminRoute = require('../routes/admin') 



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/public/uploads",express.static('public/uploads'))

app.use(cors(
    {
    origin:[process.env.NODE_ENV === 'production' ? 'https://food-delivery-one-psi.vercel.app':'http://localhost:3004'],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}
))
// 'https://food-delivery-one-psi.vercel.app'||

app.use(userRoute)
app.use(adminRoute)


app.get("/", (req,res)=>{
    res.send("holaa holla ooh")
})


mongoose.connect(process.env.URI).then(()=>{
    app.listen(port, ()=>{
        console.log(`db connected & server running on port ${port}`)
    })
}).catch(err=>{
    console.log(err);
    // app.listen(port, ()=>{
    //     console.log(`server running on port ${port}`)
    // })
})
