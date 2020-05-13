const mongoose = require('../database');

const workoutSchema = new mongoose.Schema({
  title: { type: String, minlength: 2 },
  exercise: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    created: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now }
  }]
})

mongoose.model('Workout', workoutSchema);