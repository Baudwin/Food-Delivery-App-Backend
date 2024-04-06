const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId, ref:"User",
        reqiured: true
    },

    items : {
        type:Array,
        default : [], 
        required : true
    }, 

    totalAmount : {
        type : Number, 
        required: true
    }, 
    address : {
        type: mongoose.Schema.Types.ObjectId, ref:"Address", 
        required : true
    }, 
    status: {
        type: String,
        required:true, 
        enum: ['pending', 'processing', 'delivered'],
        default: "pending"
    }, 
    createdOn : {
        type : Date, 
        default : Date.now
    }
})

module.exports = mongoose.model("Order", orderSchema)