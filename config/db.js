const mongoose = require("mongoose");
let exp = {};

exp.connectMongo = () => {
  var mongouri = process.env.mongouri;
  mongoose.connect(
    mongouri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    },
    (err) => {
      if (err) console.log(err);
      else console.log("Connected to MongoDB");
    }
  );
};

module.exports = exp;
