import jwt from 'jsonwebtoken';

export const generateJWT = (
    uid: string,
    user: string,
    email: string,
    type: number
): Promise<string> => {
    return new Promise( ( resolve, reject ) => {
        const payload = { uid, user, email, type };
        const secret = process.env.SECRET_JWT_SEED;
        const expiresIn = process.env.EXPIRE_JWT || "1h"; 

        if ( !secret ) {
            return reject(
                new Error( "The JWT_SECRET is not configured in the environment variables." )
            );
        }

        jwt.sign(
            payload,
            secret,
            { expiresIn },
            ( err, token ) => {
                if ( err ) {
                    return reject( new Error( "Error generating Token." ) );
                }
                resolve( token! );
            }
        );
    } );
};
