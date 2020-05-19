import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import CardBodyEditExercise from './CardBodyEditExercise';

const Container = styled.div`
  margin: 0px 12px;

  display: flex;
  flex-direction: column;

  .exercise-container {
    display: flex;
    justify-content: space-between;
    cursor: default;

    i::before {
      cursor: pointer;
      margin-left: 8px;
    }
  }
`;

export default function CardBody({ exercises, displayEditIcon, workoutID, workouts, setWorkouts }) {
  const [displayEdit, setDisplayEdit] = useState(false);
  const [clickedID, setClickedID] = useState('');

  useEffect(() => {
    // beacuse childcomponent listens for mouse clicks outside it's own "<div />"
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
    axios.patch('/remove_exercise', {
      id
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      {exercises.map(exercise => {
        return (
          <Container key={exercise._id}>
            <div className="flex-container">
              <div className="exercise-container">
                <p>{exercise.name}: {exercise.sets} x {exercise.reps}: {exercise.weight}kg</p>
                {displayEditIcon === workoutID && 
                  <div className="icons">
                    <i 
                      className="fas fa-pencil-alt"
                      onClick={() => onDisplayEdit(true, exercise._id)}>
                    </i>
                    <i className="fas fa-trash" onClick={() => onDelete(exercise._id)}></i>
                  </div>}
              </div>

              <CardBodyEditExercise
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
