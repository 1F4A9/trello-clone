import React from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import axios from 'axios';

import { ItemTypes } from '../../utils/items';
import Footer from './Footer';
import Body from './Body';
import Header from './Header';

const Container = styled.div`
  background-color: #f1f3f5;
  margin: 10px;
  border-radius: 4px;
`;

export default function CardMain({ workout, setWorkouts, workouts, onDisplayEdit, displayEditIcon }) {
  function moveExercise(item) {
    const { exerciseID, workoutID, movedExercise, movedFromID } = item;
    
    if (workoutID !== movedFromID) {
      axios.patch(`/workouts/${workoutID}/exercises/${exerciseID}/move`)
      .then(result => {
        let updatedWorkout = { ...workout };
        let workoutsCopy = [...workouts];
        
        let newIndex = workoutsCopy.findIndex(workout => workout._id === workoutID);
        let oldIndex = workoutsCopy.findIndex(workout => workout._id === movedFromID);
  
        updatedWorkout.exercise.push(movedExercise);
        workoutsCopy.splice(newIndex, 1, updatedWorkout);
  
        let oldWorkout = workoutsCopy[oldIndex];
        let oldExercise = [...oldWorkout.exercise]
        let updatedExercise = oldExercise.filter(exercise => exercise._id !== movedExercise._id);
        oldWorkout.exercise = updatedExercise;
        workoutsCopy.splice(oldIndex, 1, oldWorkout);
  
        setWorkouts(workoutsCopy);
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.EXERCISE,
    drop: (item, monitor) => moveExercise({...item, ...{workoutID: workout._id}}),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  return (
    <Container key={workout._id} ref={drop} style={{backgroundColor: isOver ? 'green' : 'white'}}>
      <Header 
        setWorkouts={setWorkouts}
        workouts={workouts}
        title={workout.title} 
        onDisplayEdit={onDisplayEdit} 
        workoutID={workout._id}
        displayEditIcon={displayEditIcon}
      />
      <Body
        setWorkouts={setWorkouts}
        workouts={workouts}
        exercises={workout.exercise} 
        displayEditIcon={displayEditIcon} 
        workoutID={workout._id}
      />
      <Footer 
        setWorkouts={setWorkouts}
        workouts={workouts}
        workoutID={workout._id}
      />
    </Container>
  )
}
