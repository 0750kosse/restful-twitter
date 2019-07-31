const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates tweet schema and model

const TweetSchema = new Schema({
  user: {
    type: String,
    required: [true, "UserName required"]
  },
  handle: {
    type: String,
  },
  timestamp: {
    type: String,
    default: false
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

