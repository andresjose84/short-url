const ShortUrl = require( '../models/ShortUrl' );
const { responseData } = require( "../helpers/response" );

const listShortUrl = async (shortId, user) => {
    try {

        const query = {
        };

        if ( shortId ) {
            query[ '_id' ] = shortId;
        }

        if ( user.type !== 1 ) {
            query.user_id = req.user.uid;
        }

        const urls = await ShortUrl.find( query );

        return responseData( 200,
            {
                ok: true,
                msg: 'List of short urls',
                urls
            },
            {
                'Content-Type': 'application/json'
            }
        );
    } catch ( error ) {
        console.log( 'Error loading short url data', error );

        return responseData( 501,
            {
                ok: false,
                msg: 'error loading short url data'
            },
            {
                'Content-Type': 'application/json'
            }
        );

    }
};

module.exports = listShortUrl;