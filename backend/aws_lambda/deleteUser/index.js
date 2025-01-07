const app = require( "./src" );

exports.handler = async event => {
    // console.log( event );
    return await app( event );
};