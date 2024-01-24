const { Customer } = require("../models")
const bcrypt = require("bcrypt")
const saltRounds = 10
const {createToken, validateToken} = require('../middleware/JWT')
const moment = require('moment')

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
            res.json({error:err.errors[0].message})
        })
    },


    // LOGIN USER 
    login: async (req, res) => {
        const { email, password } = req.body
        Customer.findOne({ where: { email: email } }).then(user => {
            if (user) {
                bcrypt.compare(password, user.password).then(match => {
                    if (match) {
                        const accessToken = createToken(user)
                        res.cookie("token", accessToken, {httpOnly:true})
                        res.status(200).json({status:"Login successful"})
                    }else{
                        res.status(400).json({status:"Incorrect password"})
                    }                
                }).catch(err => {
                    res.send(err)
                })

            } else {
                res.status(404).json({error:"User with email doesn't exist"})
            }
        }).catch(err => {
            res.status(404).json({ error: err })
        })
    },




    // GET ALL USERS 
    getUsers: (req, res) => {
        Customer.findByPk(req.data.c_id,
            {attributes: {exclude:['password']}}
        )
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.send(err)
            })
    },






    test: (req, res) => {
        const date = `EXPIRES ` + moment('20240125', 'YYYYMMDD').fromNow()
        res.send(date)
    }

}
