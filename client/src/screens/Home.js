import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Card from '../components/card/Card';

const Container = styled.main`
  width: 100%;
  background-color: #bbc4cc;
`;

export default function Home() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios.get('/get_workouts')
      .then(data => setWorkouts(data.data))
      .catch(err => {
        console.log(err);
      });
  }, [])

  return (
    <Container>
      <Card workouts={workouts} setWorkouts={setWorkouts} />
    </Container>
  )
}
