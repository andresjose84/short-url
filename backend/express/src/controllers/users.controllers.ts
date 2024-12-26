import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import Users from '../models/Users';

import { generateJWT } from '../helpers/jwt';

import { Token } from '../interfaces/token.interface';
import { User, UserQuery } from '../interfaces/user.interface';

export const listUsers = async ( req: Request, res: Response ) => {
    try {
        const user_id = req.query.id;
        const query: UserQuery = {};

        if ( user_id ) {
            query[ '_id' ] = user_id.toString();
        }

        const users = await Users.find( query );

        const listUsers = users.map( item => {
            const { _id, user, user_email, modified, status } = item;
            return {
                _id,
                user,
                email: user_email,
                modified,
                status
            };
        } );

        res.status( 200 ).json( {
            ok: true,
            msg: 'List of users',
            listUsers
        } );


    } catch ( error ) {
        console.log( 'Error listing users', error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Please reach out to the administrator for support.'
        } );
    }
}

export const createUser = async ( req: Request, res: Response ) => {

    const userNew: User = req.body;

    try {

        let user = await Users.findOne( { user: userNew.user } );
        console.log( user );

        if ( user ) {
            res.status( 400 ).json( {
                ok: false,
                msg: 'User already exists!'
            } );
            return;
        }

        const salt = bcrypt.genSaltSync( 10 );
        userNew.user_password = bcrypt.hashSync( userNew.user_password, salt );
        userNew.created = new Date().getTime();
        userNew.modified = new Date().getTime();
        userNew.status = true;

        user = new Users( userNew );

        await user.save();

        res.status( 200 ).json( {
            ok: true,
            msg: 'Registration successful.',
            uid: user._id,
            user: user.user
        } );
    } catch ( error ) {
        console.log( "Error createUser", error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Please reach out to the administrator for support.'
        } );
    }

};

export const updateUser = async ( req: Request, res: Response ) => {
    const user_id = req.params.id;
    const userNew: User = req.body;

    try {

        const user = await Users.findById( user_id );

        if ( !user ) {
            res.status( 400 ).json( {
                ok: false,
                msg: 'User not found.'
            } );
            return;
        }

        const salt = bcrypt.genSaltSync( 10 );
        user.user_password = bcrypt.hashSync( userNew.user_password, salt );
        user.modified = new Date().getTime();
        user.user_name = userNew.user_name;
        user.user_last_name = userNew.user_last_name;
        user.user_image = userNew.user_image;
        const userUpdated = await Users.findByIdAndUpdate( user_id, user, { new: true } );

        res.status( 200 ).json( {
            ok: true,
            msg: 'User updated successfully.',
            user: userUpdated
        } );

    } catch ( error ) {
        console.log( "Error update User", error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Please reach out to the administrator for support.'
        } );
    }
};

export const deleteUser = async ( req: Request, res: Response ) => {
    const user_id = req.params.id;

    try {

        const user = await Users.findById( user_id );
        if ( !user ) {
            res.status( 400 ).json( {
                ok: false,
                msg: 'User not found.'
            } );
            return;
        }

        user.status = false;
        const userDeleted = await Users.findByIdAndUpdate( user_id, user, { new: true } );

        res.status( 200 ).json( {
            ok: true,
            msg: 'User deleted successfully.',
            user: userDeleted
        } );

    } catch ( error ) {
        console.log( "Error delete User", error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Please reach out to the administrator for support.'
        } );
    }
};

export const loginUser = async ( req: Request, res: Response ) => {

    try {
        const { user, password } = req.body;
        console.log( {
            token: req.headers[ 'x-token' ],
            body: req.body
        } );

        let userLogged = await Users.findOne( { user } );
        console.log( userLogged );
        if ( !userLogged ) {
            res.status( 400 ).json( {
                ok: false,
                msg: 'User not found.'
            } );
            return;
        }

        if ( req.headers[ 'x-token' ] === 'granted' ) {

            if ( userLogged.user !== req.body.data.user || userLogged.user_email !== req.body.data.email || userLogged.user_type !== req.body.data.type ) {
                console.log( 'The token has been modified manually! watchout!' );

                res.status( 500 ).json( {
                    ok: false,
                    msg: 'Please reach out to the administrator for support.'
                } );
                return;
            }

            res.status( 200 ).json( {
                ok: true,
                uid: userLogged._id.toString(),
                email: userLogged.user_email,
                name: userLogged.user_name,
                user: userLogged.user,
                type: userLogged.user_type,
                token: req.headers.authorization,
                msg: 'Access granted'
            } );
            return;
        }

        const validPassword = bcrypt.compareSync( password, userLogged.user_password );

        if ( !validPassword ) {
            res.status( 400 ).json( {
                ok: false,
                msg: 'Invalid user or password.'
            } );
            return;
        }

        //Generar JWT
        const token = await generateJWT( userLogged._id.toString(), userLogged.user, userLogged.user_email, userLogged.user_type );

        res.status( 200 ).json( {
            ok: true,
            uid: userLogged._id.toString(),
            email: userLogged.user_email,
            name: userLogged.user_name,
            user: userLogged.user,
            token,
            msg: 'Access granted'
        } );

    } catch ( error ) {
        console.log( 'Error login user', error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Please reach out to the administrator for support.'
        } );
    }
};

export const renewToken = async ( req: Token, res: Response ) => {

    const { uid, name, email, type } = req;

    //Generar JWT
    const token = await generateJWT( uid, name, email, type );

    res.json( {
        ok: true,
        msg: 'renew',
        token,
        uid,
        name,
        email
    } )
};