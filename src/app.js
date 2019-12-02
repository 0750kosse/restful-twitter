const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const moment = require('moment');
const methodOverride = require('method-override')

//set up express app
const app = express();
const router = require('./routes')
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
app.use(router);

const m = moment().format('LLL');

//error handling middleware
app.use(function (err, req, res, next) {
  res.status(500).send({ error: err.message })
});

app.listen(port, () => console.log(`app listening on port ${port}`))


