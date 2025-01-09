const loginUser = require( "./controllers/login.controller" );
const dotenv = require( "dotenv" );

const connectToDatabase = require( "./database/config" );
const app = async event => {
    dotenv.config();
    await connectToDatabase();

    event.body = JSON.parse( event.body );

    if ( !event.body.data ) {
        event.body.data = {};
    }

    return await loginUser( event.body, event.headers );

}

module.exports = app;