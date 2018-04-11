import React from 'react';
import { connect } from 'react-redux';
import { editCurrentEditLog, removeCurrentEditLog } from '../../../actions/currentLog';
import CurrentLogFoodListContainer from './CurrentLogFoodListContainer/CurrentLogFoodListContainer';
import { startEditLog, startRemoveLog } from '../../../actions/logs';
import { startEditFood } from '../../../actions/foods';
import CurrentLog from './CurrentLog/CurrentLog';

export class CurrentLogContainer extends React.Component {
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

    const foods = this.props.currentLog.foods;

    let total = { protein: 0, carbohydrates: 0, fat: 0, calories: 0 };
    if (foods) {
      total = foods.reduce((prev, curr) => ({
        protein: prev.protein + curr.protein,
        carbohydrates: prev.carbohydrates + curr.carbohydrates,
        fat: prev.fat + curr.fat,
        calories: prev.calories + curr.calories,
      }), total);
    }

    await this.props.editCurrentEditLog({ total });

    this.props.startEditLog(this.props.currentLog.date, {
      date: this.props.currentLog.date,
      unit: this.props.currentLog.unit,
      foods: foods ? foods : [],
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
    this.props.history.push('/Logs');
  }
  handleRemove = () => {
    this.props.startRemoveLog(this.props.currentLog.date);
    this.props.removeCurrentEditLog();
    this.props.history.push('/Logs');
  }
  render() {
    return (
      <div className="container">
        <div>
          <CurrentLogFoodListContainer />
        </div>
        <section className="section-center-6-start-end">
          <CurrentLog
            currentLog={this.props.currentLog}
            onWeightChange={this.handleWeightChange}
            onLbsSelected={this.handleLbsSelected}
            onKgsSelected={this.handleKgsSelected}
            onRemove={this.handleRemove}
            onSubmit={this.handleSubmit}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLogContainer);