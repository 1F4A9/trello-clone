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
app.use((req, res, next) => {
  let start = Date.now();
  res.once("finish", () => {
    console.log(`Method: ${req.method}, Path: ${req.path}, Status: ${res.statusCode} Response Time: ${Date.now()-start}`)
  })
  next();
})

// mount the router on the app
app.use(require('./routes/workout'));
app.use(require('./routes/exercise'));

const PORT = 8080;
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));