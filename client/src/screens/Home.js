import React from 'react';
import styled from 'styled-components';
import Workouts from '../components/Workouts';

const Container = styled.main`
  width: 100%;
  background-color: #bbc4cc;
`;

export default function Home() {
  return (
    <Container>
      <Workouts />
    </Container>
  )
}
