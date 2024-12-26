import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { initSeed } from '../data/init';

import Users from '../models/Users';
import ShortUrl from '../models/ShortUrl';
import { generateUniqueShortHash } from '../helpers/shorturl';

export const loadData = async ( req: Request, res: Response ) => {

    try {
        initSeed.user.forEach( async user => {

            const userInit = await Users.findOne( { user_email: user.user_email } );

            if ( userInit ) {
                res.status( 200 ).json( {
                    ok: true,
                    msg: 'The operation cannot be performed, the data has already been loaded.'
                } );
                return;
            }

            const salt = bcrypt.genSaltSync( 10 );
            user.user_password = bcrypt.hashSync( user.user_password, salt );
            user.created = new Date().getTime();
            user.modified = new Date().getTime();

            const newUser = new Users( user );
            await newUser.save();

            const newUrl = new ShortUrl( {
                url: initSeed.urls + newUser.user_name,
                short_url: generateUniqueShortHash(),
                name_url: newUser.user_name + ' Example',
                user_id: newUser._id,
                created: new Date().getTime(),
                modified: new Date().getTime(),
                status: true
            } );
            await newUrl.save();

        } );


        res.status( 200 ).json( {
            ok: true,
            msg: 'Data loaded'
        } );
    } catch ( error ) {
        console.log( 'Error loading seed data', error );

        res.status( 501 ).json( {
            ok: false,
            msg: 'error loading seed data'
        } );
    }


}