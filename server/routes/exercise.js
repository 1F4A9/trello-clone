const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Workout = mongoose.model('Workout');

router.post('/add_exercise', (req, res) => {
  const { name, sets, reps, weight, id } = req.body;

  if (!name || !sets || !reps || !weight || !id) {
    return res.status(400).json({ error: 'Please fill in the required fields' });
  }

  const exercise = {
    name,
    sets,
    reps,
    weight
  };

  Workout.findByIdAndUpdate(id, {
    $push: { exercise },
  }, {
    new: true
  })
  .then(data => {
    if (!data) return res.status(400).json({ error: 'Please only add exercise to an existing workout' });

    res.status(201).json(data);
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: err });
  });
});

router.patch('/edit_exercise', (req, res) => {
  const { name, sets, reps, weight, id } = req.body;

  // DO SOME VALIDATION

  Workout.updateOne({ 'exercise._id': id }, {
    $set: { 
      'exercise.$.name': name, 
      'exercise.$.sets': sets,
      'exercise.$.reps': reps,
      'exercise.$.weight': weight
     }
  })
  .then(data => {
    res.status(201).json(data);
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: err });
  });
});

router.patch('/remove_exercise', (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: 'Please make this request with a valid id' });

  Workout.findOneAndUpdate({ 'exercise._id': id }, {
    $pull: { exercise: { _id: id } }
  })
  .then(data => {
    if (!data) return res.status(400).json({ error: 'Cannot remove object that does not exists' });
    
    res.status(200).json(data);
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: err });
  });
});

module.exports = router;