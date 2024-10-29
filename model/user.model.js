const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  address: String,
  avatar: String,
  status: String
});

const User = mongoose.model('User', userSchema,"user");
module.exports = User;