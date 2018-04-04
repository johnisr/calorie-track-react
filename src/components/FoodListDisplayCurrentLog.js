import React from 'react';
import { connect } from 'react-redux';
import FoodListItem from './FoodListItem';
import { removeFoodFromCurrentLog, editCurrentEditLog, editFoodFromCurrentLog } from '../actions/currentLog';

export class FoodListDisplayCurrentLog extends React.Component {
  isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  handleRemove = (index) => {
    this.props.removeFoodFromCurrentLog(index);
  }
  handleEdit = (editFoodIndex) => {
    this.props.editCurrentEditLog({ editFoodIndex });
  }
  handleMultiplierChange = (index, e) => {
    const { amount, carbohydrates, protein, fat, calories } = this.props.foods[index].base;
    const multiplier = e.target.value;
    let updates;
    if (this.isNumeric(multiplier)) {
      updates = {
        amount: (amount * multiplier).toFixed(2),
        carbohydrates: (carbohydrates * multiplier).toFixed(2),
        protein: (protein * multiplier).toFixed(2),
        fat: (fat * multiplier).toFixed(2),
        calories: (calories * multiplier).toFixed(2),
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
  render() {
    return (
      <div>
        <h3>Foods in Current Log</h3>
        {
          this.props.foods === undefined || this.props.foods.length === 0 ? (
            <p>No Foods</p>
          ) : (
            this.props.foods.map(food => (
              <div key={`div ${food.index}`}>
                <FoodListItem 
                  key={`item ${food.index}`}
                  {...food}
                />
                <button 
                  key={`button ${food.index}`} 
                  onClick={() => this.handleRemove(food.index)}
                >
                  Remove This
                </button>
                {
                  food.multiplier !== undefined ? (
                    <input
                      type="text"
                      placeholder="servings"
                      value={this.props.foods[food.index].multiplier}
                      onChange={this.handleMultiplierChange.bind(this, food.index)}
                      />
                  ) : (
                    <button onClick={() => this.handleEdit(food.index)}>Edit this</button>
                  )
                }
              </div>
            ))
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
