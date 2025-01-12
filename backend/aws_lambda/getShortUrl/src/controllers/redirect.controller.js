const ShortUrl = require( '../models/shortUrl' );
const Clicks = require( '../models/clicks' );
const { responseData, setResponse301 } = require( '../helpers/response' );

const getUrlShorter = async ( shorturi, headers ) => {
    try {

        const shorturl = await ShortUrl.findOne( { short_url: shorturi } );

        if ( !shorturl ) {
            return responseData( 400, "URL not found", { 'Content-Type': 'text/html' } );
        }

        const forwardedIp = headers[ 'x-forwarded-for' ];

        const ip = forwardedIp ? forwardedIp.split( ',' )[ 0 ].trim() : headers.ip ? headers.ip : headers.Ip;

        const click = new Clicks( {
            urls_id: shorturl._id,
            ip: ip,
            browser: headers[ 'user-agent' ],
            created: new Date().getTime()
        } );

        await click.save();

        return setResponse301( shorturl.url );
    } catch ( error ) {
        console.log( error );
        return responseData( 400, "Unexpected error", { 'Content-Type': 'text/html' } );
    }
};

module.exports = getUrlShorter;