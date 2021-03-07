const mongoose = require('mongoose');

const { Schema } = mongoose;

// Mongoose schema
const usersSchema = new Schema({
  userName: String,
  userId: String,
  likes: Number,
  dislikes: Number,
});

module.exports = mongoose.model('users', usersSchema);
