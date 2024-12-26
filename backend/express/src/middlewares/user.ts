
import { Request, Response, NextFunction } from 'express';

export const isAdmin = ( req: Request, res: Response, next: NextFunction ): void => {
    try {
        // Asegúrate de que el payload del token está disponible en `req.user`
        const user = req.user;

        if ( !user ) {
            res.status( 401 ).json( { message: 'Token validation is required before role validation.' } );
            return;
        }

        // Verifica si el usuario tiene el tipo de administrador
        if ( user.type !== 1 ) {
            res.status( 403 ).json( { message: 'Access denied. Admins only.' } );
            return;
        }

        next(); // Continúa si el usuario es administrador
    } catch ( error ) {
        console.error( 'Role validation error:', error );
        res.status( 500 ).json( { message: 'Internal server error.', error: error } );
    }
};
