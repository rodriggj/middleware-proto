import { ValidationError } from 'express-validator'

export class RequestValidationError extends Error {
    
    constructor (public errors: ValidationError[]) {
        super()

        // Only because we are extending a built in Class (errors) -- typescript requirement
        Object.setPrototypeOf(this, RequestValidationError.prototype)

    }
}