let mongoose = require("mongoose")
let orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderId: String,
    quantitiy: Number
})

module.exports = mongoose.model("Order",orderSchema)