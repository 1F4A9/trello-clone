import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import CardFooter from './CardFooter';
import CardBody from './CardBody';

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
`;

export default function Card() {
  const [workouts, setWorkouts] = useState([]);
  const [clickedWorkoutTitle, setClickedWorkoutTitle] = useState('');

  useEffect(() => {
    axios.get('/get_workouts')
      .then(data => setWorkouts(data.data))
      .catch(err => {
        console.log(err);
      });
  }, [])

  console.log(workouts)

  return (
    <Container clickedWorkoutTitle={clickedWorkoutTitle} >
      {workouts.map((data) => {
        return (
          <div className="card" key={data._id} >
            <div className="card-header">
              <span style={{marginBottom: '1.666rem'}}>{data.title}</span>
              <i className="fas fa-ellipsis-h"></i>
            </div>
            <div className="card-body">
              <CardBody exercises={data.exercise}/>
            </div>
            <div className="card-footer" >
              <CardFooter title={data.title} id={data._id} />
            </div>
          </div>
        )
      })}
    </Container>
  )
}
