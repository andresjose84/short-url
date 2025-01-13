const app = require( "./src" );
const { isAdmin } = require( '/opt/auth' );

exports.handler = async event => {
    // console.log( event );
    const token = await isAdmin( event );

    if ( token.statusCode )
        return token;
    else
        event.user = token;
    
    return await app( event );
};