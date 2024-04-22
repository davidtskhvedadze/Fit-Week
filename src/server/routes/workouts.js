const express = require('express');
const authenticateUser = require('../controllers/authmiddleware');
const {
  getWorkouts,
  // getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController')

const router = express.Router();


//GET all workouts
router.get('/', authenticateUser, getWorkouts);

//GET a single workout
// router.get('/:id', getWorkout);

//POST a new workout
router.post('/', authenticateUser, createWorkout);

//DELETE a workout
router.delete('/:id', deleteWorkout);

//Update a workout
router.patch('/:id', updateWorkout);


module.exports = router;