import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
<<<<<<< HEAD
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/ContactState';
function App() {
  return (
    <ContactState>
    <Router>
    <Fragment>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
        </Switch>
      </div>
      
    </Fragment>
    </Router>
    </ContactState>
=======


function App() {
  return (
    <Fragment>
      <Navbar />
      <h1>Hello World</h1>
    </Fragment>
>>>>>>> 5f3ab833b07db854385204c9022fc7900d60cfca
  );
}

export default App;
