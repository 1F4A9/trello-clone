import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import HeaderMenu from './HeaderMenu';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.666rem;

  position: relative;

  span {
    margin: 6px 12px;
    font-weight: 900;
    cursor: pointer;
  }

  i {
    color: #333;
    cursor: pointer;
    padding: 6px;
    margin: 0px 6px;
  }

  form {
    margin: 0;
  }
`;

export default function Header({ title, onDisplayEdit, workoutID, displayEditIcon, setWorkouts, workouts }) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const titleReference = useRef(null);

  useEffect(() => {
    if (titleReference.current) {
      titleReference.current.focus();
    }
  }, [editTitle])

  useEffect(() => {
    function handleClickOutside(e) {
      if (titleReference.current.contains(e.target)) {
        setEditTitle(true);
      } else {
        if (title !== newTitle) {
          axios.patch(`/workouts/rename/${workoutID}`, {
            title: newTitle,
          })
          .then(response => {
            let updatedWorkouts = [...workouts];
            let index = updatedWorkouts.findIndex(workout => workout._id === response.data._id);
            response.data.title = newTitle;
            updatedWorkouts.splice(index, 1, response.data);
  
            setWorkouts(updatedWorkouts);
            
            return setEditTitle(false);
          })
          .catch(err => {
            console.log(err);
          })
        }
        setEditTitle(false);
      }
    }

    if (editTitle) {
      document.addEventListener("click", handleClickOutside, false);
      return () => {
        document.removeEventListener("click", handleClickOutside, false);
      };
    }
  }, [editTitle, newTitle, title, workoutID, workouts, setWorkouts]);

  function onDisplayMenu() {
    setDisplayMenu(!displayMenu);
  }

  function onClick() {
    if (!newTitle) {
      setNewTitle(title);
    }
    setEditTitle(true);
  }

  function onSubmit(e) {
    e.preventDefault();

    axios.patch(`/workouts/rename/${workoutID}`, {
      title: newTitle,
    })
    .then(response => {
      setEditTitle(false);
    })
    .catch(err => {
      console.log(err);
    })
  }

  function onChange(e) {
    setNewTitle(e.target.value);
  }

  let titleInput = (
    <form onSubmit={onSubmit}>
      <input type="text" value={newTitle} onChange={onChange} ref={titleReference}/>
    </form>
  )

  return (
    <Container>
      <span onClick={onClick}>
        {editTitle ? titleInput : newTitle || title}
      </span>
      <i className="fas fa-ellipsis-h" onClick={onDisplayMenu}></i>
      {displayMenu && 
      <HeaderMenu 
        setWorkouts={setWorkouts}
        workouts={workouts}
        onDisplayEdit={onDisplayEdit} 
        workoutID={workoutID} 
        onDisplayMenu={onDisplayMenu}
        displayEditIcon={displayEditIcon}
      />}
    </Container>
  )
}