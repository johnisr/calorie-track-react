import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header>
    <h1>Boilerplate</h1>
    <NavLink to='/dashboard' >dashboard</NavLink>
    <NavLink to='/about' >About</NavLink>
    <NavLink to='/topics' >Topics</NavLink>
    <NavLink to='/createFood' >Add Food</NavLink>
    <NavLink to='/count' >Count</NavLink>
    <button onClick={startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);