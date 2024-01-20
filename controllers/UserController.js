const {Customer} = require("../models")


module.exports = {
    register: async(req,res)=>{
    const {username,email,password,phoneNumber, address} = req.body
    Customer.create({
    username:username,
    phoneNumber: phoneNumber,
    email:email,
    address:address,
    password:password
})
    },

    
    login: async(req,res)=>{
        res.send("Login Successful")
    }

}
