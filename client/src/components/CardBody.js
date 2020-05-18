import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0px 12px;
`;

export default function CardBody({ exercises }) {
  return (
    <>
      {exercises.map(exercise => {
        return (
          <Container key={exercise._id}>
            <div className="amount">
              <p>{exercise.name}: {exercise.sets} x {exercise.reps}: {exercise.weight}kg</p>
            </div>
          </Container>
        )
      })}
    </>
  )
}
