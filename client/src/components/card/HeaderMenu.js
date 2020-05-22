import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  position: absolute;
  top: 32px;
  right: 12px;

  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 4px;
  background-color: #f1f3f5;

  z-index: 1;

  .edit,
  .delete,
  .info,
  .rename {
    cursor: pointer;
    padding: 4px 6px;
  }
`;

export default function HeaderMenu({ onDisplayEdit, displayEditIcon, onDisplayMenu, workoutID, setWorkouts, workouts }) {
  function onDelete() {
    axios.delete(`/workouts/delete/${workoutID}`)
    .then(result => {
      onDisplayMenu();
      
      let workoutsCopy = [...workouts];
      let updatedWorkouts = workoutsCopy.filter(workout => workout._id !== workoutID);
      setWorkouts(updatedWorkouts);
    })
    .catch(err => console.log(err));
  }

  function onEdit() {
    if (!displayEditIcon) {
      onDisplayEdit(workoutID);
    } else {
      onDisplayEdit('');
    }
    
    onDisplayMenu();
  }
  
  function onInfo() {
    
    onDisplayMenu();
  }

  return (
    <Container>
      <div className="edit" onClick={onEdit}>Edit exercises</div>
      <div className="info" onClick={onInfo}>Info</div>
      <div className="rename">Rename workout</div>
      <div className="delete" onClick={onDelete}>Delete workout</div>
    </Container>
  )
}
