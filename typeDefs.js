const User = require("./models/User_model.js");
const Player = require("./models/Player_model.js");
const Game = require("./models/Game_model.js");
const typeDefs = `type Query {
    getPlayers: [Player]
    getPlayer(name: String!): [Player]
    getGames: [Game]
    getGame(name: String!): [Game]
}
type Game {
    name: String!
    prequels: [Game]!
    tags: [String]!
}
type Player {
    username: String!
    friends: [Player]!
    gamesPurchased: [Game]!
}
type Mutation {
    addPlayer(username: String!): Player,
    addGame(name: String!, tags: [String]!): Game
    addTag(name: String!, tags: [String]!): Game
    addGamePrequels(games: [String]!, game: String): String
    purchaseGame(username: String!, game: String!): String
    addFriend(f1: String!,f2: String!): String
}`;
module.exports = typeDefs