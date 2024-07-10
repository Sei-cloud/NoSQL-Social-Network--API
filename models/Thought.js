// Importing schema, model, and types from mongoose
const { Schema, model, Types } = require('mongoose');
// Importing date formatter from dateFormat.js
const dateFormat = require('../utils/dateFormat');

// Defining the reaction schema
const reactionSchema = new Schema({
    // gets its ID from mongoose's ObjectId
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    // defining the reaction content's attributes
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    // connecting to a user
    username: {
        type: String,
        required: true,
    },
    // defining date created using our date formatter
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp),
    },
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});

// defining the thought schema
const thoughtSchema = new Schema({
    // giving the thought content attributes
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    // giving it a timestamp and formatting it using our date formatter
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp),
    },
    // connecting to a user
    username: {
        type: String,
        required: true,
    },
    // connecting to its reactions
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
});

// Setting up a virtual for thoughts that returns the amount of reactions on a thought
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// making thought a model so that we can structure our thought data
const Thought = model('Thought', thoughtSchema);

// exporting our thought model
module.exports = Thought;