const mongoose = require("mongoose");

const Player = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    friends: [],
    gamesPurchased: []
});

module.exports = mongoose.model("Player", Player);