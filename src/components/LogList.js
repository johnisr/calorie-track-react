import React from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import LogListItem from './LogListItem';
import { addCurrentEditLog } from '../actions/currentLog';
import { defaultLog, startAddLog } from '../actions/logs';
import selectLogsWithPages from '../selectors/logsWithPages';

export class LogList extends React.Component {
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
  calculateTotal(foods = [], macro) {
    if (macro === 'calories') {
      return foods.reduce((prev, curr) => prev + curr.calories, 0);
    } 
    else if (macro === 'fat') {
      return foods.reduce((prev, curr) => prev + curr.fat, 0);
    } else if (macro === 'protein') {
      return foods.reduce((prev, curr) => prev + curr.protein, 0);
    } else if (macro === 'carbohydrates') {
      return foods.reduce((prev, curr) => prev + curr.carbohydrates, 0);
    }
    return 0;
  }
  handleEdit = (date) => {
    const log = this.props.logs.filter(log => log.date === date)[0];
    this.props.addCurrentEditLog(log);
    this.props.history.push('/editlog');
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
  createTable = () => (
    this.props.logs.map((log, index) => (
      <div 
        key={`div ${log.date}`}
        className={index % 2 === 0 ? 
          "listDisplay__list-table" : 
          "listDisplay__list-table listDisplay__list-table--even"}
      >
        <LogListItem
          key={`item ${log.date}`}
          totalCalories={log.total.calories} 
          totalProtein={log.total.protein} 
          totalCarbohydrates={log.total.carbohydrates} 
          totalFat={log.total.fat} 
          {...log}
        />
        <button className="btn logList__btn" key={`button ${log.date}`} onClick={() => this.handleEdit(log.date)}>Edit</button>
      </div>
    ))
  )
  render() {
    return (
      <div>
        <div className="logList__header">
          <h1 className="heading-secondary logList__title">Log List</h1>
          <div className="logList__date">
            <SingleDatePicker
                  date={this.state.date}
                  onDateChange={this.onDateChange}
                  focused={this.state.calendarFocused}
                  onFocusChange={this.onFocusChange}
                  numberOfMonths={1}
                  isOutsideRange={() => false}
                />
            <button className="btn logList__btn" onClick={this.handleCreate}>Create</button>

          </div>

        </div>
        {
          this.props.logs.length === 0 ? (
            <p className="heading-secondary listDisplay__header">No logs</p>
          ) : (
            <div>
              <div className="listDisplay__list">
                <div className="listDisplay__list-header">
                  <p className="listDisplay__list-title">Date</p>
                  <p className="listDisplay__list-title">Weight</p>
                  <p className="listDisplay__list-title">carbs</p>
                  <p className="listDisplay__list-title">protein</p>
                  <p className="listDisplay__list-title">fat</p>
                  <p className="listDisplay__list-title">calories</p>
                </div>
                {this.createTable()}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}  

const mapStateToProps = (state) => ({
  logs: selectLogsWithPages(state.logs, state.logsFilters),
});

const mapDispatchToProps = (dispatch) => ({
  startAddLog: (log) => dispatch(startAddLog(log)),
  addCurrentEditLog: (log) => dispatch(addCurrentEditLog(log)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogList);
