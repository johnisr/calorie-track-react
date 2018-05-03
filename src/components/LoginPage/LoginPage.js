import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startDemo } from '../../actions/auth';
import './LoginPage.css';


export const LoginPage = ({ startLogin, startDemo }) => (
  <div className="LoginPage">
    <div className="LoginPage__box">
      <h1 className="LoginPage__title">Calorie-Track</h1>      
      <button className="btn LoginPage__btn" onClick={startLogin}>Login</button>
      <button className="btn LoginPage__btn" onClick={startDemo}>Demo</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  startDemo: () => dispatch(startDemo()),
})

export default connect(undefined, mapDispatchToProps)(LoginPage);