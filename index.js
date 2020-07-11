const { GraphQLServer } = require('graphql-yoga')
const db = require("./config/db")
const path=require("path")
const User = require("./models/User_model.js");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const Player = require("./models/Player_model.js");
const resolvers = require("./resolvers.js")


const typeDefs = `type Query {
        getUser(id: ID!): User
        getUsers: [User]
        getPlayers: [Player]
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
        addPlayer(username: String!): Player
    }`;


// const resolvers = {
//     Query: {
//       getUsers: ()=> User.find(),
//       getUser: async (_,{id}) => {
//         var result = await User.findById(id);
//         return result;
//     }
// },
//     Mutation: {
//         addUser: async (_, { fullname, username, phone_number, city }) => {
//             const user = new User({fullname, username, phone_number, city});
//             await user.save();
//             return user;
//         },
//         deleteUser: async (_, {id}) => {
//             await User.findByIdAndRemove(id);
//             return "User deleted";
//         },
//         addPlayer: async(_,{username})=> {
//             username = username.toLowerCase()
//             var result = await Player.findOne({username: username});
//             // console.log(result.id)
//             if(result!=null)
//             {
//                 throw new Error("Player with this username already exists. Please choose a different username.");
//             }
//             const player=new Player({username});
//             await player.save();
//             return player;
//         },
//     }
// };

db.connectMongo();
const options = {
    port: 8000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground',
  }
  const server = new GraphQLServer({ typeDefs, resolvers })
  server.start(options, ({ port }) =>
    console.log(
      `Server started, listening on port ${port} for incoming requests.`,
    ),
  )
