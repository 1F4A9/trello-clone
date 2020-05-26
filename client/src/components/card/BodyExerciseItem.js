import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

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
  }

  .flex-container {
    flex: 1;
  }

  form {
    margin: 0px;
    display: inline-block;
  }
`;

export default function BodyExerciseItem({ exercise, displayEditIcon, workoutID, onDisplayEdit, onDelete }) {
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

    console.log(editExercise)
  }

  // --------------------- WARNING UGLY CODE BELOW ---------------------

  function onEditName() {
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
        <input type="text" onChange={onChange} value={editExercise.name || ''} ref={inputReference} name="name" />
      </form>
    );
  } else if (editSets) {
    displayInput = (
      <form onSubmit={onSubmit}>
        <input type="number" onChange={onChange} value={editExercise.sets || ''} ref={inputReference} name="sets" />
      </form>
    );
  } else if (editReps) {
    displayInput = (
      <form onSubmit={onSubmit}>
        <input type="number" onChange={onChange} value={editExercise.reps || ''} ref={inputReference} name="reps" />
      </form>
    );
  } else if (editWeight) {
    displayInput = (
      <form onSubmit={onSubmit}>
        <input type="number" onChange={onChange} value={editExercise.weight || ''} ref={inputReference} name="weight" />
      </form>
    );
  }

  return (
     <Container className="ignore-scroll-drag" ref={drag} style={{opacity: isDragging ? '0.5' : '1'}}>
       <div className="exercise">
         <div className="exercise-name">
           <span onClick={onEditName}>
             {editName ? displayInput : exercise.name}
           </span>
           <span>:&nbsp;</span>
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
       </div>
       {displayEditIcon === workoutID && 
         <div className="icons">
           <i 
             className="fas fa-pencil-alt"
            onClick={() => onDisplayEdit(true, exercise._id)}>
           </i>
         <i className="fas fa-trash" onClick={() => onDelete(exercise._id)}></i>
       </div>}
     </Container>
  )
}