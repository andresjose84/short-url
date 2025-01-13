const { Schema, model } = require( 'mongoose' );

const ShortUrlSchema = new Schema( {
    url: {
        type: String,
        required: true,
    },
    short_url: {
        type: String,
        required: true,
        unique: true
    },
    name_url:{
        type: String,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    created: {
        type: Number,
        timestamps: true,
        required: true
    },
    modified: {
        type: Number,
        timestamps: true,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
} );

const ShortUrl = model( 'Urls', ShortUrlSchema );

module.exports = ShortUrl;