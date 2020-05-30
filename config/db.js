// use mongoose to connect to database
const mongoose = require('mongoose');
// bring in config
const config = require('config');
// init database 
const db = config.get('mongoURI');

// connect to database function
const connectDB = async () => {

  try {

    await mongoose.connect(db,{
      useNewUrlParser : true,
      useCreateIndex : true,
      useFindAndModify : false,
      useUnifiedTopology : true
    })

    console.log('mongodb connected with async')

  } catch (error) {

    console.error(error.message);
    process.exit(1);
  }
  
}

module.exports = connectDB ; 