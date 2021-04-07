const express = require('express');

const app = express();
const port = process.env.PORT || 9020;
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
  .connect(process.env.MONGO_URI || uri, {
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
    const dogs = allUsers[Math.floor(Math.random() * allUsers.length)];
    const userID = dogs._id;
    res.render('index', { title: 'Home Page', dogs, userID,});
  }
  catch (error) {
    console.log(error);
    res.redirect('/nomoredogs');
  }
  });

// dislike knop
app.post('/dislike', (req, res) => {
  console.log(req.body);
  DogModel
    .findOneAndUpdate({ _id: req.body.id }, { $set: { visited: true } })
    .then((data) => {
      res.redirect('/');
    });
})

// like knop
app.post('/like', (req, res) => {
  DogModel
    .findOneAndUpdate({ _id: req.body.id }, { $set: { liked: true, visited: true } })
    .then((data) => {
      console.log(data)
      res.redirect('/');   
    });
});

// when match show this page
app.get('/match', async (req, res) => {
  try {
    const allUsers = await findAllDogsNotVisited();
    const dogs = allUsers[Math.floor(Math.random() * allUsers.length)];
    res.render('match', { title: 'Home Page', dogs});
  }
  catch (error) {
    console.log(error);
  }
  });

// matches / show liked dogs
app.get('/matches', async (req, res) => {
  try {
    const likedDogs = await findAllMatches();
    const userID = likedDogs._id;
    if (likedDogs.length === 0) {
      throw new Error('Required');
    }
    res.render('matches', {
      likedDogs, userID,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/nomatches');
  }
})

// route to page when there are no matches
app.get('/nomatches', async (req, res) => {
  try {
    res.render('nomatches', { title: 'Home Page',});
  }
  catch (error) {
    console.log(error);
  }
  });  

// route to page if there are no more dogs to display
app.get('/nomoredogs', async (req, res) => {
  try {
    res.render('nomoredogs', { title: 'Home Page',});
  }
  catch (error) {
    console.log(error);
  }
  }); 

// delete user from matches
app.post('/delete', (req, res) =>  {
  DogModel
  .findOneAndUpdate({ userID: req.body.userID }, { $set: { liked: false } })
  .then((data) => {
    console.log(data);
    res.redirect('/matches');
  });
 });

// error page
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// function to find all dogs (nog niet gezien)
async function findAllDogsNotVisited() {
  const data = await DogModel.find({ visited: false }).lean();
  return data;
}

// function to find matches
async function findAllMatches() {
  const data = await DogModel.find({ liked: true, likedYou: true }).lean();
  console.log(data);
  return data;
}

if (process.env.NODE_ENV === 'production') {
  
}

//port listen to 9020
app.listen(port, () => {
  console.log('Server is starting at port', port);
});