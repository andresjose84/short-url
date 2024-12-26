

import { Request, Response } from "express";

import ShortUrl from "../models/ShortUrl";
import { generateUniqueShortHash } from "../helpers/shorturl";
import { QueryObject } from "../interfaces/shorturl.interface";


export const getShortUrl = async ( req: Request, res: Response ) => {
    try {
        const { shortId } = req.params;
        const query: QueryObject = {
        };

        if ( shortId ) {
            query[ '_id' ] = shortId;
        }

        if ( req.user.type !== 1 ) {
            query.user_id = req.user.uid;
        }

        const urls = await ShortUrl.find( query );

        res.status( 200 ).json( urls );

    } catch ( error ) {
        console.log( "Error List ShortUrl", error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Please reach out to the administrator for support.'
        } );
    }
};

export const createShortUrl = async ( req: Request, res: Response ) => {
    try {
        const data = req.body;

        data.short_url = generateUniqueShortHash();
        data.created = new Date().getTime();
        data.modified = new Date().getTime();
        data.user_id = req.user.uid;
        data.status = true;

        const url = new ShortUrl( data );
        const newShorturl = await url.save();

        res.status( 200 ).json( {
            ok: true,
            msg: 'Registration successful.',
            id: newShorturl._id,
            url: newShorturl.url,
            short_url: newShorturl.short_url
        } );
    } catch ( error ) {
        console.log( "Error create ShortUrl", error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Please reach out to the administrator for support.'
        } );
    }
};

export const updateShortUrl = async ( req: Request, res: Response ) => {
    try {
        const { shortId } = req.params;
        const data = req.body;

        const shortFound = await ShortUrl.findById( shortId );

        if ( !shortFound ) {
            res.status( 400 ).json( {
                ok: false,
                msg: 'URL not found.'
            } );
            return;
        }

        shortFound.modified = new Date().getTime();
        shortFound.url = data.url;
        shortFound.short_url = data.short_url;
        shortFound.name_url = data.name;

        const updatedUrl = await ShortUrl.findByIdAndUpdate( { _id: shortId }, shortFound, { new: true } );

        if ( !updatedUrl ) {
            res.status( 400 ).json( {
                ok: false,
                msg: 'URL not found.'
            } );
            return;
        }

        res.status( 200 ).json( {
            ok: true,
            msg: 'Url updated successfully.',
        } );
    } catch ( error ) {
        console.log( "Error update Shorturl", error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Please reach out to the administrator for support.'
        } );
    }
};
export const deleteShortUrl = async ( req: Request, res: Response ) => {
    try {
        const { shortId } = req.params;

        const shortUrlToDelete = await ShortUrl.findById( shortId );
        if ( !shortUrlToDelete ) {
            res.status( 400 ).json( {
                ok: false,
                msg: 'URL not found.'
            } );
            return;
        }

        shortUrlToDelete.status = false;
        await ShortUrl.findByIdAndUpdate( { _id: shortId }, shortUrlToDelete, { new: true } );

        res.status( 200 ).json( {
            ok: true,
            msg: 'URL deleted successfully.'
        } );
    } catch ( error ) {
        console.log( "Error delete ShortUrl", error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Please reach out to the administrator for support.'
        } );
    }
};

