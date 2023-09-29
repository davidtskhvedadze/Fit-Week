import { useState } from "react";

const WorkoutsForm = ({ setWorkouts }) => {
  const [title, setTitle] = useState('')
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = {title, weight, reps};

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json' 
      }
    })
     const json = await response.json();

     if(!response.ok) {
        setError(json.error);
     }

     if(response.ok) {
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

      <label>Name:</label>
      <input 
      type="text"
      onChange={(e) => setTitle(e.target.value)} 
      value={title}
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
        <div class="form-button-container">
          <button>Add Workout</button>
        </div>
   
    </form>
  )
};


export default WorkoutsForm;