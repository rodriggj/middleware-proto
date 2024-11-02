import express from 'express'
import { body, validationResult } from 'express-validator'
import { Request, Response } from 'express';

const router = express.Router()

router.post("/api/users/signup",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),
    ], (req: Request, res: Response): any => {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            // return res.status(400).send(errors.array())
            throw new Error(`Invalid email or password.`)
        }
        
        const { email, password } = req.body

        console.log('Creating a new user...')
        throw new Error('Error connecting to the database.')

        res.send({})
    }
);

export { router as signUpRouter }