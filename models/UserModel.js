const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
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
        required: true,
    }, 
    password : {
        type: String,
        required: true
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