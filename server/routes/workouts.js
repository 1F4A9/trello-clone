const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Workout = mongoose.model('Workout');

router.get('/', (req, res) => {
  Workout.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
});

router.post('/add', (req, res) => {
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

router.patch('/rename/:id', (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  if (!title) return res.status(400).json({ error: 'Please enter a valid title' });
  if (!id) return res.status(400).json({ error: 'Id does not exists' });

  Workout.findByIdAndUpdate(id, {
    $set: { title }
  })
  .then(data => {
    res.status(201).json(data);
  })
  .catch(err => {
    if (err.message) return res.status(500).json({ error: err.message });
  })
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

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