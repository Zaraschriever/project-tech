// let db = null;
// // function connectDB
// async function connectDB() {
//   // get URI from .env file
//   const uri = process.env.DB_URI;
//   // make connection to database
//   const options = { useUnifiedTopology: true };
//   const client = new MongoClient(uri, options);
//   await client.connect();
//   db = await client.db(process.env.DB_NAME);
// }
// connectDB()
//   .then(() => {
//     // if succesfull connections is made, show a message
//     console.log('We have a connection to Mongo!');
//   })
//   .catch((error) => {
//     // if connnection is unsuccesful, show errors
//     console.log(error);
//   });

// const MongoClient = require('mongodb');
// require('dotenv').config();

// const uri = process.env.ATLAS_URI;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     // await client.db('admin').command({ ping: 1 });
//     console.log('Connected successfully to server');
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// require('dotenv').config();

// const { MongoClient } = require('mongodb');

// const uri = process.env.ATLAS_URI;
// const client = new MongoClient(uri, { useUnifiedTopology: true });
// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db('admin').command({ ping: 1 });
//     console.log('Connected successfully to server');
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
