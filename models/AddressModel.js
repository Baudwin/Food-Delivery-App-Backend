const mongoose = require('mongoose')

const Schema = mongoose.Schema

const addressSchema = new Schema({
    state : {
        type: String,
        required : true
    }, 

    city : {
        type: String,
        required : true
    }, 
    street : {
        type: String,
        required : true
    },
    building : {
        type: String,
        required : true
    }, 
    additonalInfo : {
        type:String, 
        required:false
    }
})

module.exports =  mongoose.model("Address", addressSchema)