const bcrypt = require("bcrypt")
const saltRounds = 10
const { createToken } = require('../middleware/JWT')
const User = require("../models/UserModel")
const Order = require("../models/OrderModel")
const Address = require("../models/AddressModel")
const validator = require('validator')


module.exports = {
    // REGISTER USER
    signup: async (req, res) => {
        const { username, email, password, phoneNumber} = req.body
        try {

        if (!username.trim() || !email.trim() || !password.trim() || !phoneNumber.trim() ) {
            throw Error("All fields must be provided!")
        }

        if (!validator.isEmail(email)) {
            throw Error(`${email} is not a valid email`)
        }

        if (!validator.isMobilePhone(phoneNumber)) {
            throw Error(`${phoneNumber} is not a valid phone number`)
        }

        if (!validator.isStrongPassword(password)) {
            throw Error(`password must be atleast 8 characters
             , must contain an uppercase letter, a lowercase letter,
              a number and a special character or symbol `)
        }

        const user = await User.findOne({email:email})
        if (user) {
            throw Error(`User with email "${email}" already exists`)
        }

       const hash = await bcrypt.hash(password, saltRounds)
       const newUser = await User.create({
                username: username,
                phoneNumber: phoneNumber,
                email: email,
                password: hash
            })
            const accessToken = createToken(newUser)
            
            const userInfo = {
                _id:newUser._id, 
                username: user.username, 
                phoneNumber: newUser.phoneNumber,
                email: newUser.email,
                createdOn : newUser.createdOn, 
                token : accessToken
            }
            res.status(200).json({msg:"User Registered",userInfo})
       
        }
         catch (error) {
           res.status(400).json(error.message)            
        }
    },



    // LOGIN USER 
    login: async (req, res) => {
        const { email, password } = req.body
        // check if user with info provided exists 
        try {
        if (!email.trim() || !password.trim()) {
            throw Error( "All fields are required")
        }

        const user = await User.findOne({email: email })

        if (!user) {
           throw Error(" email doesn't exist")
        }
        //if the user exists compare the provided password with the hashed password in the database 
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw Error("Incorrect Password")
        }
          // if there is a match asign  token to that user 
         const accessToken = createToken(user)
         const userInfo = {
            _id:user._id,
            username: user.username,  
            phoneNumber: user.phoneNumber,
            email: user.email,
            createdOn : user.createdOn, 
            username : user.username, 
            token : accessToken
        }
        res.status(200).json({ msg: "Login successful", userInfo})
        }
         catch (error) {
            res.status(400).json(error.message)
        }
    },


    oauthSuccess: async(req, res)=>{
        const {_id} = req.user
      
        try {
          const user = await User.findOne({_id}) 
          const userData = { 
            _id:user._id, 
            username : user.username,
            email : user.email,
            createdOn : user.createdOn, 
        }
         res.status(200).json({msg:"Authentication success", userData})
        } catch (error) {
            res.status(401).json({msg:error.message})
        }
    
    }, 
    
    authFailure: async(req, res)=>{
     res.status(401).json({msg:"Authentication failed"})
    }, 



    addAddress : async(req,res)=>{
        const {state, city, street, building, additionalInfo} = req.body
        const userID = req.user._id
       
        try {
           if (!state.trim() || !city.trim() || !street.trim() || !building.trim() ) {
            throw Error("All fields are required")
             }
           const newAddress = await Address.create({
               userID, state, city, street, building, additionalInfo
            })
            res.status(200).json({msg:"Address added successfully"})
        } catch (error) {
            res.status(400).json(error.message)

        }
        
    }, 

    getAddress : async(req,res)=>{
        const userID = req.user._id
        try {
            const addresses = await Address.find({userID})
            .populate({
                path: "userID", 
                model:"User",
                select: "username phoneNumber", 
                as:"user"
            })
            .exec()
            res.status(200).json(addresses)
        } 
        catch (error) {
            res.status(404).json({msg:error.message})
            console.log(error);
        }
        
    }, 


    placeOrder : async(req,res)=>{
        const {items, totalAmount,paymentType, address} = req.body
        const userId = req.user._id
      
        try {
        const newOrder = await Order.create({
        userId, 
        items, 
        totalAmount,
        paymentType,
        address
       }) 

       res.status(200).json({msg:"Order placed successfully"})
        } catch (error) {
        res.status(400).json(error.message)
        }
    
    }, 


    getUserOrders:async(req,res)=>{
        const userId = req.user._id
        
        try {
           const allOrders = await Order.find({userId}) 
           .populate('userId', 'username email phoneNumber')
           .populate('address')
            .exec()
           res.status(200).json(allOrders)
        
        } catch (error) {
            res.status(400).json(error.message)
        }
        
    }



}