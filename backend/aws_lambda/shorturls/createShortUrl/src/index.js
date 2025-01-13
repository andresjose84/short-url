const dotenv = require( "dotenv" );

const connectToDatabase = require( "./database/config" );

const createShortUrl = require( "./controllers/shorurl.controller" );

const app = async event => {
    try {
        dotenv.config();

        await connectToDatabase();

        const body = event.body ? JSON.parse( event.body ) : null;
        const uid = event.user.uid ? event.user.uid : null;

        return await createShortUrl( body, uid );
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