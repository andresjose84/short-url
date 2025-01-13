const bcrypt = require( 'bcryptjs' );

const Users = require( "../models/User" );
const { responseData } = require( "../helpers/response" );

const updateUser = async ( user_id, userNew ) => {

    // console.log( "updateUser", body );

    if ( !user_id ) {
        return responseData( 400, "Invalid request" );
    }

    if ( !userNew ) {
        return responseData( 400, "Invalid request" );
    }

    try {

        const user = await Users.findById( user_id );

        if ( !user ) {
            return responseData( 400, {
                ok: false,
                msg: 'User not found.'
            },
            {
                'Content-Type': 'application/json'
            } );
        }

        const salt = bcrypt.genSaltSync( 10 );
        user.user_password = userNew.user_password ? bcrypt.hashSync( userNew.user_password, salt ) : user.user_password;
        user.modified = new Date().getTime();
        user.user_name = userNew.user_name;
        user.user_last_name = userNew.user_last_name;
        user.user_image = userNew.user_image;
        const userUpdated = await Users.findByIdAndUpdate( user_id, user, { new: true } );

        return responseData( 200,
            {
                ok: true,
                msg: 'User updated successfully.',
                user: userUpdated
            },
            {
                'Content-Type': 'application/json'
            }
        );

    } catch ( error ) {
        console.log( "Error update User", error );
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

module.exports = updateUser;