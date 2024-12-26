
import { Response, Request } from 'express';

export const validateToken = ( req: Request, res: Response ) => {
    console.log( { token: req.headers.authorization } );
    res.status( 200 ).json( { message: 'Token is valid' } );
}
