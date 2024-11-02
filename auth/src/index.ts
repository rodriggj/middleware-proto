import express from 'express'
import { json } from 'body-parser'

import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signUpRouter } from './routes/signup'
import { signOutRouter } from './routes/signout'

const app = express()
app.use(json())

const SERVICE = "Auth"
const PORT = process.env.PORT || 3000

// Auth Services Routes
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signUpRouter)
app.use(signOutRouter)

app.listen( 3000, () => {
    console.log(`Your ${SERVICE} service is up and listening on port ${PORT}`
    )
})
