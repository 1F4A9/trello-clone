import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';

import { ItemTypes } from '../../utils/items';

const Container = styled.div`
  display: flex;
  cursor: default;
  width: 100%;
  
  i::before {
    cursor: pointer;
    margin-left: 8px;
  }
  
  .exercise {
    flex: 1;
    border-radius: 4px;
    background-color: #fff;
    margin-bottom: 1.666rem;
    padding: 6px;
    
    span {
      overflow-wrap: break-word;
      word-break: break-word;
      cursor: pointer;
    }

    .date-created {
      font-size: 12px;
      cursor: default;
    }
  }

  .flex-container {
    flex: 1;
  }

  form {
    margin: 0px;
    display: inline-block;
  }

`;

export default function BodyExerciseItem({ exercise, displayEditIcon, workoutID, onDisplayEdit, onDelete, setWorkouts, workouts, exerciseID }) {
  const [editName, setEditName] = useState(false);
  const [editSets, setEditSets] = useState(false);
  const [editReps, setEditReps] = useState(false);
  const [editWeight, setEditWeight] = useState(false);
  const [editExercise, setEditExercise] = useState({});
  const inputReference = useRef(null);

  useEffect(() => { 
    if (inputReference.current) {
      inputReference.current.focus();
    }
      
    function handleClickOutside(e) {
      if (inputReference.current) {
        if (!inputReference.current.contains(e.target)) {
          if (editName) setEditName(false);
          if (editSets) setEditSets(false);
          if (editReps) setEditReps(false);
          if (editWeight) setEditWeight(false);
        }
      }
    }

    if ((editName || editSets || editReps || editWeight) && (inputReference.current)) {
      document.addEventListener("click", handleClickOutside, false);
      return () => {
        document.removeEventListener("click", handleClickOutside, false);
      };
    }
  }, [editName, editSets, editReps, editWeight]);
  
  const [{ isDragging }, drag] = useDrag({ 
    item: {
      type: ItemTypes.EXERCISE,
      exerciseID: exercise._id,
      movedExercise: exercise,
      movedFromID: workoutID,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  function onSubmit(e) {
    e.preventDefault();

    let exerciseKey = Object.keys(editExercise)[0];
    let exerciseValue = Object.values(editExercise)[0];

    const obj = { [exerciseKey]: exerciseValue };

    axios.patch(`/workouts/exercises/edit/${exerciseKey}/${exercise._id}`, obj)
    .then(result => {
      let workoutsCopy = [...workouts];
      let workoutIndex = workoutsCopy.findIndex(workout => workout._id === workoutID);
      
      let exerciseCopy = [...workoutsCopy[workoutIndex].exercise];
      let workoutCopy = {...workoutsCopy[workoutIndex]};
      let exerciseIndex = exerciseCopy.findIndex(exercise => exercise._id === exerciseID);
      let exerciseToUpdate = exerciseCopy.filter(exercise => exercise._id === exerciseID);

      exerciseToUpdate[0][exerciseKey] = exerciseValue;
      exerciseCopy.splice(exerciseIndex, 1, exerciseToUpdate[0]);

      workoutCopy.exercise = exerciseCopy;

      setWorkouts(workoutsCopy);
    })
    .catch(err => {
      console.log(err)
    })
  }

  // --------------------- WARNING UGLY CODE BELOW ---------------------

  function onEditName() {
    if (!editExercise.name) {
      setEditExercise({name: exercise.name});
    }

    if (!editName && !editSets && !editReps && !editWeight) {
      setEditName(true);
    } else {
      setEditWeight(false);
      setEditReps(false);
      setEditSets(false);
      setEditName(true);
    }
  }

  function onEditSets() {
    if (!editExercise.sets) {
      setEditExercise({sets: exercise.sets});
    }

    if (!editName && !editSets && !editReps && !editWeight) {
      setEditSets(true);
    } else {
      setEditWeight(false);
      setEditReps(false);
      setEditName(false);
      setEditSets(true);
    }
  }

  function onEditReps() {
    if (!editExercise.reps) {
      setEditExercise({reps: exercise.reps});
    }

    if (!editName && !editSets && !editReps && !editWeight) {
      setEditReps(true);
    } else {
      setEditWeight(false);
      setEditSets(false);
      setEditName(false);
      setEditReps(true);
    }
  }

  function onEditWeight() {
    if (!editExercise.weight) {
      setEditExercise({weight: exercise.weight});
    }

    if (!editName && !editSets && !editReps && !editWeight) {
      setEditWeight(true);
    } else {
      setEditReps(false);
      setEditSets(false);
      setEditName(false);
      setEditWeight(true);
    }
  }

  function onChange(e) {
   setEditExercise({[e.target.name]: e.target.value});
  }

  let displayInput = null;
  if (editName) {
    displayInput = (
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={editExercise.name} ref={inputReference} name="name" />
      </form>
    );
  } else if (editSets) {
    displayInput = (
      <form onSubmit={onSubmit}>
        <input type="number" onChange={onChange} value={editExercise.sets} ref={inputReference} name="sets" />
      </form>
    );
  } else if (editReps) {
    displayInput = (
      <form onSubmit={onSubmit}>
        <input type="number" onChange={onChange} value={editExercise.reps} ref={inputReference} name="reps" />
      </form>
    );
  } else if (editWeight) {
    displayInput = (
      <form onSubmit={onSubmit}>
        <input type="number" onChange={onChange} value={editExercise.weight} ref={inputReference} name="weight" />
      </form>
    );
  }

  return (
     <Container className="ignore-scroll-drag" ref={drag} style={{opacity: isDragging ? '0.5' : '1'}}>
       <div className="exercise">
         <div className="exercise-name">
           <span onClick={onEditName}>
             {editName ? displayInput : exercise.name + ':'}
           </span>
         </div>
         <div className="flex-container">
           <span onClick={onEditSets}>
             {editSets ? displayInput : exercise.sets}
           </span>
           <span> x </span>
           <span onClick={onEditReps}>
             {editReps ? displayInput : exercise.reps}
           </span>
           <span>: </span>
           <span onClick={onEditWeight}>
             {editWeight ? displayInput : exercise.weight}
           </span>
           <span>kg</span>
         </div>
         <div className="flex-container">
           <span className="date-created">{moment(exercise.createdAt).format('MMMM Do YYYY, HH:mm')}</span>
         </div>
       </div>
       {displayEditIcon === workoutID && 
         <div className="icons">
          <i className="fas fa-trash" onClick={() => onDelete(exercise._id)}></i>
       </div>}
     </Container>
  )
}