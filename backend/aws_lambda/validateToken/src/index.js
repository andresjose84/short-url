const dotenv = require( 'dotenv' );

const validateToken = require( './controllers/token.controller' );

const app = event => {

    dotenv.config();

    let authHeader = '';

    if ( !event.headers.authorization ) {
        if ( event.headers.Authorization ) {
            authHeader = event.headers.Authorization;
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify( {
                    ok: false,
                    message: 'No token provided'
                } )
            }
        }
    } else {
        authHeader = event.headers.authorization;
    }

    const token = authHeader.split( ' ' )[ 1 ];

    return validateToken( token );
}

module.exports = app;