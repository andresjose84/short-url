import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const validateJWT = ( req: Request, res: Response, next: NextFunction ): void => {
    try {
        const secret = process.env.SECRET_JWT_SEED;
        if ( !secret ) {
            throw new Error( 'The JWT_SECRET is not configured in the environment variables.' );
        }

        // Leer el token del header Authorization
        const authHeader = req.headers.authorization;

        if ( !authHeader || !authHeader.startsWith( 'Bearer ' ) ) {
            res.status( 401 ).json( { message: 'Token is missing or invalid.' } );
            return;
        }

        const token = authHeader.split( ' ' )[ 1 ]; // Extraer el token después de "Bearer"

        // Validar el token
        const jwtPayload = jwt.verify( token, secret );
        req.user = jwtPayload;
        // Puedes agregar datos del token al objeto `req` si es necesario
        req.headers[ 'x-token' ] = 'granted'; // o usa `req.user = jwtPayload` para datos personalizados

        next();
    } catch ( error ) {
        console.error( 'Token validation error:', error );
        res.status( 401 ).json( { message: 'Invalid token.', error: error } );
        return;
    }
};

export const isValidToken = ( req: Request, res: Response, next: NextFunction ): void => {
    try {
        const secret = process.env.SECRET_JWT_SEED;
        if ( !secret ) {
            throw new Error( 'The JWT_SECRET is not configured in the environment variables.' );
        }

        const authHeader = req.headers.authorization ? req.headers.authorization : '';

        const token = authHeader.split( ' ' )[ 1 ];

        try {
            const data = jwt.verify( token, secret );
            console.log( 'valid token' );
            req.headers.authorization = token;
            req.body.data = data;
            req.headers[ 'x-token' ] = 'granted';
            next();
        } catch ( error ) {
            console.log( 'invalid token' );
            req.headers.authorization = '';
            req.headers[ 'x-token' ] = '';
            next();
        }

    } catch ( error ) {
        console.error( 'Token validation error:', error );
        next();
    }
};
