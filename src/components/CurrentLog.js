import React from 'react';
import { connect } from 'react-redux';
import { editCurrentEditLog, removeCurrentEditLog } from '../actions/currentLog';
import FoodListDisplayCurrentLog from './FoodListDisplayCurrentLog';
import { startEditLog, startRemoveLog } from '../actions/logs';
import { startEditFood } from '../actions/foods';

class CurrentLog extends React.Component {
  updateTimesUsed() {
    const foodUpdates = {};
    const oldLog = this.props.logs.filter(log => log.date === this.props.currentLog.date)[0];
    
    // Check if oldLog.foods exist because firebase doesn't store empty arrays
    if (oldLog.foods) {
      oldLog.foods.forEach((food) => {
        if (foodUpdates.hasOwnProperty(food.id)) {
          foodUpdates[food.id] = foodUpdates[food.id] - 1;
        } else {
          foodUpdates[food.id] = -1;
        }
      });
    };
    
    if (this.props.currentLog.foods) {
      this.props.currentLog.foods.forEach((food) => {
        if (foodUpdates.hasOwnProperty(food.id)) {
          foodUpdates[food.id] = foodUpdates[food.id] + 1;
        } else {
          foodUpdates[food.id] = 1;
        }
      });
    }

    if (this.props.foods) {
      this.props.foods.forEach((food) => {
        if (foodUpdates[food.id]) {
          this.props.startEditFood(
            food.id, 
            { timesUsed: food.timesUsed + foodUpdates[food.id] } 
          );
        }
      });
    }
  }

  isNumberWithAtMostTwoDecimals = (str) => {
    return str.match(/^\d{1,}?(\.\d{0,2})?$/);
  }
  handleWeightChange = (e) => {
    const weight = e.target.value;
    if (!weight || this.isNumberWithAtMostTwoDecimals(weight)) {
      this.props.editCurrentEditLog({ weight });
    }
  }
  handleLbsSelected = () => {
    const unit = 'lb';
    this.props.editCurrentEditLog({ unit });
  }
  handleKgsSelected = () => {
    const unit = 'kg';
    this.props.editCurrentEditLog({ unit });
  }
  handleSubmit = () => {
    const weight = this.props.currentLog.weight !== '' ? parseFloat(this.props.currentLog.weight, 10) : 0;
    this.props.startEditLog(this.props.currentLog.date, { ...this.props.currentLog, weight });
    
    this.updateTimesUsed();
    
    this.props.removeCurrentEditLog();
    this.props.history.push('/LogDashboard');
  }
  handleRemove = () => {
    this.props.startRemoveLog(this.props.currentLog.date);
    this.props.removeCurrentEditLog();
    this.props.history.push('/LogDashboard');
  }
  handleExit = () => {
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
          <input type="radio"
              name="unit"
              value="lb"
              onChange={this.handleLbsSelected}
              checked={this.props.currentLog.unit === "lb"}
            />lbs
            <input type="radio"
              name="unit"
              value="kg"
              onChange={this.handleKgsSelected}
              checked={this.props.currentLog.unit === "kg"}
            />kgs
        </div>
        <div>
          <FoodListDisplayCurrentLog />
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
        <button onClick={this.handleRemove}>Remove</button>
        <button onClick={this.handleExit}>Exit</button>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  currentLog: state.currentLog,
  logs: state.logs,
  foods: state.foods,
});

const mapDispatchToProps = (dispatch) => ({
  editCurrentEditLog: (updates) => dispatch(editCurrentEditLog(updates)),
  removeCurrentEditLog: () => dispatch(removeCurrentEditLog()),
  startEditLog: (date, log) => dispatch(startEditLog(date, log)),
  startEditFood: (id, addition) => dispatch(startEditFood(id, addition)),
  startRemoveLog: (date) => dispatch(startRemoveLog(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLog);