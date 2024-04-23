import React, { useState } from "react";

const WorkoutDetails = ({ workouts, workout, setWorkouts }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState(workout);
  
  const handleDelete = async () => {
     const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
     })
     
     if(response.ok) {
      setWorkouts(workouts.filter((w) => w._id !== workout._id));
     }
   };

   const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    const response = await fetch('/api/workouts/' + editedWorkout._id, {
      method: 'PATCH',
      body: JSON.stringify(editedWorkout),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      setWorkouts(workouts.map((w) => w._id === editedWorkout._id ? editedWorkout : w));
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    setEditedWorkout({ ...editedWorkout, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="workout-details">
      {isEditing ? (
        <>
         <div className="edit-details">
          <label>Workout : <input type="text" name="title" value={editedWorkout.title} onChange={handleChange} /></label>
          <label>Day: <input type="text" name="day" value={editedWorkout.day} onChange={handleChange} /></label>
          <label>Weight (lbs): <input type="number" name="weight" value={editedWorkout.weight} onChange={handleChange} /></label>
          <label>Reps: <input type="number" name="reps" value={editedWorkout.reps} onChange={handleChange} /></label>
          <button onClick={handleUpdate}>Submit</button>
        </div>
        </>
      ) : (
        <>
          <h4>{workout.title}</h4>
          <p><strong>Day: </strong>{workout.day}</p>
          <p><strong>Weight (lbs): </strong>{workout.weight}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
        </>
      )}
      <div className="workout-detail-buttons">
        <button className="edit-button" onClick={handleEdit}><i class="fas fa-pencil-alt edit-icon"></i></button>
        <button onClick={handleDelete}><i class="fas fa-trash"></i></button>
      </div>
    </div>
   );
  };
  
  
  
  export default WorkoutDetails;