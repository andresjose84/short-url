const bcrypt = require( 'bcryptjs' );

const ShortUrl = require( "../models/ShortUrl" );
const Users = require( "../models/User" );

const initSeed = require( '../data/init' );
const generateUniqueShortHash = require( '../helpers/shorturl' );
const { responseData } = require( '../helpers/response' );

const loadData = async event => {
    console.log( 'Loading data...' );

    try {

        //console.log( 'initSeed', initSeed );
        const arrData = [];

        initSeed.user.forEach( async user => {
            arrData.push( seedData( user, initSeed.urls ) );
        } );

        await Promise.all( arrData );

        console.log( 'Data loaded' );

        return responseData( 200,
            {
                ok: true,
                msg: 'Data loaded'
            },
            {
                'Content-Type': 'application/json'
            }
        );
    } catch ( error ) {
        console.log( 'Error loading seed data', error );

        return responseData( 501,
            {
                ok: false,
                msg: 'error loading seed data'
            },
            {
                'Content-Type': 'application/json'
            }
        );
    }
}

const seedData = async ( user, urls ) => {
    try {

        //console.log( 'initSeed', initSeed );

        const userInit = await Users.findOne( { user_email: user.user_email } ).catch( error => {
            console.log( 'Error loading user', error );
        } );

        if ( userInit ) {
            console.log( 'User already exists' );
            return true;
        }

        const salt = bcrypt.genSaltSync( 10 );
        user.user_password = bcrypt.hashSync( user.user_password, salt );
        user.created = new Date().getTime();
        user.modified = new Date().getTime();

        const newUser = new Users( user );

        await newUser.save().catch( error => {
            console.log( 'Error loading user', error );
        } );

        const newUrl = new ShortUrl( {
            url: urls + newUser.user_name,
            short_url: generateUniqueShortHash(),
            name_url: newUser.user_name + ' Example',
            user_id: newUser._id,
            created: new Date().getTime(),
            modified: new Date().getTime(),
            status: true
        } );
        await newUrl.save();

        return true;
    } catch ( error ) {
        console.log( 'Error loading seed data', error );
        return error;
    }
};

module.exports = loadData;