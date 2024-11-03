import express from 'express'
import { json } from 'body-parser'

// Import Auth Routers 
import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signUpRouter } from './routes/signup'
import { signOutRouter } from './routes/signout'

// Import ErrorHandling Middleware
import { errorHandler } from './middleware/error-handler'

const app = express()
app.use(json())

const SERVICE = "Auth"
const PORT = process.env.PORT || 3000

// Auth Services Routes
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signUpRouter)
app.use(signOutRouter)

app.use(errorHandler)

app.listen( 3000, () => {
    console.log(`Your ${SERVICE} service is up and listening on port ${PORT}`
    )
})
