const { Schema, model } = require('mongoose');
const dateFormat = require('../');

const UserSchema = new Schema (
    {
        email: {
            type: String,
            required: true, 
            unique: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/, 'Please enter email']
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;

