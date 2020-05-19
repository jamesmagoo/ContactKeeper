import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'


function App() {
  return (
    <Fragment>
      <Navbar />
      <h1>Hello World</h1>
    </Fragment>
  );
}

export default App;
