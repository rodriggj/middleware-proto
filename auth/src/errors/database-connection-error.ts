import { ValidationError } from 'express-validator'

export class DatabaseConnectionError extends Error {

    reason = "Error Connecting to Database."
    
    constructor (){
        super()

        // Only because we are extending a built in Class (errors) -- typescript requirement
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
}