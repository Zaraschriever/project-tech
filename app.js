const express = require('express');

const app = express();
const port = 9020;
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const urlencodedParser = bodyParser.urlencoded({ extended: true }); 
const mongoose = require('mongoose');
const DogModel = require('./models/DogModel');
require('dotenv').config();

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(urlencodedParser)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// database connection
const uri = process.env.MONGO_URI;
mongoose.Promise = global.Promise;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database verbinding is gelukt!'))
  .catch((err) => console.error(err)); 


//homepage / show all dogs

app.get('/', async (req, res) => {
  try {
    const allUsers = await findAllDogsNotVisited();
    const firstUser = allUsers[0];
    const userID = allUsers[0].id;
    res.render('index', { title: 'Home Page', firstUser, userID, });
  }
  catch (error) {
    console.log(error);
  }
  });

app.get('/match', async (req, res) => {
  try {
    res.render('match', { title: 'Home Page'});
  }
  catch (error) {
    console.log(error);
  }
  });

// matches / show liked dogs
app.get('/matches', async (req, res) => {
  try {
    const likedDogs = await findAllLikedDogs();
    if (likedDogs.length === 3) {
      throw new Error('Required');
    }
    res.render('matches', {
      style: 'index.css',
      likedDogs,
    });
  } catch (error) {
    console.log(error);
  }
})

// dislike
app.post('/dislike', (req, res) => {
    unlike(req.body.id);
    res.redirect('/');
  })  

// like
app.post('/like', (req, res) => {
    likedAndVisitedToTrue(req.body.id, req.body.liked);
    res.redirect('/');
    console.log(req.body.liked)
  })

// dislike
function unlike(userID) {
  DogModel
    .findOneAndUpdate({ id: userID }, { $set: { liked: false } })
    .then((data) => {
      console.log(data);
      });
}  

// like
function likedAndVisitedToTrue(id, liked) {
  DogModel
    .findOneAndUpdate({ id }, { $set: { liked, visited: true } })
    .then((data) => {
      console.log(data);
    });
  console.log(liked)  
}


async function findAllDogsNotVisited() {
    const data = await DogModel.find({ visited: false }).lean();
    return data;
    }
    
async function findAllLikedDogs() {
  const data = await DogModel.find({ liked: true }).lean();
  console.log(data);
  return data;
  }

// 404 page
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log('Server is starting at port', port);
});