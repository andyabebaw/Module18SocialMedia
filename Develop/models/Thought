const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
    username: {
        type: String,
        required: true,
        unique: true,
        trimmed: true
      },
      reactions: [reactionsSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
