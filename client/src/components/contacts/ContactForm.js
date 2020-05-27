import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {

  // initialise context
  const contactContext = useContext(ContactContext);

  /*As this is a component with a form, component level state is needed */
  const [contact, setContact] = useState({
    name : '',
    email : '',
    phone : '',
    type : 'personal'
  });

  // destructure
  const {name, email, phone, type} = contact ;

  // onChange method
  const onChange = (e) => {setContact( {...contact, [e.target.name] : e.target.value } )};

  // onSubmit method calls 'addContact' action in context

  const onSubmit = (e) => {

    e.preventDefault();

    // call action in context
    contactContext.addContact(contact);

    // re-set input fields
    setContact({
    name : '',
    email : '',
    phone : '',
    type : 'personal'
    })
  }

  return (
    <form onSubmit={onSubmit}> 
      <input
      type ="text"
      placeholder ="Name"
      name = "name"
      value = {name}
      onChange = {onChange}
      />
      <input
      type ="email"
      placeholder ="Email"
      name = "email"
      value = {email}
      onChange = {onChange}
      />
      <input
      type ="text"
      placeholder ="Phone"
      name = "phone"
      value = {phone}
      onChange = {onChange}
      />
      <h5>Contact Type</h5>
      <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange = {onChange}/> Personal{'  '}
      <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange = {onChange}/> Professional{'  '}
      <div>
        <input type="submit" value="Add Contact" className="btn btn-primary btn-block"/>
      </div>
    </form>
  )
}

export default ContactForm ; 