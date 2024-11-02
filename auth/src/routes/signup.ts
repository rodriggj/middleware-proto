import express from 'express'

const router = express.Router()

router.post('/api/users/signup', (req, res) => {
    res.send(`You have made a successful post to signup route.`)
})

export { router as signUpRouter }