import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { validateRequest } from '../middleware/validate-request';
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'
import { Password } from '../services/password'

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
    async (req: Request, res: Response) => {
        // recieve the incoming email and password from the req.body
        const { email, password } = req.body

        // Look in MongoDB to see if the email belongs to an existing User
        const existingUser = await User.findOne({ email })

        // if email doesn't belong to an existing user provide generic error message
        if( !existingUser ) {
            throw new BadRequestError('Invalid credentials')
        }

        // if email is in DB, then compare stored password to provided password
        const passwordsMatch = await Password.compare( existingUser.password, password )

        // if passwords do not match throw an error
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid Credentials')   // for auth error we want to be as generic as possible to avoid revealing useful info
        }

        // If passwords do match then generate a JWT and send it back to the user
        // Generate JWT
        const userJwt = jwt.sign({
            id: existingUser.id, 
            email: existingUser.email
        }, 
        process.env.JWT_KEY!
        )

        // Store it on session object
        req.session = {
            jwt: userJwt
        }

        res.status(200).send(existingUser);
    }
)

export { router as signInRouter }