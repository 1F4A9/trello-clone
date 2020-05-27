const mongoose = require('../database');

const workoutSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  exercise: [{
    name: { type: String, trim: true },
    sets: Number,
    reps: Number,
    weight: Number,
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now }
  }]
});

// middlewares
workoutSchema.pre('updateOne', function(next) {
  this.set({ 'exercise.$.lastModified': new Date() });
  next();
});

mongoose.model('Workout', workoutSchema);