import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res) => {
    res.send(`You have made a successful post to signout`)
})

export { router as signOutRouter }