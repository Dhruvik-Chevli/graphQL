const User = require("./models/User_model.js");
const mongoose = require("mongoose");
const Player = require("./models/Player_model.js");
const Game = require("./models/Game_model");
const resolvers = {
    Query: {
        getPlayers: async() => {
            let result = await Player.find();
            return result;
        },
        getPlayer: async(_,{name}) => {
            name=name.toLowerCase()
            let result=await Player.findOne({username: {$regex: name}});
            return result;
        },
        getGames: async() => {
            let result = await Game.find();
            return result;
        },
        getGame: async(_,{name}) => {
            name=name.toLowerCase()
            let result=await Game.findOne({name: {$regex: name}});
            return result;
        },
    },
    Mutation: {
        addPlayer: async(_,{username})=> {
            username = username.toLowerCase().trim();
            let result = await Player.findOne({username: username});
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
            let result = await Game.findOne({name: name});
            if(result!=null)
            {
                throw new Error(`Please change the name of the game, as ${name} game already exists in the database`);
            }
            const game = new Game ({name:name, tags: tags});
            await game.save();
            return game;
        },
        addTag: async(_,{name, tags}) => {
            name = name.toLowerCase().trim();
            let result = await Game.findOne({name: name});
            if(result==null)
            {
                throw new Error(`The game you're looking for does not exist.`);
            }
            let existingTags = result.tags;
            for(tag in tags) {
                let k=existingTags.indexOf(tags[tag]);
                if(k==-1)
                {
                    await Game.updateOne(
                        {name: name},{$push: {tags: tags[tag]}}
                    );
                }
            }
            return result;
        },
        addGamePrequels: async(_,{game,games}) => {
            if(game==null && games==null) {
                throw new Error(`Please make sure you've entered both the fields.`);
            }
            game = game.trim().toLowerCase();
            let result = await Game.findOne({name: game});
            if(result==null) {
                throw new Error(`There is no game ${game} to add.`);
            }
            let existingPreq = result.prequels;
            let count=0;
            for(g in games)
            {
                let result1 = await Game.findOne({name: games[g]});
                if(result1!=null) {
                    let k=existingPreq.findIndex(x => x.name==result1.name);
                    if(k==-1)
                        await Game.updateOne(
                            {name: game},{$push: {prequels: result1}}
                        );
                }
                else {
                    count+=1;
                }
            }
            if(count>0)
                return `All games were added except ${count} games, which were not available on our platform.`
            else
                return `All the games were added as a prequel.`;
        },

        purchaseGame: async(_,{username, game}) => {
            username = username.toLowerCase().trim();
            let resultu = await Player.findOne({username: username});
            let resultg = await Game.findOne({name: game});
            if(resultu==null) {
                throw new Error(`The player does not exist in our database.`);
            }
            if(resultg==null) {
                throw new Error(`The game is not available on our platform.`);
            }
            let boughtGames = resultu.gamesPurchased;
            console.log(boughtGames);
            let k=boughtGames.findIndex(x => x.name == resultg.name);
            // if(k==-1)
            // {
            //     await Player.updateOne({username: username},{$push: {gamesPurchased: resultg}});
            //     return "The game has been successfully bought, enjoy playing";
            // }
            return "The user already owns the game."
        },

        addFriend: async(_,{f1,f2}) => {
            f1=f1.toLowerCase().trim();
            f2=f2.toLowerCase().trim();
            let rf1 = await Player.findOne({username: f1});
            let rf2 = await Player.findOne({username: f2});
            if(rf1==null || rf2==null) {
                throw new Error(`One or both of the users you want to make friends do not exist.`);
            }
            console.log(rf1);
            console.log(rf2);
            let f1f = rf1.friends;
            let k=f1f.findIndex(x => x.username == f2);
            if(k==-1)
            {
                await Player.updateOne({username: f1},{$push: {friends: rf2}});
                return `Congratulations! You are now friends with ${f2}`
            }
            else
            {
                return "The two are already friends.";
            }
        }
    },
};
module.exports = resolvers