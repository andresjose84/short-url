const dotenv = require( "dotenv" );

const getUrlShorter = require( "./controllers/redirect.controller" );
const connectToDatabase = require( "./database/config" );

const app = async event => {

    dotenv.config();

    // console.log( 'ENV', process.env );

    await connectToDatabase();

    const shorturi = event.pathParameters.shorturi;
    const headers = event.headers;

    return await getUrlShorter( shorturi, headers );
}

module.exports = app;