const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const Tweet = require('../models/tweet');
const moment = require('moment');
const methodOverride = require('method-override')

//set up express app
const app = express();
//connect to mongodb
mongoose.connect('mongodb://localhost/tweetapp', { useNewUrlParser: true })
mongoose.Promise = global.Promise;

const handlebars = exphbs.create({
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  defaultLayout: 'main',
  extname: 'handlebars',
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));

const m = moment().format('LLL');

// GET resources
app.get('/', (req, res) => {
  Tweet.find({}).sort({ timestamp: -1 }).then(function (tweets) {
    res.render('home', { tweets })
  });
});

// POST to create new resource
app.post('/', (req, res, next) => {
  Tweet.create(req.body).then(function (tweet) {
    res.send(tweet)
  }).catch(next)
  res.redirect('/')
});

// PUT update an existing resource with a given id
app.put('/:id', (req, res, next) => res.send({ type: 'PUT' }));

// DELETE to delete an existing resource with a given id
app.delete('/:id*?', (req, res, next) => {
  Tweet.findByIdAndRemove({ _id: req.params.id }).then(function (tweet) {
    res.send(tweet)
  }).catch(next)
  res.redirect('/')
});

//error handling middleware
app.use(function (err, req, res, next) {
  res.status(500).send({ error: err.message })
});

app.listen(port, () => console.log(`app listening on port ${port}`))



