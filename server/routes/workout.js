const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Workout = mongoose.model('Workout');

router.get('/get_workouts', (req, res) => {
  Workout.find()
    .then(data => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
});

router.post('/add_workout', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Please fill in the required fields' });

  const workout = new Workout({ title });
  workout.save()
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.log(err.message);
      if (err.message) return res.status(500).json({ error: err.message });
    });
});

router.patch('/rename_workout', (req, res) => {
  const { title, id } = req.body;

  if (!title) return res.status(400).json({ error: 'Please enter a valid title' });

  Workout.findByIdAndUpdate(id, {
    $set: { title }
  })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    console.log(err.message);
    if (err.message) return res.status(500).json({ error: err.message });
  })
});

router.delete('/delete_workout', (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: `Please make this request with a valid id` });

  Workout.findByIdAndDelete(id)
    .then(data => {
      res.status(204).json(data)
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
});

module.exports = router;