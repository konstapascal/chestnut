import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';

import {AuthContext} from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {

  const auth = useContext(AuthContext);

  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>Users</NavLink>
    </li>
    {auth.isLoggedIn && (
    <li>
      <NavLink to="/1/keys">Keys</NavLink>
    </li>
    )}
    {auth.isLoggedIn && (
    <li>
      <NavLink to="/key/new">Generate key</NavLink>
    </li>
    )}
    <li>
      <NavLink to="/auth">Authentication</NavLink>
    </li>

  {auth.isLoggedIn && (
    <li>
      <button onClick={auth.logout}>Logout</button>
    </li>
  )}
  </ul>
};

export default NavLinks;
