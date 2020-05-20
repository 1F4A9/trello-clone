import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  input[type=number]::-webkit-inner-spin-button {
    opacity: 0;
  }
`;

export default function CardBodyEditExercise({ onDisplayEdit, displayEdit, exerciseID, clickedID }) {
  const [editedExercise, setEditedExercise] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const reference = useRef(null);

  useEffect(() => {
    if (exerciseID && clickedID) {
      document.addEventListener("click", handleClickOutside, false);
      return () => {
        document.removeEventListener("click", handleClickOutside, false);
      };
    }
  }, [exerciseID, clickedID]);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(true);
    }
  }, [displayEdit])

  function onSubmit(e) {
    e.preventDefault();

    axios.patch(`/edit_exercise/${exerciseID}`, {
      name: editedExercise.name,
      sets: editedExercise.sets,
      reps: editedExercise.reps,
      weight: editedExercise.weight,
    })
    .then(response => {
      console.log(response);
      onDisplayEdit(false);
    })
    .catch(err => console.log(err));
  }
  
  function onChange(e) {
    setEditedExercise({...editedExercise, ...{[e.target.name]: e.target.value}});
  }

  function handleClickOutside(e) {
    if (exerciseID && clickedID && reference.current.contains(e.target)) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  let display = null;
  if (clickedID === exerciseID && isVisible) {
    display = { display: 'block' };
  } else {
    display = { display: 'none' };
  };
  
  return (
    <Container style={display} ref={reference}>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={editedExercise.name || ''} type="text" name="name" autoComplete="off"/>
        <input onChange={onChange} value={editedExercise.sets || ''} type="number" name="sets" autoComplete="off"/>
        <input onChange={onChange} value={editedExercise.reps || ''} type="number" name="reps" autoComplete="off"/>
        <input onChange={onChange} value={editedExercise.weight || ''} type="number" name="weight" autoComplete="off"/>
        <input type="submit" />
      </form>
    </Container>
  )
}
