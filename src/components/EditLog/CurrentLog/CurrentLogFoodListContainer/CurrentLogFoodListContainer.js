import React from 'react';
import { connect } from 'react-redux';
import CurrentLogFoodList from './CurrentLogFoodList/CurrentLogFoodList';
import {
  removeFoodFromCurrentLog,
  editCurrentEditLog,
  editFoodFromCurrentLog
} from '../../../../actions/currentLog';

export class CurrentLogFoodListContainer extends React.Component {
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
  
  render() {
    return (
      <CurrentLogFoodList 
        foods={this.props.foods}
        onMultiplierChange={(index, e) => this.handleMultiplierChange(index, e)}
        onEdit={(index) => this.handleEdit(index)}
        onRemove={(index) => this.handleRemove(index)}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLogFoodListContainer);
