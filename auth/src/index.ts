import { app } from './app'
import mongoose from 'mongoose'

// Console Log output
const SERVICE = "Auth"
const PORT = process.env.PORT || 3000

// Connect to MongoDB
const start = async () => {

  // Checks to see if there is a JWT_KEY as an env var
  // We do this here in App Start up vs. in the Route Handler in the event the route is never called
  if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined.')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }
};

// Cnfigure App Listener
app.listen(3000, () => {
  console.log(`Listen to ${SERVICE} service on port ${PORT}`);
});

// Kickoff Mongoose Connection 
start();