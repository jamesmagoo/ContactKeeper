const express = require('express'); 
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const auth = require('../middleware/auth');

// bring in User database model
const User = require('../models/User')

// @route     GET 'api/auth'
// @desc      Get authenticated logged in user
// @access    Private
router.get('/', auth, async (req, res)=>{
  // use user id from jwt token to find user and return from database
  try {
    // note using mongoose 2nd parameter option so the password is not returned by findById
    const user = await User.findById(req.user.id , '-password');
    res.json(user)
  } catch (err) {
    res.status(400).json({msg: 'user not found'})
  }
})

// @route     POST 'api/auth'
// @desc      Authenticate user & get token (jwt)
// @access    Public

router.post('/',[
  // validation using express-validator (2nd parameter to post method) setting checks only
  // email validation
  check('email','Email required').isEmail(),
  // password validation
  check('password','Password is required').exists(),
],
async (req, res)=>{
  // send any validation results errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    // send a 400 and error msg
    return res.status(400).json(errors)
  }

  const { email, password} = req.body;

  try {
    // check if there is a user with these credentials
    let user = await User.findOne({ email : email});

    if(!user){
      // if not return 400 & invalid msg
      return res.status(400).json({msg: 'Invalid Credentials'})
    }

    // continue to check that password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    
    // if the passwords do not match return 400 & msg
    if(!isMatch){ 
      res.status(400).json({msg: 'Invalid Password'})
    }

    // send back token to client
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
    console.log(error.message);
    res.status(500).send('server error')
  }
})


module.exports = router