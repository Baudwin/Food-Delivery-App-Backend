const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// SIGN A USER WITH TOKEN and secret
const createToken = (user)=>{
const accessToken = jwt.sign({id:user._id, role:user.role}, process.env.secret)
return accessToken
}

// VERIFY THE TOKEN (MIDDLEWARE)
const validateToken = (req,res,next)=>{
const {authorization} = req.headers

if (!authorization) {
    res.status(400).json({message:"Token required"}) 
}
const token = authorization.split(' ')[1]

    try {   
    const data = jwt.verify(token, process.env.secret)
    req.data = data 
    next()
        
    } catch (err) {
        res.send(err)
    }

}

// ADMIN AUTH 
const validateAdmin = (req,res,next)=>{
    const role = req.data.role
    if (role === "admin") {
       next() 
    }else{
        res.status(401).json({message:"Only Admins are allowed to perform this action"})
    }
}


// User AUTH 
const validateUser = (req,res,next)=>{
    const role = req.data.role
    if (role === "user") {
       next() 
    }else{
        res.status(401).json({message:"Only Customers are allowed to perform this action"})
    }
}


module.exports = {createToken, validateToken, validateUser, validateAdmin}