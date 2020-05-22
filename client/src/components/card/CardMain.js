import React, { useState } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';

import { ItemTypes } from '../../utils/items';
import Footer from './Footer';
import Body from './Body';
import Header from './Header';

const Container = styled.div`
  background-color: #f1f3f5;
  margin: 10px;
  border-radius: 4px;

  // transform: ${props => props.swipePos ? `translateX(${props.swipePos}%)` : 'translateX(0%)'};
  // transition: transform 0.6s ease 0s;
`;

export default function CardMain({ workout, setWorkouts, workouts, onDisplayEdit, displayEditIcon }) {
  // const [swipePos, setSwipePos] = useState(0);

  // const handlers = useSwipeable({ 
  //   onSwipedLeft: (swipe) => slide(swipe),
  //   onSwipedRight: (swipe) => slide(swipe),
  //   preventDefaultTouchmoveEvent: true,
  //   trackMouse: true,
  //   trackTouch: true,
  //   delta: 65
  // })

  // function slide(swipe) {
  //   console.log(swipe)
  //   if (swipe.dir === 'Left') {
  //     console.log('left');
  //     setSwipePos(swipePos - 100);
  //   }
    
  //   if (swipe.dir === 'Right') {
  //     console.log('right')

  //     setSwipePos(swipePos + 100);
  //   }
  // }

  function moveExercise(item) {
    console.log(item);
  }

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.EXERCISE,
    drop: (item, monitor) => moveExercise({...item, ...{workoutID: workout._id}}),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  // swipePos={swipePos} {...handlers}
  return (
    <Container key={workout._id} ref={drop} style={{backgroundColor: isOver ? 'green' : 'white'}}>
      <Header 
        setWorkouts={setWorkouts}
        workouts={workouts}
        title={workout.title} 
        onDisplayEdit={onDisplayEdit} 
        workoutID={workout._id}
        displayEditIcon={displayEditIcon}
      />
      <Body
        setWorkouts={setWorkouts}
        workouts={workouts}
        exercises={workout.exercise} 
        displayEditIcon={displayEditIcon} 
        workoutID={workout._id}
      />
      <Footer 
        setWorkouts={setWorkouts}
        workouts={workouts}
        workoutID={workout._id}
      />
    </Container>
  )
}
