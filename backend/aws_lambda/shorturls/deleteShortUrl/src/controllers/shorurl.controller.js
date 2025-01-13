const ShortUrl = require( '../models/ShortUrl' );
const { responseData } = require( "../helpers/response" );

const deleteShortUrl = async ( shortId, user ) => {
    try {
        const shortUrlToDelete = await ShortUrl.findById( { _id: shortId, user_id: user.uid } );
        if ( !shortUrlToDelete ) {
            return responseData( 400,
                {
                    ok: true,
                    msg: 'URL not found.'
                },
                {
                    'Content-Type': 'application/json'
                }
            );
        }

        shortUrlToDelete.status = false;
        await ShortUrl.findByIdAndUpdate( { _id: shortId }, shortUrlToDelete, { new: true } );

        return responseData( 200,
            {
                ok: true,
                msg: 'URL deleted successfully.'
            },
            {
                'Content-Type': 'application/json'
            }
        );
    } catch ( error ) {

        console.log( "Error delete ShortUrl", error );

        return responseData( 500,
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

module.exports = deleteShortUrl;