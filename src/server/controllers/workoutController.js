const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
// get all workouts
const getWorkouts = async (req, res) => {
  const userID = req.user.userID;
  
  // Use the userID to fetch the workouts from the database
  const workouts = await Workout.find({ userID: userID });

  res.json(workouts);
};

//create a new workout
const createWorkout = async (req, res) => {
  const {day, title, weight, reps} = req.body;
  const userID = req.user.userID;
  
  if (!title) {
    return res.status(400).json({ error: 'Workout name is required.' });
  }
  
  if (!day) {
    return res.status(400).json({ error: 'Day is required.' });
  }

  if (!weight) {
    return res.status(400).json({ error: 'Weight is required.' });
  }

  if (!reps) {
    return res.status(400).json({ error: 'Reps are required.' });
  }
//add doc to db
  try {
    const workout = await Workout.create({day, title, weight, reps, userID});
    res.status(200).json(workout);
  } catch(error) {
    res.status(400).json({error: error.message});
  };
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  };

  const workout = await Workout.findOneAndDelete({_id: id});

  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  };

  res.status(200).json(workout);

};

//update a workout
const updateWorkout = async (req, res) => {
  const {id} = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such workout'})
  };
  
  const workout = await Workout.findOneAndUpdate({_id: id}, {
     ...req.body
  });
  
  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  };

  res.status(200).json(workout);

};


module.exports = {
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}