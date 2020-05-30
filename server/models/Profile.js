const mongoose = require('mongoose');
const validator = require('validator');

const User = require('./User');

const ProfileSchema = mongoose.Schema({
  bio: {
    type: String,
  },
  zipCode: {
    type: String,
    //required: true,
    validate: {
      validator: (v) => ((validator.isNumeric(v) && validator.isLength(v, { min: 5, max: 5 })) || (v === "")),
      message: '{VALUE} is not a valid ZIP Code'
    }
  },
  skillLevel: {
    type: [String],
    //required: true,
    validate: {
      validator: (v) => (v.length !== 0),
      message: '{VALUE} cannot be empty'
    }
  },
  instruction: {
    type: [String],
    //required: true,
    validate: {
      validator: (v) => (v.length !== 0),
      message: '{VALUE} cannot be empty'
    }
  },
  photo: {
    type: String,
    validate: {
      validator: (v) => (validator.isURL(v) || v === ""),
      message: '{VALUE} is not a valid URL'
    }
  },
  rate: {
    type: String,
    validate: {
      validator: (v) => (v.match(/^\d*$/) !== null),
      message: '{VALUE} is not a valid dollar amount'
    }
  },
  daysAvail: {
    type: {}
  },
  aveScore: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = {
  Profile
};