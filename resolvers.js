const User = require("./models/User_model.js");
const mongoose = require("mongoose");
const Player = require("./models/Player_model.js");

const resolvers = {
    Query: {
      getUsers: ()=> User.find(),
      getUser: async (_,{id}) => {
        var result = await User.findById(id);
        return result;
    }
},
    Mutation: {
        addUser: async (_, { fullname, username, phone_number, city }) => {
            const user = new User({fullname, username, phone_number, city});
            await user.save();
            return user;
        },
        deleteUser: async (_, {id}) => {
            await User.findByIdAndRemove(id);
            return "User deleted";
        },
        addPlayer: async(_,{username})=> {
            username = username.toLowerCase()
            var result = await Player.findOne({username: username});
            // console.log(result.id)
            if(result!=null)
            {
                throw new Error(`Player with this username ${username} already exists. Please choose a different username.`);
            }
            const player=new Player({username});
            await player.save();
            return player;
        },
    }
};
module.exports = resolvers