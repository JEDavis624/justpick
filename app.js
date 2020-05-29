const express = require("express");
const pathh = require("path");
const bodyParser = require("body-parser");
const passport = require('passport');
const mongoose = require('mongoose');

const apiRoutes = require('./server/routes/apiRoutes');


const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://user:Password1@ds263917.mlab.com:63917/");
mongoose.connect(MONGO_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('cookie-parser')());
app.use(require('connect-flash')());
app.use(require('express-session')({
  secret: 'keyboard cats',
  resave: false,
  saveUninitialized: false
}));

require('./server/config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("client/build"));
app.use('/api', apiRoutes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(pathh.join(__dirname, "./client/build/index.html"));
});



module.exports = {app};
