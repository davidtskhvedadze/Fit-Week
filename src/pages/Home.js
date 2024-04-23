import React from "react";
import { useEffect, useState } from "react";
import '../styles/home.css';

//components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutsForm from "../components/WorkoutsForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem('token');
    
      const response = await fetch(`/api/workouts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    
      const json = await response.json();
    
      if(response.ok) {
        setWorkouts(json)
      }
    }
  
    fetchWorkouts();
  }, []);

  return (
    <div className="home slide-in-from-left">
      <WorkoutsForm  setWorkouts={setWorkouts}/>
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