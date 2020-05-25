const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Workout = mongoose.model('Workout');

/*
*
* ROUTE: /
*
*/

router.patch('/workout/:workoutID/exercise/:exerciseID/move', (req, res) => {
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
      res.status(204).json(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  );
});

module.exports = router;