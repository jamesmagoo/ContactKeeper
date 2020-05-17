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
// NOTE: two middleware function brought in here, auth & validator 
router.post('/', 
auth, 
[
  // validation using express-validator (3rd parameter to post method) setting checks only
  // user name validation
  check('name', 'Name Required').not().isEmpty(),
  // email validation
  check('email','Please ensure valid email').isEmail()
],
async (req, res)=>{
  // send any validation results errors
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    // send a 400 and error msg
    return res.status(400).json(errors)

  } 

  // pull out data from body
  const { name, phone, email, type } = req.body

  // open try-catch to create a new instance of a Contact mongodb model document 
  try {
    const newContact = new Contact({
      name : name,
      email : email,
      phone : phone,
      type : type,
      user : req.user.id
    })

    // save newContact to database 
    const contact = await newContact.save();
    // return contact to user
    res.json(contact);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg : 'Server error writing contact'});
  }
})



// @route     PUT 'api/contacts/:id'
// @desc      Update contact
// @access    Private
router.put('/:id', auth, async (req, res)=>{
  // pull out data from request 
  const { name, email, type, phone} = req.body

  // make a new object to seevwhich fields are empty/full
  const contactEdit = {}
  if(name) contactEdit.name = name;
  if(email) contactEdit.email = email;
  if(type) contactEdit.type = type;
  if(phone) contactEdit.phone = phone;

  try {
    // search the database for the contact being edited by using the id parameter of the url
    let contact = await Contact.findById(req.params.id);

    if(!contact) res.status(400).json({ msg : 'Contact Not Found'});

    // check that user own contact. NOTE: the request user id is in String format while the contact document id is not. To compare - make the same
    if(contact.user.toString() !== req.user.id){
      return res.status(401).json({ msg : 'Not Authorised - User not valid'})
    }

    // if all ok, find contact by id in database, update, and return to user.
    // see mongoose docs for options parameter explanations
    // '$set' is a mongodb field update operator
    contact = await Contact.findByIdAndUpdate(req.params.id, { $set : contactEdit }, { new : true });
    // respond with updated contact
    res.json(contact);

  } catch (error) {

    console.log(error.message);
    res.status(500).json({ msg : 'Server error updating contact'});
  }

})

// @route     DELETE 'api/contacts/:id'
// @desc      Delete contact
// @access    Private
router.delete('/:id', auth, async (req, res)=>{
  
  try {
    // search the database for the contact being delete by using the id parameter of the url
    let contact = await Contact.findById(req.params.id);

    if(!contact) res.status(400).json({ msg : 'Contact Not Found'});

    // check that user own contact. NOTE: the request user id is in String format while the contact document id is not. To compare - make the same
    if(contact.user.toString() !== req.user.id){
      return res.status(401).json({ msg : 'Not Authorised - User not valid'})
    }

    // if all ok, find contact by id in database, delete, and return to msg user.
    // see mongoose docs for options parameter explanations
    // '$set' is a mongodb field update operator
    // note do not use findByIdAndRemove as it is depracated
    await Contact.findByIdAndRemove(req.params.id);

    res.json({msg: 'Contact Deleted'});

  } catch (error) {

    console.log(error.message);
    res.status(500).json({ msg : 'Server error updating contact'});
  }
})



module.exports = router