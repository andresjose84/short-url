const dotenv = require( "dotenv" );

const loadData = require( "./controllers/seed.controller" );
const connectToDatabase = require( "./database/config" );

const app = async event => {
    try {
        dotenv.config();

        // console.log( 'ENV', process.env );

        await connectToDatabase();

        // console.log( 'Loading data...' );

        return await loadData( event );
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