const express = require('express');
const router = express.Router();
const Tweet = require('../models/tweet');


router.get('/', (req, res) => {
  Tweet.find({}).sort({ timestamp: -1 }).then(function (tweets) {
    res.render('home', { tweets })
  });
});

// POST to create new resource
router.post('/', (req, res, next) => {
  Tweet.create(req.body).then(function (tweet) {
    res.send(tweet)
  }).catch(next)
  res.redirect('/')
});

// PUT update an existing resource with a given id
router.put('/:id', (req, res, next) => res.send({ type: 'PUT' }));

// DELETE to delete an existing resource with a given id
router.delete('/:id*?', (req, res, next) => {
  Tweet.findByIdAndRemove({ _id: req.params.id }).then(function (tweet) {
    res.send(tweet)
  }).catch(next)
  res.redirect('/')
});

module.exports = router;