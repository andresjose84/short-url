const app = require( "./src" );
const { isLogged } = require( '/opt/auth' );

exports.handler = async event => {
    //console.log( event );

    const token = await isLogged( event );

    if ( token.statusCode )
        return token;
    else
        event.user = token;

    return await app( event );
};