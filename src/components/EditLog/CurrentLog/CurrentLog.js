import React from 'react';
import { connect } from 'react-redux';
import { editCurrentEditLog, removeCurrentEditLog } from '../../../actions/currentLog';
import FoodListDisplayCurrentLogContainer from './FoodListDisplayCurrentLog/FoodListDisplayCurrentLogContainer';
import { startEditLog, startRemoveLog } from '../../../actions/logs';
import { startEditFood } from '../../../actions/foods';

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
    const unit = 'lbs';
    this.props.editCurrentEditLog({ unit });
  }
  handleKgsSelected = () => {
    const unit = 'kgs';
    this.props.editCurrentEditLog({ unit });
  }
  handleSubmit = async () => {
    const weight = this.props.currentLog.weight !== '' ? parseFloat(this.props.currentLog.weight, 10) : 0;

    const total = this.props.currentLog.foods.reduce((prev, curr) => ({
      protein: prev.protein + curr.protein,
      carbohydrates: prev.carbohydrates + curr.carbohydrates,
      fat: prev.fat + curr.fat,
      calories: prev.calories + curr.calories,
    }), {protein: 0, carbohydrates: 0, fat: 0, calories: 0});
    await this.props.editCurrentEditLog({ total });

    this.props.startEditLog(this.props.currentLog.date, {
      date: this.props.currentLog.date,
      unit: this.props.currentLog.unit,
      foods: this.props.currentLog.foods,
      weight,
      total: {
        carbohydrates: +(total.carbohydrates).toFixed(2),
        protein: +(total.protein).toFixed(2),
        fat: +(total.fat).toFixed(2),
        calories: +(total.calories).toFixed(2),
      }
    });
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
      <div className="container">
        <div>
          <FoodListDisplayCurrentLogContainer />
        </div>
        <section className="section-center-6-start-end">
          <div className="currentLog">
            <div className="currentLog__weight">
              <div>
                <input 
                  name="weight"
                  className="form__input"
                  type="text"
                  placeholder="Weight"
                  value={this.props.currentLog.weight}
                  onChange={this.handleWeightChange} 
                />
                <label className="form__label" htmlFor="weight">Weight</label>
              </div>
              <div className="currentLog__radio-group">
                <input
                  className="currentLog__radio-input"
                  type="radio"
                  name="unit"
                  id="lb"
                  value="lbs"
                  onChange={this.handleLbsSelected}
                  checked={this.props.currentLog.unit === "lbs"}
                />
                <label htmlFor="lb" className="currentLog__radio-label">
                  <span className="currentLog__radio-button"></span>
                  lbs
                </label>
              </div>
              <div className="currentLog__radio-group">
              <input 
                type="radio"
                className="currentLog__radio-input"
                name="unit"
                value="kgs"
                id="kg"
                onChange={this.handleKgsSelected}
                checked={this.props.currentLog.unit === "kgs"}
              />
                <label htmlFor="kg" className="currentLog__radio-label">
                  <span className="currentLog__radio-button"></span>
                  kgs
                </label>
              </div>
            </div>
            <div className="currentLog__btn">
              <div>
                <button className="btn btn--form btn--negative" onClick={this.handleRemove}>Remove</button>
              </div>
              <div>
                <button className="btn btn--form btn--positive" onClick={this.handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
          </section>
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