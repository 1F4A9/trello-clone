import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  margin: 10px;
  background-color: #f1f3f5;
  border-radius: 4px;
  cursor: ${props => props.displayInput ? 'default' : 'pointer'};

  display: flex;
  justify-content: center;

  .card {
    padding: 6px 12px;
    width: 100%;
  }

  .confirm-container {
    width: 50%;
    margin-top: 10px;

    display: flex;
    align-items: center;

    input[type="submit"] {
      width: 100px;
      cursor: pointer;
    }

    i {
      margin-left: 20px;
      transform: scale(2);
      cursor: pointer;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 0rem;
  }

  input[type="text"] {
    flex: 1;
  }
`;

export default function AddWorkoutCard({ workouts, setWorkouts }) {
  const [title, setTitle] = useState('');
  const [displayInput, setDisplayInput] = useState(false);
  const inputReference = useRef(null);
  const cardReference = useRef(null);

  useEffect(() => {
    if (inputReference.current) {
      inputReference.current.focus();
    }
  }, [displayInput])

  useEffect(() => {
    if (displayInput) {
      document.addEventListener("click", handleClickOutside, false);
      return () => {
        document.removeEventListener("click", handleClickOutside, false);
      };
    }
  }, [displayInput]);

  function handleClickOutside(e) {
    if (cardReference.current.contains(e.target)) {
      setDisplayInput(true);
    } else {
      setDisplayInput(false);
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    axios.post('/add_workout', {
      title
    })
    .then(response => {
      console.log(response);
      let workoutsCopy = [...workouts];
      workoutsCopy.push(response.data);
      setWorkouts(workoutsCopy);

      setTitle('');
      setDisplayInput(false);
    })
    .catch(err => {
      console.log(err);
    });
  }

  function onChange(e) {
    setTitle(e.target.value);
  }

  function onClick() {
    setDisplayInput(true);
  }
  
  function onCancel(e) {
    e.stopPropagation();
    setDisplayInput(false);
    setTitle('');
  }

  let newWorkout = null;
  if (displayInput) {
    newWorkout = (
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          name="title" 
          onChange={onChange} 
          value={title} 
          placeholder="title..." 
          ref={inputReference}
          autoComplete="off"
        />
        <div className="confirm-container">
          <input type="submit" />
          <i className="fas fa-times" onClick={onCancel}></i>
        </div>
      </form>
    )
  } else {
    newWorkout = (
      <span>
        Add another workout...
      </span>
    )
  }

  return (
    <Container displayInput={displayInput} onClick={onClick}>
      <div className="card" ref={cardReference}>
        {newWorkout}
      </div>
    </Container>
  )
}