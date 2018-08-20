let mongoose = require("mongoose")
let prodcutSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
})

module.exports = mongoose.model("Product",prodcutSchema)