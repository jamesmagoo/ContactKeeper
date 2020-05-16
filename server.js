const express = require('express'); 
const connectDB = require('./config/db');
// initialise express
const app = express() ;

// connect to database
connectDB();

// IMPORTANT : init middleware for json body resposne
app.use(express.json({ extended : false }));

const PORT = process.env.PORT || 5000 ;

app.get('/', (req, res) => {
  res.json({ msg : 'Welcome to the Contact Keeper API'})
})

// define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts/', require('./routes/contacts'));

app.listen(PORT, ()=> {
`MY FIRST EXPRESS SERVER ON PORT ${PORT}`
})