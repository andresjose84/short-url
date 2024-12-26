import { Schema, model } from "mongoose";


const UsersSchema = new Schema( {
    user: {
        type: String,
        required: true,
        unique: true
    },
    user_image: {
        type: String,
        required: false
    },
    user_name: {
        type: String,
        required: true
    },
    user_last_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
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
    user_type: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
} );

const Users = model( 'Users', UsersSchema );

// Users.watch().on( 'change', change => {
//     console.log( 'Watching for', change );
// } )

export default Users;