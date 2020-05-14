const mongoose = require('../database');

const workoutSchema = new mongoose.Schema({
  title: { type: String, minlength: 2 },
  exercise: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now }
  }]
});

workoutSchema.pre('updateOne', function(next) {
  this.set({ 'exercise.$.lastModified': new Date() });
  next();
});

mongoose.model('Workout', workoutSchema);