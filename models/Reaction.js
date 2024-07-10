// Importing schema and types from mongoose
const { Schema, Types } = require('mongoose');
// importing date formatter
const dateFormat = require('../utils/dateFormat');

// Defining the reaction schema
const reactionSchema = new Schema(
    {
        // Using mongoose's object ID function to assign each reaction an ID
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        // Defining the reaction body's attributes
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        // connecting with a user
        username: {
            type: String,
            required: true,
        },
        // attributing a timestamp and formatting it
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
    }, {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// exporting our reaction schema
module.exports = reactionSchema;