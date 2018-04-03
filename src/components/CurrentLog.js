import React from 'react';
import { connect } from 'react-redux';
import { removeFoodFromCurrentLog, editCurrentEditLog, removeCurrentEditLog } from '../actions/currentLog';
import FoodListDisplayCurrentLog from './FoodListDisplayCurrentLog';
import { editLog } from '../actions/logs';
import { startEditFood } from '../actions/foods';

class CurrentLog extends React.Component {
  updateTimesUsed() {
    const oldLog = this.props.logs.filter(log => log.date === this.props.currentLog.date)[0];
    const foodUpdates = {};
    
    oldLog.foods.forEach((food) => {
      if (foodUpdates.hasOwnProperty(food.id)) {
        foodUpdates[food.id] = foodUpdates[food.id] - 1;
      } else {
        foodUpdates[food.id] = -1;
      }
    });
    this.props.currentLog.foods.forEach((food) => {
      if (foodUpdates.hasOwnProperty(food.id)) {
        foodUpdates[food.id] = foodUpdates[food.id] + 1;
      } else {
        foodUpdates[food.id] = 1;
      }
    });
    
    this.props.foods.forEach((food) => {
      if (foodUpdates[food.id]) {
        this.props.startEditFood(
          food.id, 
          { timesUsed: food.timesUsed + foodUpdates[food.id] } 
        );
      }
    });
  }
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
    
    this.updateTimesUsed();
    
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
  logs: state.logs,
  foods: state.foods,
});

const mapDispatchToProps = (dispatch) => ({
  removeFoodFromCurrentLog: (index) =>  dispatch(removeFoodFromCurrentLog(index)),
  editCurrentEditLog: (updates) => dispatch(editCurrentEditLog(updates)),
  removeCurrentEditLog: () => dispatch(removeCurrentEditLog()),
  editLog: (date, log) => dispatch(editLog(date, log)),
  startEditFood: (id, addition) => dispatch(startEditFood(id, addition)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLog);