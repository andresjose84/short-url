const app = require( "./src" );

exports.handler = async event => {
    console.log( event );
    await app();
};