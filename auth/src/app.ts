import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
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
  secure: process.env.NODE_ENV !== 'test'   // changed this to allow for when in test env we don't have to send via HTTPS to allow JEST tests to execute
}))

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

export { app }