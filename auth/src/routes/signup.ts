import express from 'express'
import { body, validationResult } from 'express-validator'
import { Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'


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
            throw new RequestValidationError(errors.array())
        }

        console.log('Creating a new user...')
        
        throw new DatabaseConnectionError()

        res.send({})
    }
);

export { router as signUpRouter }