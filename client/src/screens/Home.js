import React from 'react';
import styled from 'styled-components';

import Card from '../components/Card';
import AddWorkoutCard from '../components/AddWorkoutCard';

const Container = styled.main`
  width: 100%;
  background-color: #bbc4cc;
`;

export default function Home() {
  return (
    <Container>
      <Card />
      <AddWorkoutCard />
    </Container>
  )
}
