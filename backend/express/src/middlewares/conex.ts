import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { dbConnection } from "../database/config";

export const connection = async ( req: Request, res: Response, next: NextFunction ) => {
    try {

        // Verified if it is already connected to MongoDB
        if ( mongoose.connection.readyState === 1 ) {
            console.log( 'already connected to MongoDb' );
            return next();
        }

        await dbConnection();
        console.log( 'Successfully connected to MongoDb' );
        next();
    } catch ( error ) {
        console.error( 'Error connection to MongoDB:', error );
        res.status( 500 ).json( { message: 'Error connecting to data base' } );
    }
    //Database
}