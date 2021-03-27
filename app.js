const express = require('express');

const slug = require('slug');

const app = express();
// const expbs = require('express-handlebars');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');

const { MongoClient } = require('mongodb');

const port = 9020;

require('dotenv').config();

let db = null;

async function connectDB() {
  try {
    // get URI form env file
    const uri =
      'mongodb+srv://dbZara:Joepie1805@cluster0.cgla0.mongodb.net/matchingapplication?retryWrites=true&w=majority';
    // make connection to DB
    const options = { useUnifiedTopology: true };
    const client = new MongoClient(uri, options);
    await client.connect();
    db = await client.db(process.env.DB_NAME);
    console.log('verbinding is gelukt');
  } catch (error) {
    console.log(error);
  }
}

connectDB();

app.use('/static', express.static(path.join(__dirname, 'public')));
// app.engine('handlebars', expbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// homepage
app.get('/', async (req, res) => {
  const users = await db.collection('users').find();
  console.log(users);
  res.render('index', { title: 'Home Page', data: users });
});

app.get('/matches', (req, res) => {
  res.render('matches', { title: 'matches' });
});

app.get('/match', (req, res) => {
  res.render('match', { title: 'match' });
});

app.listen(port, () => {
  console.log('Server is starting at port', port);
});

// profiel pagina

// 404 page
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// // schema
// const { Schema } = mongoose;
// const BlogPostSchema = new Schema({
//   title: String,
//   body: String,
//   date: {
//     type: String,
//     default: Date.now(),
//   },
// });

// model
// const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// const data = {
//   title: 'hello world',
//   body: 'dhcbhs haxvhdvhsx hxhvg',
// };

// const newBlogPost = new BlogPost(data);
