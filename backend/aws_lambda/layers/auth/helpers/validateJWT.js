const jwt = require( 'jsonwebtoken' );

const validateJWT = async ( event ) => {
    try {
        const authHeader = event.headers.Authorization || event.headers.authorization;
        if ( !authHeader ) {
            return {
                statusCode: 401,
                body: JSON.stringify( { message: 'No authorization token' } )
            };
        }

        const token = authHeader.replace( 'Bearer ', '' );
        const decoded = jwt.verify( token, process.env.SECRET_JWT_SEED );

        console.log( { decoded } );

        return decoded;
    } catch ( error ) {
        return {
            statusCode: 401,
            body: JSON.stringify( { message: 'Invalid token' } )
        };
    }
};

module.exports = validateJWT;