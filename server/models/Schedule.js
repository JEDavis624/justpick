const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');

const User = require('./User');

const ScheduleSchema = new mongoose.Schema({
  mon: {
    type: []
  },
  tue: {
    type: []
  },
  wed: {
    type: []
  },
  thu: {
    type: []
  },
  fri: {
    type: []
  },
  sat: {
    type: []
  },
  sun: {
    type: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = {
  Schedule
};