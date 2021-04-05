const mongoose = require('mongoose');
const db = require('../database');

const { Schema } = mongoose;

// Mongoose schema
const DogSchema = new Schema({
  _id: {
    type: mongoose.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
