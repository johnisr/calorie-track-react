import React from 'react';
import { connect } from 'react-redux';
import LogFoodListItem from './LogFoodListItem';
import { removeFoodFromCurrentLog, editCurrentEditLog, editFoodFromCurrentLog } from '../actions/currentLog';

export class FoodListDisplayCurrentLog extends React.Component {
  isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  isNumberWithAtMostTwoDecimals = (str) => {
    return str.match(/^\d{1,}?(\.\d{0,2})?$/);
  }
  handleRemove = (index) => {
    this.props.editCurrentEditLog({ editFoodIndex: undefined });
    this.props.removeFoodFromCurrentLog(index);
  }
  handleEdit = async (editFoodIndex) => {
    await this.props.editCurrentEditLog({ editFoodIndex: undefined });
    this.props.editCurrentEditLog({ editFoodIndex });
  }
  handleMultiplierChange = (index, e) => {
    const { amount, carbohydrates, protein, fat, calories } = this.props.foods[index].base;
    const multiplier = e.target.value;
    // if it exists and is not a number, don't update
    if (multiplier && !this.isNumberWithAtMostTwoDecimals(multiplier)) {
      return;
    }
    let updates;
    if (this.isNumeric(multiplier)) {
      updates = {
        amount: +(amount * multiplier).toFixed(2),
        carbohydrates: +(carbohydrates * multiplier).toFixed(2),
        protein: +(protein * multiplier).toFixed(2),
        fat: +(fat * multiplier).toFixed(2),
        calories: +(calories * multiplier).toFixed(2),
        multiplier,
      };
    } else {
      updates = {
        amount,
        carbohydrates,
        protein,
        fat,
        calories,
        multiplier,
      };
    }
    this.props.editFoodFromCurrentLog(index, updates);
  }
  createTable = () => (
    this.props.foods.map((food, index) => (
      <div 
        key={`div ${food.index}`}
        className={index % 2 === 0 ? 
          "logFoodListDisplay__list-table" : 
          "logFoodListDisplay__list-table logFoodListDisplay__list-table--even"}
      >
        <LogFoodListItem 
          key={`item ${food.index}`}
          {...food}
        />
        <div className="logFoodListDisplay__list-options">
          {
            food.multiplier !== undefined ? (
              <input
                type="text"
                className="logFoodListDisplay__list-multiplier"
                placeholder="servings"
                value={this.props.foods[food.index].multiplier}
                onChange={this.handleMultiplierChange.bind(this, food.index)}
                />
            ) : (
              <button
                className="btn logFoodListDisplay__list-btn flex-right-end"
                onClick={() => this.handleEdit(food.index)}
              >
                Edit
              </button>
            )
          }
          <button
            className="btn logFoodListDisplay__list-btn"
            key={`button ${food.index}`} 
            onClick={() => this.handleRemove(food.index)}
          >
            Remove
          </button>
        </div>
      </div>
    ))
  )
  render() {
    return (
      <div className="logFoodListDisplay">
        <h3 className="heading-secondary logFoodListDisplay__header">Foods in Current Log</h3>
        {
          this.props.foods === undefined || this.props.foods.length === 0 ? (
            <p className="heading-secondary logFoodListDisplay__header">No Foods</p>
          ) : (
            <div className="logFoodListDisplay__list">
              <div className="logFoodListDisplay__list-header">
                <p className="logFoodListDisplay__list-title">name</p>
                <p className="logFoodListDisplay__list-title">amount</p>
                <p className="logFoodListDisplay__list-title">carbs</p>
                <p className="logFoodListDisplay__list-title">protein</p>
                <p className="logFoodListDisplay__list-title">fat</p>
                <p className="logFoodListDisplay__list-title">calories</p>
              </div>
              {this.createTable()}
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  foods: state.currentLog.foods,
});

const mapDispatchToProps = (dispatch) => ({
  removeFoodFromCurrentLog: (index) => dispatch(removeFoodFromCurrentLog(index)),
  editCurrentEditLog: (updates) => dispatch(editCurrentEditLog(updates)),
  editFoodFromCurrentLog: (index, updates) => dispatch(editFoodFromCurrentLog(index, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodListDisplayCurrentLog);
