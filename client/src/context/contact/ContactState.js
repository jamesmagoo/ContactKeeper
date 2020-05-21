import React, {useReducer} from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext' ;
import contactReducer from './contactReducer';
import {
  DELETE_CONTACT,
  ADD_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';


const ContactState = props => {

  // create initial state
  const initialState = {
    contacts : [
      {
        id : 1,
        name: 'Jill Johnson',
        email : 'jj@mail.com',
        phone : '111-111-1111',
        type : 'professional'
      },
      {
        id : 2,
        name: 'Joe Johnson',
        email : 'joj@mail.com',
        phone : '111-111-1112',
        type : 'professional'
      },
      {
        id : 3,
        name: 'Phil Johnson',
        email : 'pj@mail.com',
        phone : '111-111-3333',
        type : 'personal'
      },
      {
        id : 4,
        name: 'Mick Jordan',
        email : 'mj@mail.com',
        phone : '111-111-6666',
        type : 'professional'
      }
    ]
  }

  /* INITIALISE REDUCER */
  const [state, dispatch] = useReducer(contactReducer, initialState)

  /* ACTIONS */

  // ADD CONTACT
  // DELETE CONTACT
  // SET CURRENT CONTACT
  // CLEAR CURRENT CONTACT
  // UPDATE CONTACT
  // FILTER CONTACTS
  // CLEAR FILTER

  /* RETURN PROVIDER FOR ACCESS TO STATE & ACTIONS */
  return(<ContactContext.Provider 
    value ={{
    contacts : state.contacts,
  }}
  >
    {props.children}
  </ContactContext.Provider>)

}

export default ContactState ;



