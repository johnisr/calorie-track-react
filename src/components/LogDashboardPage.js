import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import LogList from './LogList';
import LogListFilters from './LogListFilters';
import { addCurrentEditLog } from '../actions/currentLog';
import { defaultLog, startAddLog } from '../actions/logs';
import Header from '../components/Header';
import { history } from '../routers/AppRouter';

export class LogDashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarFocused: false,
      date: moment(),
    };
  }
  onDateChange = (date) => {
    if (date) {
      this.setState(() => ({ date }));
    }
  }
  onFocusChange = ({ focused }) => { 
    this.setState(() => ({ calendarFocused: focused }));
  }
  handleCreate = () => {
    const date = this.state.date.startOf('day').valueOf();
    const log = this.props.logs.filter(log => log.date === date)[0];
    if (!log) {
      const newLog = {
        ...defaultLog,
        date,
      };
      this.props.startAddLog(newLog);
      this.props.addCurrentEditLog(newLog);
    } else {
      this.props.addCurrentEditLog(log);
    }
    this.props.history.push('/editlog');
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <section className="section__full-start-end">
            <Header history={history}/>
          </section>
          <section className="section__center-start-end">
            <LogListFilters />
          </section>
          <section className="section__center-start-end">
            <SingleDatePicker
              date={this.state.date}
              onDateChange={this.onDateChange}
              focused={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
            <button onClick={this.handleCreate}>Create Log</button>
            <LogList history={this.props.history}/>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  logs: state.logs,
});

const mapDispatchToProps = (dispatch) => ({
  startAddLog: (log) => dispatch(startAddLog(log)),
  addCurrentEditLog: (log) => dispatch(addCurrentEditLog(log)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogDashboardPage);