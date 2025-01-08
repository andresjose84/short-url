const dotenv = require( "dotenv" );

const connectToDatabase = require( "./database/config" );

const updateShortUrl = require( "./controllers/shorurl.controller" );

const app = async event => {
    try {
        dotenv.config();

        await connectToDatabase();

        const id = event.pathParameters ? event.pathParameters.id : null;
        const body = event.body ? JSON.parse( event.body ) : null;

        return await updateShortUrl( body, id );
    }
    catch ( error ) {
        console.log( 'Error loading seed data', error );

        return {
            statusCode: 501,
            body: JSON.stringify( {
                ok: false,
                msg: 'error loading seed data'
            } )
        };
    }

}

module.exports = app;