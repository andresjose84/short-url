
const Users = require( "../models/User" );
const { responseData } = require( "../helpers/response" );

const listUsers = async user_id => {
    try {
        const query = {};

        if ( user_id ) {
            query[ '_id' ] = user_id;
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

        return responseData( 200,
            {
                ok: true,
                msg: 'List of users',
                listUsers
            },
            {
                'Content-Type': 'application/json'
            }
        );


    } catch ( error ) {
        console.log( 'Error loading user data', error );

        return responseData( 501,
            {
                ok: false,
                msg: 'error loading user data'
            },
            {
                'Content-Type': 'application/json'
            }
        );
    }
};

module.exports = listUsers;