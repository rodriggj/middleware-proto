import { ValidationError } from 'express-validator'
import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
    statusCode = 500
    reason = "Error Connecting to Database."
    
    constructor (){
        super('Error Connecting to DB...')

        // Only because we are extending a built in Class (errors) -- typescript requirement
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors(){
        return [
            { message: this.reason }
        ]
    }

}