const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trimmed: true
    },
    email: { 
      type: String,
      required: true,
      unique: true
  },
  thoughts: [
      {
        type: Schema.Types._id,
        ref: 'Thought',
      },
    ],
    friends: [
      {
       // type: Schema.Types_id,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('user',userSchema);

module.exports = User;
