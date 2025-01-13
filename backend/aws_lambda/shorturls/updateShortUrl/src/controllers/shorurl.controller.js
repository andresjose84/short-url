const ShortUrl = require( '../models/ShortUrl' );
const { responseData } = require( "../helpers/response" );

const updateShortUrl = async ( data, shortId, uid ) => {
    try {

        const shortFound = await ShortUrl.findById( { _id: shortId, user_id: uid } );

        if ( !shortFound ) {
            return responseData( 400,
                {
                    ok: false,
                    msg: 'URL not found.'
                },
                {
                    'Content-Type': 'application/json'
                }
            );
        }

        shortFound.modified = new Date().getTime();
        shortFound.url = data.url;
        shortFound.short_url = data.short_url;
        shortFound.name_url = data.name;

        const updatedUrl = await ShortUrl.findByIdAndUpdate( { _id: shortId }, shortFound, { new: true } );

        if ( !updatedUrl ) {
            return responseData( 400,
                {
                    ok: false,
                    msg: 'URL not found.'
                },
                {
                    'Content-Type': 'application/json'
                }
            );
        }

        return responseData( 200,
            {
                ok: true,
                msg: 'Url updated successfully.',
                newShorturl
            },
            {
                'Content-Type': 'application/json'
            }
        );
    } catch ( error ) {

        console.log( "Error update ShortUrl", error );

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

module.exports = updateShortUrl;