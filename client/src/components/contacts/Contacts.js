import React, { useContext, Fragment } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';
import Spinner from '../layout/Spinner'; 

const Contacts = () => {

  // initialise contact context
  const contactContext = useContext(ContactContext);

  // destructure context values
  const { loading, contacts } = contactContext ;

  if(loading === true){
    return <Spinner/>
  }

  return (
    <Fragment>
      {contacts.map(contact =>(
        <ContactItem contact={contact} key={contact.id}/>
        ))}
    </Fragment>
  )
}

export default Contacts
