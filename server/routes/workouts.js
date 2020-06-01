const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Workout = mongoose.model('Workout');

/*
*
* ROUTE: '/workouts'
*
*/

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

/**************************************************************************
*
* ROUTE: '/workouts/exercises'
*
***************************************************************************/

router.post('/exercises/add/:id', (req, res) => {
  const id = req.params.id;
  const { name, sets, reps, weight } = req.body;
  
  if (!id) return res.status(400).json({ error: `Please make this request with a valid id` });
  if (!name || !sets || !reps || !weight) {
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

router.delete('/exercises/delete/:id', (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ error: 'Please make this request with a valid id' });

  Workout.findOneAndUpdate({ 'exercise._id': id }, {
    $pull: { exercise: { _id: id } }
  })
  .then(data => {
    if (!data) return res.status(400).json({ error: 'Cannot remove object that does not exists' });
    
    res.status(204).json(data);
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: err });
  });
});

router.patch('/exercises/edit/name/:id', (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  
  if (!id) return res.status(400).json({ error: `Please make this request with a valid id` });
  if (!name) return res.status(400).json({ error: `Please make this request with a valid name` });

  Workout.updateOne({ 'exercise._id': id }, {
    $set: { 
      'exercise.$.name': name,
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

router.patch('/exercises/edit/sets/:id', (req, res) => {
  const id = req.params.id;
  const { sets } = req.body;
  
  if (!id) return res.status(400).json({ error: `Please make this request with a valid id` });
  if (!sets) return res.status(400).json({ error: `Please make this request with a valid number` });

  Workout.updateOne({ 'exercise._id': id }, {
    $set: { 
      'exercise.$.sets': sets,
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

router.patch('/exercises/edit/reps/:id', (req, res) => {
  const id = req.params.id;
  const { reps } = req.body;
  
  if (!id) return res.status(400).json({ error: `Please make this request with a valid id` });
  if (!reps) return res.status(400).json({ error: `Please make this request with a valid number` });

  Workout.updateOne({ 'exercise._id': id }, {
    $set: { 
      'exercise.$.reps': reps,
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

router.patch('/exercises/edit/weight/:id', (req, res) => {
  const id = req.params.id;
  const { weight } = req.body;
  
  if (!id) return res.status(400).json({ error: `Please make this request with a valid id` });
  if (!weight) return res.status(400).json({ error: `Please make this request with a valid number` });

  Workout.updateOne({ 'exercise._id': id }, {
    $set: { 
      'exercise.$.weight': weight,
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

router.patch('/:workoutID/exercises/:exerciseID/move', (req, res) => {
  const exerciseID = req.params.exerciseID;
  const workoutID = req.params.workoutID;

  if (!workoutID || !exerciseID) return res.status(400).json({ error: 'Please make this request with a valid id' });

  Workout.findOne({'exercise._id': exerciseID})
    .then(data =>  { 
      if (!data) return res.status(400).json({ error: 'Cannot find the given exercise ID' });

      return data.exercise.find(exercise => exercise._id.toString() === exerciseID);
    })
    .then((exerciseToMove) => {
      return Workout.findOneAndUpdate({
        'exercise._id': { $ne: exerciseToMove },
        _id: workoutID 
      }, {
        $push: { exercise: exerciseToMove } 
      })
    })
    .then(() => {
      return Workout.findOneAndUpdate({ 
        _id: { $ne: workoutID },
        'exercise._id': exerciseID 
      }, {
        $pull: { exercise: { _id: exerciseID } }
      })
    })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  );
});

module.exports = router;