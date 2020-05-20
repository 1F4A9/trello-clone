import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import CardFooter from './CardFooter';
import CardBody from './CardBody';
import CardHeader from './CardHeader';
import AddWorkoutCard from '../components/AddWorkoutCard';

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
  
  .slider {
    margin: 0 auto;
    width: 100%;
    display: flex;
  }

  .flex-container {
    width: 100%;
    flex-shrink: 0;
  }
  
  .card {
    background-color: #f1f3f5;
    margin: 10px;
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
      <div className="slider">
        {workouts.map((workout) => {
          return (
            <div className="flex-container" key={workout._id}>
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
                  setWorkouts={setWorkouts}
                  workouts={workouts}
                  workoutID={workout._id}
                />
              </div>
            </div>
          )
        })}
        <div className="flex-container">
          <AddWorkoutCard workouts={workouts} setWorkouts={setWorkouts} />
        </div>
      </div>
    </Container>
  )
}
