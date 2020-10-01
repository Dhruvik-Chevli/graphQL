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
      (err) => console.log(err || `Connected to MongoDB`);
    }
  );
};

module.exports = exp;
