const express = require('express');
const router = express.Router();
const Tweet = require('../models/tweet');
var paths = require('./paths')

function getHome(req, res, next) {
  Tweet.find({}).sort({ timestamp: -1 }).then((tweets) => {
    res.render('home', { tweets })
  });
}

// POST to create new resource
function postTweet(req, res, next) {
  Tweet.create(req.body).then((tweet) => {
    res.redirect(paths.home)
  })
};

// PUT : update an existing resource with a given id, 
// it is achieved combining both a get & post request, 
//as shown below

function getTweetToUpdate(req, res, next) {
  Tweet.findById({ _id: req.params.id }).then((tweet) => {
    // get works !! tweet serves the tweet to be amended.
    res.render('updateTweet', { tweet })
  })
}

function postUpdatedTweet(req, res, next) {
  const updatedTweet = {
    user: req.body['user'],
    handle: req.body['handle'],
    text: req.body['text'],
    timestamp: req.body['timestamp']
  }
  Tweet.findByIdAndUpdate({ _id: req.params.id }, updatedTweet).then((tweet) => {
    //this posts updatedTweet, which is the updated tweet
    res.redirect(paths.home)
  })
}

// DELETE to delete an existing resource with a given id
function deleteTweet(req, res, next) {
  Tweet.findByIdAndDelete({ _id: req.params.id }).then((tweet) => {
    res.redirect('/')
  })
}

router.get(paths.home, getHome);
router.post(paths.home, postTweet);

router.delete(paths.deleteTweet + '/:id', deleteTweet);
router.get(paths.updateTweet + '/:id', getTweetToUpdate)
router.post(paths.updateTweet + '/:id', postUpdatedTweet)

module.exports = router;




