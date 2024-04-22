require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const authRoutes = require('./routes/auth');

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());


app.use((req,res,next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes);

//connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });