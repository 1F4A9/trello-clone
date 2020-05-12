const express = require('express');
const app = express();

// configuring environment variables
require('dotenv').config();

// setting up mongodb with mongoose...
require('./database');
require('./models/workout');

app.use(express.json())

app.get('/home', (req, res) => {
  res.json({ message: 'OK' });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));