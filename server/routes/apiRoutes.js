const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment');

const { User } = require('../models/User');
const { Profile } = require('../models/Profile');
const { Appointment: Appt } = require('../models/Appointment');
const { Schedule } = require('../models/Schedule');
const { Review } = require('../models/Review');


const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/api/notAuth');
  }
};

router.get('/pros', (req, res) => {
  User.find({ isPro: true }).where('profile').exists().populate('profile').then((pros) => {
    const availPros = pros.filter(pro => {
      if (pro.profile.daysAvail !== undefined){
        return pro;
      }
    })
    console.log(availPros);
    res.status(200).send(availPros);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

router.get('/user/:id', (req, res) => {
  const id = req.params.id;

  User.findById(id).populate('profile').then((user) => {
    res.send(user.parse());
  }).catch((e) => {
    res.status(400).send(e);
  })
});

router.post('/profile', ensureAuth, (req, res) => {
  if (req.user.profile) {
    const { bio, photo, zipCode, rate, skillLevel, instruction } = req.body;
    const profileId = req.user.profile.profileId;
    Profile.findByIdAndUpdate(profileId, { bio, photo, zipCode, rate, skillLevel, instruction }, { new: true, runValidators: true })
      .then((profile) => {
        const { bio, photo, zipCode, skillLevel, instruction } = profile;
        req.user.profile = {profileId: req.user.profile.profileId, bio, photo, zipCode, rate, skillLevel, instruction }
        res.status(200).send(req.user);
      }).catch((e) => {
        console.log(e);
        res.status(400).send(e);
      });
  } else {
    const { bio, photo, zipCode, rate, skillLevel, instruction } = req.body;
    const profile = new Profile({ user: req.user.userId, bio, photo, zipCode, rate, skillLevel, instruction });
    profile.save().then((profile) => {
      const { bio, photo, zipCode, skillLevel, insturction, rate, _id: profileId } = profile;
      
      req.user.profile = { profileId, bio, photo, zipCode, skillLevel, rate, instruction };
      return User.findById(req.user.userId)
    }).then((user) => {
      return user.setProfileId(req.user.profile.profileId)
    }).then(() => {
      res.status(200).send(req.user);
    }).catch((e) => {
      console.log(e);
      res.status(400).send(e);
    });
  }  
});

router.post('/signup', passport.authenticate('local-signup',
  {
    successRedirect: '/api/signup/success',
    failureRedirect: '/api/signup/failure',
    failureFlash: true
  }
))

router.get('/signup/:state', (req, res) => {
  if (req.params.state === 'success') {
    res.status(200).send({signup: "success", user: req.user});
  } else {
    res.status(400).send({signup: "failure", "message": req.flash('error')})
  }
});

router.post('/login', 
  passport.authenticate('local-signin'),
  (req, res) => {
    res.send(req.user);
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).send();
});

router.get('/notAuth', (req, res) => {
  res.status(401).send({
    "err": "YOU SHALL NOT PASS!!!",
    "user": req.user || "no user",
    "message": req.flash('error')
  });
});

router.get('/isAuth', ensureAuth, (req, res) => {
  res.send({
    "msg": "WELCOME WELCOME WELCOME!!!",
    "user": req.user
  });
});

router.post('/appt', ensureAuth, (req, res) => {
  const { instructor, time } = req.body;
  const student = req.user.userId;
  const instructorObj = mongoose.Types.ObjectId(instructor);

  Appt.apptOpen(student, instructorObj, time).then((open) => {
    if (open) {
      const appt = new Appt({student: student, instructor: instructorObj, startTime: time});
      appt.save().then((savedAppt) => {
        res.send(savedAppt);
      }).catch((e) => {
        res.status(400).send(e);
      });
    }
  }).catch((e) => {
    res.send(e);
  })
});

router.get('/pros/:id/appointments/:startDay?/:endDay?', (req, res) => {
  const startDay = req.params.startDay;
  const endDay = req.params.endDay;
  const userId = req.params.id;
  //console.log(userId, startDay, endDay)
  Appt.find({ instructor: userId }).sort({ 'startTime': 1 }).then((appts) => {
    if (appts.length > 0) {
      res.send(appts);
    }
    else {
      Appt.find({ student: userId }).sort({ 'startTime': 1 }).then((appts) => {
        res.send(appts);
      });
    }
  });
})

router.get('/availability', ensureAuth, (req, res) => {
  if (!req.user.isPro) {
    res.status(400).send({"err": "Not an instructor"});
  } else {
    Schedule.findOne({user: req.user.userId}).then((sched) => {
      if (sched) {
        res.send(sched);
      } else {
        res.send("no schedule");
      }
    }).catch((e) => {
      res.status(400).send(e);
    })
  }
});

router.post('/availability', ensureAuth, (req, res) => {
  const userId = req.user.userId;
  const sched = req.body;
  sched.user = userId;
  delete sched.updated;
  console.log(sched);

  if (!req.user.isPro) {
    res.status(400).send({"err": "Not an instructor"});
  } else {
    Schedule.findOneAndUpdate({user: userId}, {...sched}, {runValidators: true, new: true, upsert: true}).then((update) => {
      console.log("updated");
      const daysAvail = {};
      for (const day in sched) {
        if (sched[day].length === 0) {
          daysAvail[day] = false;
        } else {
          daysAvail[day] = true;
        }
      }
      return Profile.findOneAndUpdate({user: userId}, {daysAvail}, {runValidators: true, new: true});
    }).then((newProfile) => {
      console.log(newProfile);
      res.send(newProfile);
 
    }).catch((e) => {
      res.status(400).send(e);
    })
  }
});

const parseSched = (data) => {
  const { appts, weekday } = data;
  let { avail } = data;
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];


  const startTime = weekday.startOf('isoWeek').valueOf();
  const endTime = weekday.endOf('isoWeek').valueOf();

  const currentAppts = appts.filter((appt) => appt.startTime >= startTime && appt.startTime <= endTime);
  const parsedAppts = currentAppts.map((appt) => {
    console.log(moment(appt.startTime).format("dddd, MMMM Do YYYY, h:mm:ss a"))
    const day = moment(appt.startTime).format('ddd').toLowerCase();
    const hour = parseInt(moment(appt.startTime).format('H'), 10);
    return { day, hour }
  });
  parsedAppts.forEach((appt) => {
    const index = avail[appt.day].indexOf(appt.hour);
    if (index !== -1) {
      avail[appt.day].splice(index, 1);
    }
  });
  const { mon, tue, wed, thu, fri, sat, sun } = avail;
  const parsedAvail = { mon, tue, wed, thu, fri, sat, sun }

  Object.keys(parsedAvail).forEach((day) => {
      
    let parsedDay = {}
    hours.forEach((hour) => {
      if (parsedAvail[day].includes(hour)){
        parsedDay[hour] = {
          //hour,
          bsStyle: "success",
          disabled: false
        }
      } else {
          parsedDay[hour] = {
            // hour,
            bsStyle: "default",
            disabled: true
          }
      }
      });
    parsedAvail[day] = parsedDay;
    })
  
    return parsedAvail
  //return { mon, tue, wed, thu, fri, sat, sun }
};

router.get('/schedule/:instructorId/:weekday?', ensureAuth, (req, res) => {
  const instructorId = req.params.instructorId;
  let avail = {};
  let weekday = null;

  if (req.params.weekday) { 
    weekday = moment(req.params.weekday, "YYYY-MM-DD"); 
  } else {
    weekday = moment().startOf('day');
  }

  Schedule.findOne({ user: instructorId }).then((doc) => {
    avail = doc;
    console.log(avail)
    if (avail === null) {
      return Promise.reject({"message": "availability not found"});
    } else {
      return Appt.find().or([{ student: req.user.userId }, { instructor: instructorId }]);
    }
  }).then((appts) => {
    console.log(avail)
    const data = {
      avail,
      appts,
      weekday
    }

    const parsedAvail = parseSched(data);
    console.log(parsedAvail);

    res.send(parsedAvail);
  }).catch((e) => {
    res.status(400).send(e.message);
  });
});

router.post('/review/auth', (req, res) => {
  const { instructorId } = req.body;
  const dateLimit = moment().startOf('day').valueOf();
  let studentId = null;
  if (req.user) {
    studentId = req.user.userId;
  } else {
    return res.send({ auth: false, reason: "no login" });
  }

  Appt.find({ student: studentId, instructor: instructorId }).where('startTime').lte(dateLimit).then((appts) => {
    if (appts.length === 0) {
      return Promise.reject("no appts");
    } else {
      return Review.find({ student: studentId, instructor: instructorId });
    }
  }).then((review) => {
    if (review.length > 0) {
      return Promise.reject("prev review");
    } else {
      res.send({ auth: true });
    }
  }).catch((e) => {
    res.send({
      auth: false,
      reason: e
    });
  });

});

router.post('/review', (req, res) => {
  const { instructorId, score } = req.body;
  const studentId = req.user.userId;

  const review = new Review({
    student: studentId,
    instructor: instructorId,
    score
  });

  review.save().then((doc) => {
    return Review.find({ instructor: instructorId });
  }).then((reviews) => {
    const reviewCount = reviews.length;

    const totalScore = reviews.reduce((acc, review) => {
      return acc += review.score;
    }, 0)

    const aveScore = totalScore / reviewCount;

    return Profile.findOneAndUpdate({ user: instructorId }, { aveScore, reviewCount }, { new: true });
  }).then((profile) => {
    const { aveScore, reviewCount } = profile;
    res.send({ aveScore, reviewCount });
  }).catch((e) => {
    res.status(400).send(e);
  });
});


module.exports = router;