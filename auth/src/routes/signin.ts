import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { validateRequest } from '../middleware/validate-request'

const router = express.Router()

router.post('/api/users/signin', 
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ],
    validateRequest,   // middleware function to check validation results
    (req: Request, res: Response) => {

        res.status(200).json({ msg: 'You are signed in.' })
})

export { router as signInRouter }