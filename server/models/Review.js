const mongoose = require('mongoose');

const User = require('./User');

const ReviewSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  score: {
    type: Number
  }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = {
  Review
};