const mongoose = require("mongoose");
const User= mongoose.model("User",{
    fullname: String,
    username: String,
    phone_number: String,
    city: String
});

module.exports = User;