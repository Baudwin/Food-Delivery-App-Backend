const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// SIGN A USER WITH TOKEN and secret
const createToken = (user)=>{
const accessToken = jwt.sign({_id:user._id, role:user.role}, process.env.secret)
return accessToken
}



// VERIFY THE TOKEN (MIDDLEWARE)
const validateToken = (req,res,next)=>{
const {authorization} = req.headers
    try {  
    if (!authorization) {
        throw Error("You are not authorized to perform this action. Login to continue") 
    }
    const token = authorization.split(' ')[1]   
    const data = jwt.verify(token, process.env.secret)
    req.data = data 
    next()       
    } 
    catch (error) {
        res.status(400).json(error.message)
    }

}

// ADMIN AUTH 
const validateAdmin = (req,res,next)=>{
    const role = req.data.role
    try {
    if (role != "admin") {
        throw Error("Only Admins are allowed to perform this action")
    }
    next() 
    } 
    catch (error) {
       res.status(400).json(error.message) 
    }
   
}


// User AUTH 
const validateUser = (req,res,next)=>{
    const role = req.data.role
    try {
        if (role != "user") {
            throw Error("Only Users are allowed to perform this action")
        }
        next() 
        } 
        catch (error) {
           res.status(400).json(error.message) 
        }
}


module.exports = {createToken, validateToken, validateUser, validateAdmin}