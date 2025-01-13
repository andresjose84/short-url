const mongoose = require( 'mongoose' );

let isConnected = false;

const connectToDatabase = async () => {
    if ( isConnected ) {
        console.log( 'Using existing database connection' );
        return;
    } else {
        console.log( 'Creating new database connection');
    }

    const dbUri = process.env.DB_CNN;
    if ( !dbUri ) {
        throw new Error( 'Environment variable DB_CNN is not set.' );
    }

    try {
        const connection = await mongoose.connect( dbUri, {
        } );

        isConnected = connection.connections[ 0 ].readyState === 1;
        console.log( 'Database connected successfully', connection.connection.host );
    } catch ( error ) {
        console.error( 'Database connection error:', error );
        throw error;
    }
};

module.exports = connectToDatabase;
