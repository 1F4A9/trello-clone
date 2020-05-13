const express = require('express');
const mongoose = require('mongoose');
const app = express();

// configuring environment variables
require('dotenv').config();

// setting up mongodb with mongoose & require the models...
require('./database');
require('./models/workout');

// middlewares
app.use(express.json());

// mount the router on the app
app.use(require('./routes/workout'));

const PORT = 8080;
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));