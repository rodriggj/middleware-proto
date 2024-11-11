import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'

/*
Purpose of this middleware is to throw errors when malformed req.body is provided to our services. 
This function will utilize our custom error-handling middleware and error types to form the response payload
*/

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array())
    }

    next()
}