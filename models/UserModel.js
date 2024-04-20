const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    googleId : {
        type : String,
        required: false
    }, 
    username : {
        type : String,
        required: true
    }, 
    email : {
        type: String,
        required: true,
        unique: true
    }, 
    phoneNumber : {
        type: Number,
        required: false,
        unique:false
    }, 
    password : {
        type: String,
        required: false
    },
    role : {
        type:String,
        default: "user"

    } , 
    createdOn : {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model("User", userSchema)