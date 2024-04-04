const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    itemName : {
        type : String, 
        required: true
    }, 
    price :{
        type: Number,
        required: true
    },
    img: {
        url : String, 
        name:String,
    }, 
    category : {
        type : mongoose.Schema.Types.ObjectId, ref:"Category",
        required: true
    }
})

module.exports = mongoose.model("Item", itemSchema)