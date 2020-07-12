const { GraphQLServer } = require('graphql-yoga')
const db = require("./config/db")
const path=require("path")
const User = require("./models/User_model.js");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const Player = require("./models/Player_model.js");
const resolvers = require("./resolvers.js");
const typeDefs = require("./typeDefs.js");



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
