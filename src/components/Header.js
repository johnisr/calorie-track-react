import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { defaultLog, addLog } from '../actions/logs';
import { addCurrentEditLog } from '../actions/currentLog';
import { startLogout } from '../actions/auth';


export class Header extends React.Component {
  handleEdit = () => {
    const today = moment().startOf('day').valueOf();
    const log = this.props.logs.filter(log => log.date === today)[0];
    if (!log) {
      const todayLog = {
        ...defaultLog,
        date: today,
      };
      this.props.addLog(todayLog);
      this.props.addCurrentEditLog(todayLog);
    } else {
      this.props.addCurrentEditLog(log);
    }
    this.props.history.push('/editlog');
    
  }
  render() {
    return (
      <header>
        <h1>Calorie-Track</h1>
        <NavLink to='/FoodDashboard' >Food dashboard</NavLink>
        <NavLink to='/LogDashboard' >Log dashboard</NavLink>
        <button onClick={this.handleEdit}>Today's Food Log</button>
        <button onClick={this.props.startLogout}>Logout</button>
      </header>
    );
  };
}

const mapStateToProps = (state) => ({
  logs: state.logs,
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  addLog: (log) => dispatch(addLog(log)),
  addCurrentEditLog: (log) => dispatch(addCurrentEditLog(log)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);