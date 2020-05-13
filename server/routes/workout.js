const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Workout = mongoose.model('Workout');

router.get('/get_workouts', (req, res) => {
  Workout.find()
    .then(data => {
      res.json({ data });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/add_workout', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Please fill in the required fields' });

  const workout = new Workout({ title });
  workout.save()
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      console.log(err.message);
      if (err.message) return res.status(400).json({ error: err.message });
    });
});

router.post('/add_exercise', (req, res) => {
  const { name, sets, reps, weight, id } = req.body;

  if (!name || !sets || !reps || !weight || !id) {
    return res.status(400).json({ message: 'Please fill in the required fields' })
  }

  const exercise = {
    name,
    sets,
    reps,
    weight
  };

  Workout.findByIdAndUpdate(id, {
    $push: { exercise }
  }, {
    new: true
  })
  .then(data => {
    console.log(data);
    res.status(200).json({ data });
  })
  .catch(err => {
    console.log(err);
  })
});


module.exports = router;