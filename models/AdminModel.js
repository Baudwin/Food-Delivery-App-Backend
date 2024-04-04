const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    username : {
        type : String,
        required: true
    }, 
    email : {
        type: String,
        required: true
    }, 
    phoneNumber : {
        type: Number,
        required: true
    }, 
    password : {
        type: String,
        required: true
    },
    role : {
        type:String,
        default: "admin"

    } 
    
})

module.exports = mongoose.model("Admin", adminSchema)