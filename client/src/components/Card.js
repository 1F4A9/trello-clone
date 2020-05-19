import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import CardFooter from './CardFooter';
import CardBody from './CardBody';
import CardHeader from './CardHeader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .card {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;

    margin: 10px;
    background-color: #f1f3f5;
    border-radius: 4px;
  }
`;

export default function Card({ workouts, setWorkouts }) {
  const [displayEditIcon, setDisplayEditIcon] = useState('');

  function onDisplayEdit(workoutID) {
    setDisplayEditIcon(workoutID);
  }

  console.log(workouts)

  return (
    <Container>
      {workouts.map((workout) => {
        return (
          <div className="card" key={workout._id}>
            <CardHeader 
              setWorkouts={setWorkouts}
              workouts={workouts}
              title={workout.title} 
              onDisplayEdit={onDisplayEdit} 
              workoutID={workout._id}
              displayEditIcon={displayEditIcon}
            />
            <CardBody
              setWorkouts={setWorkouts}
              workouts={workouts}
              exercises={workout.exercise} 
              displayEditIcon={displayEditIcon} 
              workoutID={workout._id}
            />
            <CardFooter 
              workoutID={workout._id} 
            />
          </div>
        )
      })}
    </Container>
  )
}
