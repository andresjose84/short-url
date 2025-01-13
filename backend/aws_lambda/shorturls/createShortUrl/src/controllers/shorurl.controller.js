const ShortUrl = require( '../models/ShortUrl' );
const { responseData } = require( "../helpers/response" );
const generateUniqueShortHash = require( "../helpers/shorturl" );

const createShortUrl = async (data, uid) => {
    try {

        data.short_url = generateUniqueShortHash();
        data.created = new Date().getTime();
        data.modified = new Date().getTime();
        data.user_id = uid;
        data.status = true;

        const url = new ShortUrl( data );
        const newShorturl = await url.save();

        return responseData( 200,
            {
                ok: true,
                msg: 'Registration successful.',
                id: newShorturl._id,
                url: newShorturl.url,
                short_url: newShorturl.short_url
            },
            {
                'Content-Type': 'application/json'
            }
        );
    } catch ( error ) {
        console.log( "Error create ShortUrl", error );

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

module.exports = createShortUrl;