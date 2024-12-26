import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        const options = {
        };

        if ( !process.env.DB_CNN ) {
            throw new Error( 'No se ha configurado la variable de entorno DB_CNN' );
        }

        await mongoose.connect( process.env.DB_CNN, options );
        console.log( 'DB connection established' );
    } catch ( error ) {
        // Maneja el error
    }
};