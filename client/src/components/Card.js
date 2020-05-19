import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

export default function Card() {
  const [workouts, setWorkouts] = useState([]);
  const [displayEditIcon, setDisplayEditIcon] = useState('');

  useEffect(() => {
    axios.get('/get_workouts')
      .then(data => setWorkouts(data.data))
      .catch(err => {
        console.log(err);
      });
  }, [])

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
              title={workout.title} 
              onDisplayEdit={onDisplayEdit} 
              workoutID={workout._id}
              displayEditIcon={displayEditIcon}
            />
            <CardBody 
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
