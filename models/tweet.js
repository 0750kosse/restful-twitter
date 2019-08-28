const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates tweet schema and model

const TweetSchema = new Schema({
  user: {
    type: String,
    default: 'My user'
  },
  handle: {
    type: String,
    default: '@TweeterHandle'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  link: {
    type: String
  },
  text: {
    type: String,
    required: [true, "Text required"]
  }
});

const Tweet = mongoose.model('tweet', TweetSchema);

module.exports = Tweet;

