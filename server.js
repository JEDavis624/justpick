const { app } = require('./app.js');

app.use(require('morgan')('combined'));

const PORT = process.env.PORT || 3001;

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://user:Password1@ds263917.mlab.com:63917/");

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

module.exports = { app }