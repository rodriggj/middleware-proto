import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

// Import Auth Routers 
import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signUpRouter } from './routes/signup'
import { signOutRouter } from './routes/signout'

// Import Error Handlers
import { errorHandler } from './middleware/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()

// Configure the JWT, Cookie, and Session Objects
app.set('trust proxy', true)   // lets express know that traffic is being proxied by ingress-nginx and the traffic is secure
app.use(json())
app.use(cookieSession({
  signed: false,   // doesn't need to be encrypted b/c JWT already does this
  secure: true   // require https connection
}))

// Console Log output
const SERVICE = "Auth"
const PORT = process.env.PORT || 3000

// Auth Services Routes
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signUpRouter)
app.use(signOutRouter)

// Error handler
app.use(errorHandler)
app.get('*', async () => {
  throw new NotFoundError()
})

// Connect to MongoDB
const start = async () => {

  // Checks to see if there is a JWT_KEY as an env var
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