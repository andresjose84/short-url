const dotenv = require( "dotenv" );

const connectToDatabase = require( "./database/config" );

const createUser = require( "./controllers/users.controller" );

const app = async event => {
    try {
        dotenv.config();

        await connectToDatabase();

        const body = event.body ? JSON.parse( event.body ) : null;

        return await createUser( body );
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