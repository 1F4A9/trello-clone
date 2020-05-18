import React, { useState } from 'react';
import styled from 'styled-components';
import CardHeaderMenu from './CardHeaderMenu';

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  position: relative;

  span {
    margin: 6px 12px;
    margin-bottom: 1.666rem;
    font-weight: 900;
    cursor: default;
  }

  i {
    align-self: flex-start;
    color: #333;
    cursor: pointer;
    padding: 6px;
    margin: 0px 6px;
  }
`;

export default function CardHeader({ title, onDisplayEdit, workoutID }) {
  const [displayMenu, setDisplayMenu] = useState(false);

  function onDisplayMenu() {
    setDisplayMenu(!displayMenu);
  }

  return (
    <Container>
      <span>{title}</span>
      <i className="fas fa-ellipsis-h" onClick={onDisplayMenu}></i>
      {displayMenu && 
      <CardHeaderMenu 
        onDisplayEdit={onDisplayEdit} 
        workoutID={workoutID} 
        onDisplayMenu={onDisplayMenu}
      />}
    </Container>
  )
}