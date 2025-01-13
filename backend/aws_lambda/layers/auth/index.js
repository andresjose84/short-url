const validateJWT = require( "./helpers/validateJWT" );


const isLogged = async ( event ) => {
    console.log( 'isLogin Layer' );

    const token = await validateJWT( event );

    console.log( 'isLogin Layer - Token', { token } );

    return token;
}

const isAdmin = async ( event, admin ) => {
    console.log( 'isAdmin Layer' );

    const token = await validateJWT( event );

    if ( token.statusCode ) {
        return token;
    }

    if ( token.type !== 1 ) {
        return {
            statusCode: 401,
            body: JSON.stringify( { message: 'Unauthorized' } )
        }
    }

    console.log( 'isAdmin Layer - Admin', {
        token
    } );

    return token;
}

module.exports = {
    isLogged,
    isAdmin
};