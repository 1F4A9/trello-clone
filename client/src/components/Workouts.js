import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

  .card-header {
    flex: 1;
    display: flex;
    justify-content: space-between;

    span {
      margin: 6px 12px;
      font-weight: 900;
      cursor: default;
    }

    i {
      align-self: center;
      color: #333;
      cursor: pointer;
      padding: 6px;
      margin: 0px 6px;
    }
  }

  .card-footer {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    margin: 6px 12px;
    border-radius: 4px;
  }

  .default-footer {
    font-size: 14px;

    :hover {
      cursor: pointer;
      background-color: #e4e7eb;
    }
  }

  // BEWARE THE FOLLOWING CODE CONTAINS DARK MAGIC

  .add-exercise {
    display: none;
  }

  .${props => props.clickedWorkoutTitle ? props.clickedWorkoutTitle : null} {
    display: block;
  }

  .${props => props.clickedWorkoutTitle ? props.clickedWorkoutTitle + '-span' : null} {
    display: none;
  }
`;

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [clickedWorkoutTitle, setClickedWorkoutTitle] = useState('');
  const [exercise, setExercise] = useState({});
  
  useEffect(() => {
    axios.get('/get_workouts')
      .then(data => setWorkouts(data.data))
      .catch(err => {
        console.log(err);
      });
  }, [])

  console.log(workouts)

  function handleNewExercise(title) {
    setClickedWorkoutTitle(title);
  }

  function onSubmit(e) {
    e.preventDefault();

    console.log(exercise);
  }

  function onChange(e) {
    setExercise({...exercise, ...{[e.target.name]: e.target.value} });
  }

  return (
    <Container clickedWorkoutTitle={clickedWorkoutTitle}>
      {workouts.map(data => {
        return (
          <div className="card" key={data._id}>
            <div className="card-header">
              <span>{data.title}</span>
              <i className="fas fa-ellipsis-h"></i>
            </div>
            <div className="card-body">

            </div>
            <div className="card-footer" onClick={() => handleNewExercise(data.title)}>
              <span className={`default-footer ${data.title}-span`}>+ Add new exercise</span>
              <div className={`add-exercise ${data.title}`} >
                <form onSubmit={onSubmit}>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="name..." 
                    value={exercise.name || ''} 
                    onChange={onChange}
                  />
                  <input
                    type="number" 
                    name="sets" 
                    placeholder="sets..." 
                    value={exercise.sets || ''} 
                    onChange={onChange}
                  />
                  <input
                    type="number" 
                    name="reps" 
                    placeholder="reps..." 
                    value={exercise.reps || ''} 
                    onChange={onChange}
                  />
                  <input 
                    type="number" 
                    name="weight" 
                    placeholder="weight..." 
                    value={exercise.weight || ''} 
                    onChange={onChange}
                  />
                  <input 
                    type="submit" 
                    onSubmit={onSubmit}
                  />
                </form>
              </div>
            </div>
          </div>
        )
      })}
    </Container>
  )
}
