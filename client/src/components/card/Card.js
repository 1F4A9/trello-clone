import React, {  useState } from 'react';
import styled from 'styled-components';

import AddWorkout from './AddWorkout';
import CardMain from './CardMain';

const Container = styled.div`
margin: 0 auto;
width: 100%;
display: flex;

.card-container {
  width: 100%;
  flex-shrink: 0;
}

@media (max-width: 599px) {
  width: 80%;
  min-width: 270px;
}

@media (min-width: 600px) {
  flex: 1;
  
  .card-container {
    max-width: 350px;
  }
}
`;

export default function Card({ workouts, setWorkouts }) {
  const [displayEditIcon, setDisplayEditIcon] = useState('');

  function onDisplayEdit(workoutID) {
    setDisplayEditIcon(workoutID);
  }

  console.log(workouts)

  return (
    <Container >
        {workouts.map((workout) => {
          return (
            <div className="card-container" key={workout._id}>
              <CardMain 
                workouts={workouts}
                setWorkouts={setWorkouts}
                displayEditIcon={displayEditIcon}
                onDisplayEdit={onDisplayEdit}
                workout={workout}
              />
            </div>
          )
        })}
        <div className="card-container">
          <AddWorkout workouts={workouts} setWorkouts={setWorkouts} />
        </div>
    </Container>
  )
}
