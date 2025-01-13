const Users = require( "../models/User" );
const { responseData } = require( "../helpers/response" );

const deleteUser = async ( user_id ) => {

    // console.log( "deleteUser", user_id );

    if ( !user_id ) {
        return responseData( 400, "Invalid request" );
    }

    try {

        const user = await Users.findById( user_id );
        if ( !user ) {
            res.status( 400 ).json( {
                ok: false,
                msg: 'User not found.'
            },
                {
                    'Content-Type': 'application/json'
                } );
            return;
        }

        user.status = false;
        const userDeleted = await Users.findByIdAndUpdate( user_id, user, { new: true } );

        return responseData( 200,
            {
                ok: true,
                msg: 'User deleted successfully.',
                user: userDeleted
            },
            {
                'Content-Type': 'application/json'
            }
        );

    } catch ( error ) {
        console.log( "Error deleteUser", error );
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

module.exports = deleteUser;