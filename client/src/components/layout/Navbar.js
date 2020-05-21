import React from 'react'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
>>>>>>> 5f3ab833b07db854385204c9022fc7900d60cfca

const Navbar = ( { title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
<<<<<<< HEAD
        <i className
        ={ icon } /> {title}
      </h1>
      <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      </ul>
=======
        <i src={ icon } /> {title}
      </h1>
>>>>>>> 5f3ab833b07db854385204c9022fc7900d60cfca
    </div>
  )
}

Navbar.propTypes = {
  title : PropTypes.string.isRequired,
  icon : PropTypes.string.isRequired,
}

Navbar.defaultProps = {
  title : 'ContactKeeper',
<<<<<<< HEAD
  icon : 'fab fa-angrycreative'
=======
  icon : 'fas fa-id-card-alt'
>>>>>>> 5f3ab833b07db854385204c9022fc7900d60cfca
}

export default Navbar ; 