const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false 
});

const db = mongoose.connection;

db.on('error', (err) => console.log('Error occurred from the database', err));
db.once('open', () => console.log('successfully opened the database...'));

module.exports = mongoose;