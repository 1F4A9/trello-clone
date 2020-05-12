const mongoose = require('../database');

const workoutSchema = new mongoose.Schema({
  workout: { type: String, required: true },
  exercise: [{
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    created: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now }
  }]
})

mongoose.model('Workout', workoutSchema);