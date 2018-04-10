import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../../actions/auth';
import './LoginPage.css';


export const LoginPage = ({ startLogin }) => (
  <div className="LoginPage">
    <div className="LoginPage__box">
      <h1 className="LoginPage__title">Calorie-Track</h1>      
      <button className="btn LoginPage__btn" onClick={startLogin}>Login</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
})

export default connect(undefined, mapDispatchToProps)(LoginPage);