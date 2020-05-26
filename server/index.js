const express = require('express');
const app = express();

const { JSONparse, logger } = require('./middlewares');

// configuring environment variables
require('dotenv').config();

// setting up mongodb with mongoose & require the models...
require('./database');
require('./models/workout');

// middlewares
app.use(logger);
app.use(JSONparse);
app.use(express.urlencoded({ extended: true }));

// mount the router on the app
const workoutsRoute = require('./routes/workouts');
app.use('/workouts', workoutsRoute); 

const PORT = 8080;
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));