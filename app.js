const express = require('express');

const app = express();
const expbs = require('express-handlebars');
const path = require('path');

const port = 9020;

const mongoose = require('mongoose');
require('dotenv').config();

const uri =
  'mongodb+srv://dbZara:Joepie1805@cluster0.cgla0.mongodb.net/matchingapplication?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;
mongoose
  .connect(uri)
  .then(() => console.log('DB connection succesfull'))
  .catch((err) => console.error(err));

app.use('/static', express.static(path.join(__dirname, 'public')));
app.engine('handlebars', expbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

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

app.listen(port, () => {
  console.log('Server is starting at port', port);
});

// profiel pagina

// 404 page
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// function buttonApp() {
//   console.log(ch);
// }

// const newLocal = 'myBtn';
// const ch = 'geklikt';
// document.getElementById(newLocal).addEventListener('click', buttonApp);
