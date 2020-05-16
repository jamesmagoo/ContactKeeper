const express = require('express'); 
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// bring in User & Contact database models
const User = require('../models/User')
const Contact = require('../models/Contact')

// @route     GET 'api/contacts'
// @desc      Get all users contacts
// @access    Private
router.get('/', auth, async (req, res) => {
  
  try {
    // search database and return users contacts
    const contacts = await Contact.find( { user: req.user.id }).sort({ date: -1 });
  
    res.json(contacts)

  } catch (err) {
    res.status(400).json({msg: 'Contacts not found'})
  }
})

// @route     POST 'api/contacts'
// @desc      add user to users contacts
// @access    Private
router.post('/', (req, res)=>{
  res.send('add contact')
})

// @route     PUT 'api/contacts/:id'
// @desc      Update contact
// @access    Private
router.put('/:id', (req, res)=>{
  res.send('update contact')
})

// @route     DELETE 'api/contacts/:id'
// @desc      Delete contact
// @access    Private
router.delete('/:id', (req, res)=>{
  res.send('delete contact')
})



module.exports = router