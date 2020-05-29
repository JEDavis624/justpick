const { User }  = require('../models/User');

module.exports = function (passport) {
  //User.findById("5a94667fcc107509a43f9982").then(user => console.log(user));

  const LocalStrategy = require('passport-local').Strategy;

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    function(req, email, password, done) {

      User.findOne({ email }).then((doc) => {
        //if (err) { throw err }
        if (doc) { return done(null, false, {"message": "duplicate email"}) } 

        const { firstName, lastName, isPro } = req.body;
        const user = new User({ email, firstName, lastName, password, isPro });

        user.save().then((doc) => {
          return done(null, doc.parse());
        }, (e) => {
          //console.log(e.toJSON());
          if (e.name === 'ValidationError') {
            return done(null, false, {"message": e.message})
          } else {
            return done(e);
          }
        })
      }).catch((e) => done(e))
    }
  ))

  
  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findByCredentials(email, password)
        .then(user => {
          //console.log(user);
          return done(null, user);
        })
        .catch(e => (done(null, false, e)))
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.userId);
  });

  passport.deserializeUser(function(userId, done) {
    //console.log("deser deser deser");
    User.findById(userId).populate('profile').then(user => {
      if (user) {
        //console.log(user.parse());
        done(null, user.parse());
      } else {
        Promise.reject("user not found")
      }
    }).catch(e => done(e));
  });
};