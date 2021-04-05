const mongoose = require('mongoose');
const db = require('../database');

const { Schema } = mongoose;

// Mongoose schema
const DogSchema = new Schema({
  id: {
    type: String,
    requierd: true,
  },
  name: {
    type: String,
    requierd: true,
  },
  img: {
    type: String,
    requierd: true,
  },
  bio: {
    type: String,
    requierd: true,
  },
  age: {
    type: Number,
    requierd: true,
  },
  breed: {
    type: String,
    requierd: true,
  },
  gender: {
    type: String,
    requierd: true,
  },
  price: {
    type: Number,
    requierd: true,
  },
  description: {
    type: String,
    requierd: true,
  },
  liked: {
    type: Boolean,
    required: [true, 'Liked is required'],
  },
  visited: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('dogs', DogSchema);
