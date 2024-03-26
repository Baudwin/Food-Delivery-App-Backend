// const { Customer, Cart, Item, CartItem } = require("../models")
const bcrypt = require("bcrypt")
const saltRounds = 10
const { createToken } = require('../middleware/JWT')

module.exports = {
    // REGISTER USER
    register: async (req, res) => {
        const { username, email, password, phoneNumber, address } = req.body
        const hash = await bcrypt.hash(password, saltRounds)
        Customer.create({
            username: username,
            phoneNumber: phoneNumber,
            email: email,
            address: address,
            password: hash
        }).then(data => {
            res.json("User Registered")
        }).catch(err => {
            res.json({ error: err.errors[0].message })
        })
    },
 
    authUser : (req,res)=>{
        const info = req.data
        res.json({info:info})
    },

    // LOGIN USER 
    login: async (req, res) => {
        const { email, password } = req.body
        // check if user with info provided exists 
        Customer.findOne({ where: { email: email } }).then(user => {
            if (user) {
            //    if the user exists compare the provided password with the hashed password in the database 
                bcrypt.compare(password, user.password).then(match => {
                    if (match) {
                        // if there is a match asign  token to that user 
                        const accessToken = createToken(user)
                        res.cookie("token", accessToken, { httpOnly: true}) //, maxAge:'240000'
                        res.status(200).json({ msg: "Login successful", token: accessToken, auth: true, info: user})
                    } else {
                        res.status(400).json({ msg: "Incorrect password" })
                    }
                }).catch(err => {
                    res.send(err)
                })

            } else {
                res.status(404).json({ msg: "User with email doesn't exist" })
            }
        }).catch(err => {
            res.status(404).json({ msg: err })
        })
    },


}