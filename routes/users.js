const express = require('express'); 
const { check, validationResult } = require('express-validator');
const router = express.Router();

// bring in user database model
const user = require('../models/Users')

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
  // password validation
  check('password','Password must be greater than 6 characters').isLength({min : 6}),
],
(req, res)=>{
  // send any validation results errors
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    // send a 400 
    return res.status(400).json( errors )
  } else {

    res.send('passed validation')
  }

  
})


module.exports = router
