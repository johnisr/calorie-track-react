import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { defaultLog, startAddLog } from '../../actions/logs';
import { addCurrentEditLog } from '../../actions/currentLog';
import { startLogout } from '../../actions/auth';

import './Header.css';


export class Header extends React.Component {
  handleEdit = () => {
    const today = moment().startOf('day').valueOf();
    const log = this.props.logs.filter(log => log.date === today)[0];
    if (!log) {
      const todayLog = {
        ...defaultLog,
        date: today,
      };
      this.props.startAddLog(todayLog);
      this.props.addCurrentEditLog(todayLog);
    } else {
      this.props.addCurrentEditLog(log);
    }
    this.props.history.push('/editlog');
    
  }
  render() {
    return (
      <header className="header">
        <h1 className="heading-primary header__title">Calorie-Track</h1>
        <NavLink className="btn" to='/Foods' >Foods</NavLink>
        <NavLink className="btn" to='/Logs' >Logs</NavLink>
        <NavLink className="btn" to='/info' >Info</NavLink>
        <button className="btn" onClick={this.handleEdit}>Today</button>
        <button className="btn flex-right-end" onClick={this.props.startLogout}>Logout</button>
      </header>
    );
  };
}

const mapStateToProps = (state) => ({
  logs: state.logs,
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  startAddLog: (log) => dispatch(startAddLog(log)),
  addCurrentEditLog: (log) => dispatch(addCurrentEditLog(log)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);