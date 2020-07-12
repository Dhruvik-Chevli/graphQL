const User = require("./models/User_model.js");
const Player = require("./models/Player_model.js");
const Game = require("./models/Game_model.js");
const typeDefs = `type Query {
    getUser(id: ID!): User
    getUsers: [User]
    getPlayers: [Player]
}
type Game {
    id: ID!
    name: String!
    prequels: [Game]!
    tags: [String]!
}
type Player {
    id: ID!
    username: String!
    friends: [Player]!
    gamesPurchased: [String]!
}

type User {
    id: ID!
    fullname: String!
    username: String!
    phone_number: String!
    city: String!
}
type Mutation {
    addUser(fullname: String!, username: String!, phone_number: String!, city: String!): User!,
    deleteUser(id: ID!): String,
    addPlayer(username: String!): Player,
    addGame(name: String!, tags: [String]!): Game
    addTag(name: String!, tags: [String]!): Game
}`;

module.exports = typeDefs