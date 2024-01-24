const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// SIGN A USER WITH TOKEN 
const createToken = (customer)=>{
const accessToken = jwt.sign({c_id:customer.customer_id}, process.env.secret)
return accessToken
}

// VERIFY THE TOKEN (MIDDLEWARE)
const validateToken = (req,res,next)=>{
const token = req.cookies.token
if (!token) {
    res.status(400).json({message:"Please login to continue"})
}else{
    const data = jwt.verify(token, process.env.secret)
    req.data = data
    req.auth = true
    next()
}
}

module.exports = {createToken, validateToken}