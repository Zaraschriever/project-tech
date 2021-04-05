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
    // const firstUser = allUsers[0];
    const dogs = allUsers[Math.floor(Math.random() * allUsers.length)];
    const userID = allUsers[Math.floor(Math.random() * allUsers.length)]._id;
    res.render('index', { title: 'Home Page', dogs, userID,});
  }
  catch (error) {
    console.log(error);
    res.redirect('/nomoredogs');
  }
  });

app.get('/match', async (req, res) => {
  try {
    res.render('match', { title: 'Home Page',});
  }
  catch (error) {
    console.log(error);
  }
  });

   

// matches / show liked dogs
app.get('/matches', async (req, res) => {
  try {
    const likedDogs = await findAllLikedDogs();
    if (likedDogs.length === 0) {
      throw new Error('Required');
    }
    res.render('matches', {
      style: 'index.css',
      likedDogs,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/nomatches');
  }
})

// dislike
// app.post('/dislike', (req, res) => {
//     unlike(req.body.id);
//     res.redirect('/');
//   }) 
  
  app.post('/dislike', (req, res) => {
    console.log(req.body);
    DogModel
      .findOneAndUpdate({ userID: req.body.userID }, { $set: { visited: true } })
      .then((data) => {
        res.redirect('/');
      });
  })

  app.post('/like', (req, res, liked, likedYou) => {
    console.log(req.body);
    DogModel
      .findOneAndUpdate({ userID: req.body.userID }, { $set: { liked: true } })
      .then((data) => {
        if (likedYou == true) {
          res.redirect('/match');
        }
        else {
          res.redirect('/');
        }
      });
  })


// rout 
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


// error page
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

async function findAllDogsNotVisited() {
  const data = await DogModel.find({ visited: false }).lean();
  return data;
  }
  
async function findAllLikedDogs() {
const data = await DogModel.find({ liked: true, likedYou: true }).lean();
console.log(data);
return data;
}


//port listen to 9020
app.listen(port, () => {
  console.log('Server is starting at port', port);
});