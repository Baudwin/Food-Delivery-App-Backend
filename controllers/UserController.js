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
        // if (user.phoneNumber === phoneNumber) {
        //     throw Error(`User with phone number "${phoneNumber}" already exists`)
        // }

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
                phoneNumber: newUser.phoneNumber,
                email: newUser.email,
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
        if (!email || !password) {
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
            phoneNumber: user.phoneNumber,
            email: user.email,
            token : accessToken
        }
        res.status(200).json({ msg: "Login successful", userInfo})
        }
         catch (error) {
            res.status(400).json(error.message)
        }
    },

    addAddress : async(req,res)=>{
        const {state, city, street, building, additionalInfo} = req.body
        try {
           if (!state.trim() || !city.trim() || !street.trim() || !building.trim() || !additionalInfo.trim() ) {
            throw Error("All fields are required")
             }
           const newAddress = await Address.create({
                state, city, street, building, additionalInfo
            })
            res.status(200).json({msg:"Address added successfully"})
        } catch (error) {
            res.status(400).json(error)
        }
        
    }, 

    placeOrder : async(req,res)=>{
        const {items, totalAmount, _id} = req.body
        try {
        const newOrder = await Order.create({
        userId : _id, 
        items, 
        totalAmount
       }) 
       console.log(newOrder);
        } catch (error) {
           console.log(error); 
        }
    
    }





}