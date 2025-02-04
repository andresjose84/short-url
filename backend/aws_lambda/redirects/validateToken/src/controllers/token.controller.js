const jwt = require( 'jsonwebtoken' );

const { responseData } = require( '../helpers/response' );


const validateToken = ( token ) => {

    try {
        const secret = process.env.SECRET_JWT_SEED;

        if ( !secret ) {
            throw new Error( 'The JWT_SECRET is not configured in the environment variables.' );
        }

        // console.log( { token, secret } );

        isValid = jwt.verify( token, secret );

        // console.log( { isValid } );


        if ( isValid ) {
            console.log( 'Token is valid' );
            return {
                statusCode: 200,
                body: { ok: true, message: "Token is valid" },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            //return responseData( 200, { ok: true, message: "Token is valid" }, { 'Content-Type': 'application/json' } );
        } else {
            console.log( 'Token is invalid' );

            return responseData( 200, { ok: false, message: "Token is invalid" }, { 'Content-Type': 'application/json' } );
        }

    } catch ( error ) {
        // console.log( 'Error validating Token',error );
        // console.log( 'Error validating Token msg', error.message );
        return responseData( 200, { ok: false, message: error.message }, { 'Content-Type': 'application/json' } );

    }
}

module.exports = validateToken;