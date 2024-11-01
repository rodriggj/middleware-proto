import express from 'express'
import { json } from 'body-parser'

const app = express()
app.use(json())

const SERVICE = "Auth"
const PORT = process.env.PORT || 3000

app.get("/auth", (req, res) => {
    res.send(`You have reached the Auth service.`)
    }
)

app.listen( 3000, () => {
    console.log(`Your ${SERVICE} service is up and listening on port ${PORT}`
    )
})
