


import { Request, Response } from "express";

import ShortUrl from "../models/ShortUrl";
import Clicks from "../models/Clicks";

export const getUrlShorter = async ( req: Request, res: Response ) => {
    try {
        const { shorturi } = req.params;
        console.log( { shorturi } );

        const shorturl = await ShortUrl.findOne( { short_url: shorturi } );

        if ( !shorturl ) {
            res.status( 404 ).json( { error: "URL not found" } );
            return;
        }

        const forwardedIp = req.headers[ 'x-forwarded-for' ] as string;

        const ip = forwardedIp ? forwardedIp.split( ',' )[ 0 ].trim() : req.headers.ip;

        console.log( `User IP: ${ ip }` );

        const click = new Clicks( {
            urls_id: shorturl._id,
            ip: ip,
            browser: req.headers[ 'user-agent' ],
            created: new Date().getTime()
        } );

        click.save();

        res.status( 301 ).redirect( shorturl.url );
    } catch ( error ) {
        console.log( error );
        res.status( 400 ).json( { error: "Unexpected error" } );
    }
};