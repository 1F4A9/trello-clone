const express = require('express');
const app = express();

// configuring environment variables
require('dotenv').config();

// setting up mongodb with mongoose & require the models...
require('./database');
require('./models/workout');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  let start = Date.now();
  res.once("finish", () => {
    console.log(`Method: ${req.method}, Path: ${req.path}, Status: ${res.statusCode} Response Time: ${Date.now()-start}`)
  })
  next();
});

// mount the router on the app
const exercisesRoute = require('./routes/exercises');
const workoutsRoute = require('./routes/workouts');
app.use(require('./routes/shared'));
app.use('/workouts', workoutsRoute); 
app.use('/workouts/exercises', exercisesRoute);

const PORT = 8080;
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));