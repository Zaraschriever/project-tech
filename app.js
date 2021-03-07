const express = require('express');

const app = express();
const port = 9020;
const path = require('path');
const expbs = require('express-handlebars');

const mongoose = require('mongoose');
const { schema } = require('./models/user.model');
require('dotenv').config();

const uri =
  'mongodb+srv://dbZara:Joepie1805@cluster0.cgla0.mongodb.net/matchingapplication?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;
mongoose
  .connect(uri)
  .then(() => console.log('DB connection succesfull'))
  .catch((err) => console.error(err));

// express
app.use('/static', express.static(path.join(__dirname, 'static/public')));
app.engine('handlebars', expbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

// schema
const { Schema } = mongoose;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

// model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

const data = {
  title: 'hello world',
  body: 'dhcbhs haxvhdvhsx hxhvg',
};

const newBlogPost = new BlogPost(data);

newBlogPost.save((error) => {
  if (error) {
    console.log('Oops, something happend');
  } else {
    console.log('Data has been saved!');
  }
});





// const createUser = mongoose.model('createUser', createUserSchema);


// db.createUser( {
//   user : "Joep",
//   pwd : "1234",
//   roles : ["readWrite", "dbAdmin"]
// });

// const createUser = new createUser(data);





// homepage
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/matches', (req, res) => {
  res.render('matches', { title: 'Matches' });
});

app.get('/match', (req, res) => {
  res.render('match', { title: 'Match' });
});

app.listen(port, () => {
  console.log('Server is starting at port', port);
});

// 404 page
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

