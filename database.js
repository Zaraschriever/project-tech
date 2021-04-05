// const { connect } = require('mongodb');
// const mongoose = require('mongoose');

// // database connection
// const uri = process.env.MONGO_URI;
// mongoose.Promise = global.Promise;
// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log('Database verbinding is gelukt!'))
//   .catch((err) => console.error(err)); 

// module.exports = mongoose.connect;