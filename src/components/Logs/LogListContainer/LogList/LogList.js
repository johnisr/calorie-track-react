import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import './LogList.css';

class LogList extends React.Component {
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

  render () {
    const listHeader = (
      <div className="logList__list-header">
        <p className="logList__list-title">Date</p>
        <p className="logList__list-title">Weight</p>
        <p className="logList__list-title">carbs</p>
        <p className="logList__list-title">protein</p>
        <p className="logList__list-title">fat</p>
        <p className="logList__list-title">calories</p>
      </div>
    );

    const createTable = () => (
      this.props.logs.map((log, index) => (
        <div 
          key={`div ${log.date}`}
          className={index % 2 === 0 ? 
            "logList__list-table" : 
            "logList__list-table logList__list-table--even"}
        >
          <div className="logList__item">
            <p className="logList__item-text">{moment(log.date).format('MMMM Do, YYYY')}</p>
            <p className="logList__item-text">{log.weight} {log.unit}</p>
            <p className="logList__item-text">{log.total.carbohydrates}</p>
            <p className="logList__item-text">{log.total.protein}</p>
            <p className="logList__item-text">{log.total.fat}</p>
            <p className="logList__item-text">{log.total.calories}</p>
          </div>
          <button className="btn logList__btn" key={`button ${log.date}`} onClick={() => this.props.onEdit(log.date)}>Edit</button>
        </div>
      ))
    );

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
            <button className="btn logList__btn" onClick={() => this.props.onCreate(this.state.date)}>Create</button>
          </div>
        </div>
        {
          this.props.logs.length === 0 ? (
            <p className="heading-secondary logList__header">No logs</p>
          ) : (
            <div>
              <div className="logList__list">
                {listHeader}
                {createTable()}
              </div>
            </div>
          )
        }
      </div>
    );
  }
};

export default LogList;