const express = require('express');
const app = express();

// configuring environment variables
require('dotenv').config();

// setting up mongodb with mongoose & require the models...
require('./database');
require('./models/workout');

const exercises = require('./routes/exercises');
const workouts = require('./routes/workouts');

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  let start = Date.now();
  res.once("finish", () => {
    console.log(`Method: ${req.method}, Path: ${req.path}, Status: ${res.statusCode} Response Time: ${Date.now()-start}`)
  })
  next();
})

// mount the router on the app
app.use('/exercises', exercises);
app.use('/workouts', workouts);

const PORT = 8080;
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));