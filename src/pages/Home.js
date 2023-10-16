import React from "react";
import { useEffect, useState } from "react";

//components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutsForm from "../components/WorkoutsForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')

      const json = await response.json();

      if(response.ok) {
        setWorkouts(json)
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <WorkoutsForm setWorkouts={setWorkouts}/>
        <div className="workouts">
          {workouts && workouts.map((workout) => (
             <WorkoutDetails 
             key={workout._id} 
             workouts = {workouts} 
             workout={workout}
             setWorkouts={setWorkouts}
             />
          ))}
        </div>
        
      </div>
  );
};

export default Home;