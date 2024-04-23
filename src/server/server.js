require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const authRoutes = require('./routes/auth');
const path = require('path');
const history = require('connect-history-api-fallback');

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes);

// Serve static files
app.use(express.static(path.resolve(__dirname, '../src/assets')));
app.use(express.static(path.resolve(__dirname, '../dist')));

// Serve index.html for all routes not handled by the server
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// Error handling
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ message: 'Something went wrong' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// History API fallback
app.use(
  history({
    disableDotRule: true,
    verbose: true,
  })
);
