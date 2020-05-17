const express = require('express'); 
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// bring in User database model
const User = require('../models/User')

// Routes

// @route     POST 'api/users'
// @desc      Register a user
// @access    Public
router.post('/', [
  // validation using express-validator (2nd parameter to post method) setting checks only
  // user name validation
  check('name', 'Please enter your name').not().isEmpty(),
  // email validation
  check('email','Please inlcude a valid email').isEmail(),
  // phone validation
  check('phone','Password must be greater than 6 characters').isLength({min : 6}),
],
async (req, res)=>{
  // send any validation results errors
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    // send a 400 and error msg
    return res.status(400).json(errors)

  } else {
    // destructure to pull data out of request body
    const {name , email, password} = req.body ;

    
    try {
      // check if there is a user with same email already and return error if so
      let user = await User.findOne({ email : email} );

      if(user){
        return res.status(400).json({msg: 'User already exists'})
      }

      // create a new user instance using User model
      user = new User({
        name,
        email,
        password
      })

      // encrypt password using bcrypt
      // generate salt
      const salt = await bcrypt.genSalt(10);

      // hash password using salt
      user.password = await bcrypt.hash(password, salt) ;

      console.log(user);
      console.log('user saved');

      // save user to database
      await user.save() ; 

      // send back a json web token (JWT)
      // init payload
      const payload = {
        user : {
          id: user.id
        }
      }

      // sign the payload and return jwt
      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn : 360000, // change this for production
      }, (err, token) => {
        if(err) throw err;
        res.json({ token })
      } )

    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }

  }

  
})


module.exports = router
