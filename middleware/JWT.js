const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// SIGN A USER WITH TOKEN and secret
const createToken = (user)=>{
const accessToken = jwt.sign({_id:user._id}, process.env.secret)
return accessToken
}



// ADMIN AUTH 
const validateAdmin = (req,res,next)=>{
    const role = req.user.role
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



module.exports = {createToken}