import { Schema, model } from "mongoose";


const ClicksSchema = new Schema( {
    urls_id: {
        type: Schema.Types.ObjectId,
        ref: 'Urls',
        required: true
    },
    ip: {
        type: String
    },
    browser: {
        type: String
    },
    created: {
        type: Number,
        timestamps: true,
        required: true
    }
} );

const Clicks = model( 'Clicks', ClicksSchema );

// Clicks.watch().on( 'change', change => {
//     console.log( 'Watching for', change );
// } )

export default Clicks;