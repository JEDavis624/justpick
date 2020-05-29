const mongoose = require('mongoose');
const validator = require('validator');

const Profile = require('./Profile');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    minlength: 1
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1
  },
  isPro: {
    type: Boolean,
    required: true
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
});

UserSchema.statics.findByCredentials = function (email, password) {
  const User = this;

  return User.findOne({ email }).populate('profile').then((user) => {
    if (!user) {
      return Promise.reject({err: "user not found"});
    }

    return new Promise((resolve, reject) => {
      if (password === user.password) {
        resolve(user.parse());
      } else {
        reject({err: "bad password"});
      }
    }); 
  });  
};

UserSchema.methods.parse = function () {
  const user = this;

  const { _id:userId, email, firstName, lastName, isPro, profile=null } = user;
  const parsed = { userId, email, firstName, lastName, isPro, profile }

  if (profile) {
    const { _id:profileId, skillLevel, instruction, zipCode, bio, photo, rate, aveScore, reviewCount } = profile;
    parsed.profile = { profileId, skillLevel, instruction, zipCode, bio, photo, rate, aveScore, reviewCount };
  }
  
  return(parsed);
};

UserSchema.methods.setProfileId = function (profileId) {
  const user = this;

  return user.update({ profile: profileId });
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};