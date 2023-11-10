const mongoose = require("mongoose")
const carSchema = mongoose.Schema({
    Make: String,
    Model: String,
    Price: Number
})
module.exports = mongoose.model("Car",
    carSchema)