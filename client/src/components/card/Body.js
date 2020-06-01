import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import BodyExerciseItem from './BodyExerciseItem';

const Container = styled.div`
  margin: 0px 12px;

  display: flex;
  flex-direction: column;
`;

export default function Body({ exercises, displayEditIcon, workoutID, workouts, setWorkouts }) {
  function onDelete(id) {
    axios.delete(`/workouts/exercises/delete/${id}`)
    .then(response => {
      let exercisesCopy = [...exercises];
      let workoutsCopy = [...workouts];

      let updatedExercises = exercisesCopy.filter(exercise => exercise._id !== id);

      let index = workoutsCopy.findIndex(workout => workout._id === workoutID);

      workoutsCopy[index].exercise = updatedExercises;

      setWorkouts(workoutsCopy);
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      {exercises.map(exercise => {
        return (
          <Container key={exercise._id}>
            <div className="flex-container">
              <BodyExerciseItem 
                exercise={exercise} 
                displayEditIcon={displayEditIcon} 
                workoutID={workoutID} 
                onDelete={onDelete}
                workouts={workouts}
                setWorkouts={setWorkouts}
                exerciseID={exercise._id}
              />
            </div>
          </Container>
        )
      })}
    </>
  )
}
