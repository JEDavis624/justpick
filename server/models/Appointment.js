const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');

const User = require('./User');

const AppointmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTime: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Number,
    default: moment(),
    required: true
  }
});

AppointmentSchema.statics.apptOpen = function (student, instructor, time) {
  const Appt = this;
  console.log(student, instructor, time);
  return Appt.findOne({ instructor: instructor, startTime: time }).then((doc) => {
    console.log(doc);
    if (doc !== null) {
      console.log(doc);
      return Promise.reject({ "err": "instructor booked" });
    }
    return Appt.findOne({ student: student, startTime: time }).then((doc) => {
      if (doc !== null) {
        console.log(doc)
        return Promise.reject({ "err": "student booked" });
      }
      return Promise.resolve({ "open": true });
    });
  });
};



const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = {
  Appointment
};