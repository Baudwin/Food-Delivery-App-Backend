const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderItemsSchema = new Schema({
    itemId : {
        type: mongoose.Schema.Types.ObjectId, ref:"Item"
    }
})

module.exports = mongoose.model("OrderItems", orderItemsSchema)