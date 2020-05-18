import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  position: absolute;
  top: 32px;
  right: 12px;

  max-width: 100px;
  max-height: 100px;

  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 4px;

  .edit,
  .delete,
  .info {
    cursor: pointer;
  }
`;

export default function CardHeaderMenu({ onDisplayEdit, onDisplayMenu, workoutID }) {
  function onDelete() {
    axios.delete('/delete_workout', { data: {
      id: workoutID
    }})
    .then(result => {
      onDisplayMenu()
      console.log(result);
    })
    .catch(err => console.log(err));
  }

  function onEdit() {
    onDisplayEdit();
    onDisplayMenu();
  }
  
  function onInfo() {
    
    onDisplayMenu();
  }

  return (
    <Container>
      <div className="edit" onClick={onEdit}>Edit</div>
      <div className="info" onClick={onInfo}>Info</div>
      <div className="delete workout" onClick={onDelete}>Delete</div>
    </Container>
  )
}
