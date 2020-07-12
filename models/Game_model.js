const mongoose = require("mongoose");

const Game = new mongoose.Schema({
    name: String,
    prequels:[],
    tags: [String] 
})

module.exports = new mongoose.model("Game", Game);