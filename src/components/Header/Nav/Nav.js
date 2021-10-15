import React from 'react';
import Account from './Account/Account';
import './Nav.css';
import logo from '../../../images/logo-bg.png'
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/" className="brand">
            <img src={logo} alt="Learn with Sumit Logo" />
            <h3>Learn with Sumit</h3>
          </Link>
        </li>
      </ul>
      <Account></Account>
    </nav>
  );
};

export default Nav;