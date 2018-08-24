let mongoose = require("mongoose")
let orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product:{ type: mongoose.Schema.Types.ObjectId, ref:"Product",required:true},
    quantitiy: {type: Number, defualt: 1}
})

module.exports = mongoose.model("Order",orderSchema)