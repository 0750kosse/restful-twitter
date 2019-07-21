const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();
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


app.locals = {
  tweets: [
    {
      id: '_7qrn7fdfs',
      text: "good morning",
      user: "Tweeter"
    },
    {
      id: '_jbkorcf3v',
      text: "good evening",
      user: "Broncano"
    },
  ]
};

// GET resources
app.get('/', (req, res) => res.render("home", { tweets: app.locals.tweets }));

// POST to create new resource
app.post('/', (req, res) => {
  const tweet = req.body;
  tweet.id = uniqueId();
  app.locals.tweets.unshift(tweet);
  res.redirect("/");
});

// PUT update an existing resource with a given id
app.put('/:id', (req, res) => {
  const idToUpdate = req.params.id;

  const foundIndex = app.locals.tweets.findIndex(tweet => tweet.id === idToUpdate);
  console.log('index inside Array is', foundIndex);

  const tweetToUpdate = app.locals.tweets[foundIndex]
  app.locals.tweets[foundIndex] = {
    id: tweetToUpdate.id,
    ...req.body
  }

  console.log('tweets updated', app.locals.tweets)
  res.send('this will be the update/replace action')
});

// DELETE to delete an existing resource with a given id
app.delete('/:id', (req, res) => {
  const idToDelete = req.params.id;
  app.locals.tweets = app.locals.tweets.filter(tweet => tweet.id != idToDelete)
  res.send(`deleted tweet ${idToDelete}`);
});

app.listen(port, () => console.log(`app listening on port ${port}`))

const uniqueId = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

