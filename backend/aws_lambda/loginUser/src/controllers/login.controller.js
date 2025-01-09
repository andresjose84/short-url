const bcrypt = require( 'bcryptjs' );

const Users = require( '../models/User' );
const generateJWT = require( '../helpers/jwt' );
const { responseData } = require( "../helpers/response" );


const loginUser = async ( body, headers ) => {

    try {
        const { user, password } = body;

        console.log( {
            token: headers[ 'x-token' ],
            user, password
        } );

        let userLogged = await Users.findOne( { user_email : user } );
        console.log( { userLogged } );
        if ( !userLogged ) {
            return responseData( 404, {
                ok: false,
                msg: 'User not found.'
            }, { 'Content-Type': 'application/json' } );
        }

        if ( headers[ 'x-token' ] === 'granted' ) {

            if ( userLogged.user !== body.data.user || userLogged.user_email !== body.data.email || userLogged.user_type !== body.data.type ) {
                console.log( 'The token has been modified manually! watchout!' );

                return responseData( 500, {
                    ok: false,
                    msg: 'Please reach out to the administrator for support.'
                }, { 'Content-Type': 'application/json' } );
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
            return responseData( 400, {
                ok: false,
                msg: 'Invalid user or password.'
            }, { 'Content-Type': 'application/json' } );
        }

        //Generar JWT
        const token = await generateJWT( userLogged._id.toString(), userLogged.user, userLogged.user_email, userLogged.user_type );

        return responseData( 200, {
            ok: true,
            uid: userLogged._id.toString(),
            email: userLogged.user_email,
            name: userLogged.user_name,
            user: userLogged.user,
            token,
            msg: 'Access granted'
        }, { 'Content-Type': 'application/json' } );

    } catch ( error ) {
        console.log( 'Error login user', error );
        return responseData( 500, {
            ok: false,
            msg: 'Please reach out to the administrator for support.'
        }, { 'Content-Type': 'application/json' } );
    }
};

module.exports = loginUser;