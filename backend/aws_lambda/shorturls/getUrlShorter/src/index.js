const dotenv = require( "dotenv" );

const connectToDatabase = require( "./database/config" );

const listShortUrl = require( "./controllers/shorurl.controller" );

const app = async event => {
    try {
        dotenv.config();

        await connectToDatabase();
        
        const id = event.pathParameters ? event.pathParameters.id : null;

        return await listShortUrl( id, event.user );
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