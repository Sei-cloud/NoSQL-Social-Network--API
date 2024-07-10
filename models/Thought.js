const { Schema, model, Types } = require('mongoose');

// Reaction schema
const reactionSchema = new Schema({
  // Defining Id
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  // Defining body attributes
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  // Defining username 
  username: {
    type: String,
    required: true
  },
  // Defining a timestamp
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleDateString()
  }
},
{
  toJSON: {
    getters: true
  },
  id: false
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleDateString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
