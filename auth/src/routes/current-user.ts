import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req: Request, res:Response):any => {
  //first check to see if there is a JWT associated with Session.
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }
  // next check to see if the JWT has been temperated with ... it should contain the session JWT that we created as Signup. 
  try {
    const payload = jwt.verify(
        req.session.jwt, 
        process.env.JWT_KEY!
    );
    res.send({ currentUser: payload });   // if not tampered ... send the current user payload
  } catch (err) {
    res.send({ currentUser: null });  // if no JWT or not valid, send a "null"
  }
});

export { router as currentUserRouter };