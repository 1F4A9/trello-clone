import React from 'react';
import styled from 'styled-components';

const Container = styled.nav`
  display: flex;
  position: fixed;

  height: 60px;
  right: 0;
  top: 0;
  left: 0;

  overflow-x: fill;

  background-color: #242526;

  .flex-container {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
  }

  i {
    transform: scale(2.5);
    color: #b0b3b8;
  }
`;

export default function NavigationHeader() {
  return (
    <Container>
      <div className="flex-container">
        <i className="fas fa-dumbbell"></i>
      </div>
    </Container>
  )
}
