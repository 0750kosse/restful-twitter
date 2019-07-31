const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const Tweet = require('../models/tweet');

//set up express app
const app = express();
//connect to mongodb
mongoose.connect('mongodb://localhost/tweetapp')
mongoose.Promise = global.Promise;

const handlebars = exphbs.create({
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  defaultLayout: 'main',
  extname: 'handlebars'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

// GET resources
app.get('/', (req, res) => res.send({ type: 'GET' }));

// POST to create new resource
app.post('/', (req, res) => {

  Tweet.create(req.body).then(function (tweet) {
    res.send(tweet);
  });
});

// PUT update an existing resource with a given id
app.put('/:id', (req, res) => res.send({ type: 'PUT' }));

// DELETE to delete an existing resource with a given id
app.delete('/:id', (req, res) => res.send({ type: 'DELETE' }));

app.listen(port, () => console.log(`app listening on port ${port}`))



