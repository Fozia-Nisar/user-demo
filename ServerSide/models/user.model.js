const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    Add: String,
    DOB:String,
    Mob:Number,
    confirmPassword:String
})
module.exports = mongoose.model("users", userSchema)





