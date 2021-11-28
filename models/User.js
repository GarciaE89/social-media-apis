const { Schema, model } = require('mongoose');


//user schema with mongoose
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    //email validation 
    type: String,
    match: [/.+@.+\..+/],
    required: true,
    unique: true,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},
  // virtuals
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

//total friends
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

//create User model
const User = model('User', UserSchema);


//export User model
module.exports = User;