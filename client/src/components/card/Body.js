import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import BodyEditExercise from './BodyEditExercise';
import BodyExerciseItem from './BodyExerciseItem';

const Container = styled.div`
  margin: 0px 12px;

  display: flex;
  flex-direction: column;

  .exercise-container {
    display: flex;
    justify-content: space-between;
    cursor: default;

    width: 100%;

    i::before {
      cursor: pointer;
      margin-left: 8px;
    }
  }
`;

export default function Body({ exercises, displayEditIcon, workoutID, workouts, setWorkouts }) {
  const [displayEdit, setDisplayEdit] = useState(false);
  const [clickedID, setClickedID] = useState('');

  useEffect(() => {
    // childcomponent listens for mouse clicks outside it's own "<div />"
    // more than one render will cause displayEdit to switch between false/true when it should not.
    if (displayEdit) {
      setDisplayEdit(false);
    }
  },[displayEdit])

  function onDisplayEdit(boolean, id = '') {
    setClickedID(id);

    setDisplayEdit(boolean);
  }

  function onDelete(id) {
    axios.delete(`/workouts/exercises/delete/${id}`)
    .then(response => {
      console.log(response)
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
                onDisplayEdit={onDisplayEdit} 
                onDelete={onDelete}
              />

              <BodyEditExercise
                workoutID={workoutID}
                exercises={exercises}
                setWorkouts={setWorkouts}
                workouts={workouts}
                onDisplayEdit={onDisplayEdit}
                displayEdit={displayEdit}
                exerciseID={exercise._id}
                clickedID={clickedID}
              />
            </div>
          </Container>
        )
      })}
    </>
  )
}
