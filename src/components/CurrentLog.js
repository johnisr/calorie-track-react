import React from 'react';
import { connect } from 'react-redux';
import { removeFoodFromCurrentLog, editCurrentEditLog, removeCurrentEditLog } from '../actions/currentLog';
import FoodListDisplayCurrentLog from './FoodListDisplayCurrentLog';
import { editLog } from '../actions/logs';

class CurrentLog extends React.Component {

  handleWeightChange = (e) => {
    const weight = e.target.value;
    this.props.editCurrentEditLog({ weight });
  }
  handleUnitChange = (e) => {
    const unit = e.target.value;
    this.props.editCurrentEditLog({ unit });
  };
  handleRemove = (food) => {
    this.props.removeFoodFromCurrentLog(food.index);
  };
  handleSubmit = () => {
    this.props.editLog(this.props.currentLog.date, this.props.currentLog);
    this.props.removeCurrentEditLog();
    this.props.history.push('/LogDashboard');
  }
  render() {
    return (
      <div>
        <div>
          <label className="text-input__label" htmlFor="weight">weight</label>
          <input 
            name="weight"
            className="text-input"
            type="text"
            placeholder="weight"
            value={this.props.currentLog.weight}
            onChange={this.handleWeightChange} 
          />
        </div>
        <div>
          <label className="text-input__label" htmlFor="unit">unit</label>
          <input 
            type="text"
            name="unit"
            placeholder="unit"
            className="text-input"
            value={this.props.currentLog.unit}
            onChange={this.handleUnitChange} 
          />
        </div>
        <div>
          <FoodListDisplayCurrentLog />
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  currentLog: state.currentLog,
});

const mapDispatchToProps = (dispatch) => ({
  removeFoodFromCurrentLog: (index) =>  dispatch(removeFoodFromCurrentLog(index)),
  editCurrentEditLog: (updates) => dispatch(editCurrentEditLog(updates)),
  removeCurrentEditLog: () => dispatch(removeCurrentEditLog()),
  editLog: (date, log) => dispatch(editLog(date, log)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLog);