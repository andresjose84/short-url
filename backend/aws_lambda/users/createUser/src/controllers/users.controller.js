const bcrypt = require( 'bcryptjs' );

const Users = require( "../models/User" );
const { responseData } = require( "../helpers/response" );

const createUser = async body => {
    
    // console.log( "createUser", body );
    
    if ( !body ) {
        return responseData( 400, "Invalid request" );
    }

    const userNew = body;

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

        return responseData( 200,
            {
                ok: true,
                msg: 'Registration successful.',
                uid: user._id,
                user: user.user
            },
            {
                'Content-Type': 'application/json'
            }
        );
    } catch ( error ) {
        console.log( "Error createUser", error );

        return responseData( 501,
            {
                ok: false,
                msg: 'Please reach out to the administrator for support.'
            },
            {
                'Content-Type': 'application/json'
            }
        );
    }
};

module.exports = createUser;