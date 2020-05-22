import React from 'react'
import { useDrag } from 'react-dnd';

import { ItemTypes } from '../../utils/items';

export default function BodyExerciseItem({ exercise, displayEditIcon, workoutID, onDisplayEdit, onDelete }) {
  
  // item, A plain JavaScript object describing the data being dragged.
  // hook returns extraProps, and a refrence
  // what´s going to be draggeble depends on which element you put the refrence on as a ref={}
  // if monitor, isDragging === true, only true when the specific items is being dragged
  const [{ isDragging }, drag] = useDrag({ 
    item: {
      type: ItemTypes.EXERCISE,
      exerciseID: exercise._id,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
   })

   return (
      <div className="exercise-container" ref={drag} style={{opacity: isDragging ? '0.5' : '1'}}>
        <p>{exercise.name}: {exercise.sets} x {exercise.reps}: {exercise.weight}kg</p>
        {displayEditIcon === workoutID && 
          <div className="icons">
            <i 
              className="fas fa-pencil-alt"
             onClick={() => onDisplayEdit(true, exercise._id)}>
            </i>
          <i className="fas fa-trash" onClick={() => onDelete(exercise._id)}></i>
        </div>}
      </div>
   )
}