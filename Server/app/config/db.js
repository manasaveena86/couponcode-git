const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb+srv://manasa:manasa@cluster0.7zaw1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("connected"))
  .catch(err => console.log("not connected",err));
module.exports = { mongoose };
//mongodb+srv://manasa:manasa@cluster0.7zaw1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority