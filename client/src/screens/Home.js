import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend'
import Backend from 'react-dnd-html5-backend';
import ScrollContainer from 'react-indiana-drag-scroll'

import Card from '../components/card/Card';

const Container = styled.main`
  padding-top: 60px;
  width: 100%;
  background-color: #778899;

  height: 100vh;

  .scroll-container {
    height: 100%;
  }
`;

export default function Home() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios.get('/workouts')
      .then(data => setWorkouts(data.data))
      .catch(err => {
        console.log(err);
      });
  }, [])

  return (
    <Container>
      <DndProvider backend={Backend}>
        <ScrollContainer className="scroll-container" hideScrollbars={false} ignoreElements=".ignore-scroll-drag">
          <Card workouts={workouts} setWorkouts={setWorkouts} />
        </ScrollContainer>
      </DndProvider>
    </Container>
  )
}
