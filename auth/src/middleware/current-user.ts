import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface UserPayload {
    id: string
    email: string
}

// here we reach into an existing type definition and add an additional type which is the interface Userpayload
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = ( req: Request, res: Response, next: NextFunction ) => {
    
    //check to see if there is a Session Object, and if so does do we have a JWT property
    if(!req.session?.jwt) {
        return next()   //then simply return
    }

    // if thre is a JWT then we need to decode the token 
    try {
        // extract the token from the payload
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payload
    } catch (err) {
    }
    next()
}