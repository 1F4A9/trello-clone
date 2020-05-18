import React, { useState } from 'react';
import styled from 'styled-components';
import CardBodyEditExercise from './CardBodyEditExercise';

const Container = styled.div`
  margin: 0px 12px;

  display: flex;
  flex-direction: column;

  .exercise-container {
    display: flex;
    justify-content: space-between;

    i::before {
      cursor: pointer;
    }
  }
`;

export default function CardBody({ exercises, displayEditIcon }) {
  const [displayEdit, setDisplayEdit] = useState(false);
  const [clickedID, setClickedID] = useState('');

  function onDisplayEdit(id = '') {
    setClickedID(id);

    setDisplayEdit(!displayEdit);
  }

  console.log(displayEdit)

  return (
    <>
      {exercises.map(exercise => {
        return (
          <Container key={exercise._id}>
            <div className="flex-container">
              <div className="exercise-container">
                <p>{exercise.name}: {exercise.sets} x {exercise.reps}: {exercise.weight}kg</p>
                {displayEditIcon && <i className="fas fa-pencil-alt" onClick={() => onDisplayEdit(exercise._id)}></i>}
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
