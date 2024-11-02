import express from 'express'

const router = express.Router()

router.post('/api/users/signin', (req, res) => {
    res.send('You have created a successful post to Signin.')
})

export { router as signInRouter }