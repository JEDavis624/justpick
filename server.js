const { app } = require('./app.js');

app.use(require('morgan')('combined'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

module.exports = { app }