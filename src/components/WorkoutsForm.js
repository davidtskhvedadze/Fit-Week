import React from "react";

import { useState } from "react";

const WorkoutsForm = ({ setWorkouts }) => {
  const [day, setDay] = useState('');
  const [title, setTitle] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const workout = {day, title, weight, reps};
    const token = localStorage.getItem('token');


    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      }
    })
     const json = await response.json();

     if(!response.ok) {
        setError(json.error);
     }

     if(response.ok) {
        setDay('');
        setTitle('');
        setWeight('');
        setReps('');
        setError(null);
        console.log('new workout added', json);

        setWorkouts((prevWorkouts) => [...prevWorkouts, json]);
     }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
    <label>Workout Name:</label>
      <input 
      type="text"
      onChange={(e) => setTitle(e.target.value)} 
      value={title}
      />
     <label>Day:</label>
      <input 
      type="text"
      onChange={(e) => setDay(e.target.value)} 
      value={day}
      />
    <label>Weight (lbs):</label>
      <input 
      type="number"
      onChange={(e) => setWeight(e.target.value)} 
      value={weight}
      />

    <label>Reps:</label>
      <input 
      type="number"
      onChange={(e) => setReps(e.target.value)} 
      value={reps}
      />
        <div className="form-button-container">
          <button>Add Workout</button>
          {error && <p className="error">{error}</p>}
        </div>
   
    </form>
  )
};


export default WorkoutsForm;