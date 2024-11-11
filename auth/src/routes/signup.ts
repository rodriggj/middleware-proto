import express from 'express'
import { body, validationResult } from 'express-validator'
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'

import { User } from '../models/user'
import { RequestValidationError } from '../errors/request-validation-error'
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router()

router.post("/api/users/signup",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
        .trim()  // remove any spaces
        .isLength({ min: 4, max: 20 })  // validate that the password is between 4 and 20 chars
        .withMessage("Password must be between 4 and 20 characters"),
    ], async (req: Request, res: Response): Promise<any> => {
        const errors = validationResult(req)

        // Check for validation errors
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
      
        // Capture the user input for email and password
        const { email, password } = req.body;
      
        // Lookup in db if email already exists
        const existingUser = await User.findOne({ email });
      
        // If exists then throw error 
        if (existingUser) {
            throw new BadRequestError('Email in use');
        }
      
        // Create and Save a new user in the Mongodb
        const user = User.build({ email, password });
        await user.save();

        // Generate JWT
        const userJwt = jwt.sign({
            id: user.id, 
            email: user.email
        }, 
        process.env.JWT_KEY!
        )

        // Store it on session object
        req.session = {
            jwt: userJwt
        }

        res.status(201).send(user);
    }
);

export { router as signUpRouter }