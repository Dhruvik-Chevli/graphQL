const User = require("./models/User_model.js");
const mongoose = require("mongoose");
const Player = require("./models/Player_model.js");
const Game = require("./models/Game_model");
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
            username = username.toLowerCase().trim();
            var result = await Player.findOne({username: username});
            // console.log(result.id)
            if(result!=null)
            {
                throw new Error(`Player with this username ${username} already exists. Please choose a different username.`);
            }
            const player = new Player({username});
            await player.save();
            return player;
        },
        addGame: async(_,{name, tags})=> {
            name = name.toLowerCase().trim();
            var result = await Game.findOne({name: name});
            if(result!=null)
            {
                throw new Error(`Please change the name of the game, as ${name} game already exists in the database`);
            }
            // console.log(tags);
            const game = new Game ({name:name, tags: tags});
            await game.save();
            return game;
        },
        addTag: async(_,{name, tags}) => {
            name = name.toLowerCase().trim();
            var result = await Game.findOne({name: name});
            console.log(result);
            if(result==null)
            {
                throw new Error(`The game you're looking for does not exist.`);
            }
            let existingTags = result.tags;
            console.log(existingTags)
            console.log(tags)
            for(tag in tags) {
                let k=existingTags.indexOf(tags[tag]);
                console.log(k);
                console.log(tags[tag]);
                if(k==-1)
                {
                    await Game.updateOne(
                        {name: name},{$push: {tags: tags[tag]}}
                    );
                }
            }
            return result;
        }
    }
};
module.exports = resolvers