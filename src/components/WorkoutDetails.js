import React from "react";

const WorkoutDetails = ({ workouts, workout, setWorkouts }) => {
 
    const handleClick = async () => {
     const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
     })
     
     if(response.ok) {
      setWorkouts(workouts.filter((w) => w._id !== workout._id));
     }
  
   };
  
    return (
      <div className="workout-details">
          <h4>{workout.title}</h4>
          <p><strong>Day: </strong>{workout.day}</p>
          <p><strong>Weight (lbs): </strong>{workout.weight}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
          <button onClick={handleClick}>X</button>
      </div>
    )
  };
  
  
  
  export default WorkoutDetails;