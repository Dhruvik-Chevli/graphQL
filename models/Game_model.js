const mongoose = require("mongoose");

const Game = new mongoose.Schema({
    name: String,
    prequels:[],
    tags: {
        type: [String],
        unique: true
    }
})

module.exports = new mongoose.model("Game", Game);