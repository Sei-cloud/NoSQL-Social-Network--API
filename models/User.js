// importing schema and model from mongoose
const { Schema, model } = require('mongoose');

// defining the user schema
const userSchema = new Schema ({
    // defining the username attributes
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    // defining the email attributes and using regex to validate
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must be a valid email address'],
    },
    // nesting thoughts in user schema
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    // nesting friends in user schema
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});

// Setting up a virtual for users that returns the amount of friends they have
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Structuring our User model from our userSchema to format our user data
const User = model('User', userSchema);

// exporting our user model
module.exports = User;