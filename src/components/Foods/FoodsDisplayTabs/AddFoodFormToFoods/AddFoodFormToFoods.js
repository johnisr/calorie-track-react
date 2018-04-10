import React from 'react';
import { connect } from 'react-redux';
import FoodForm from '../../../FoodForm/FoodForm';
import { startAddFood } from '../../../../actions/foods';

export class AddFoodFormToFoods extends React.Component {
  handleSubmit = (food) => {
    this.props.startAddFood(food);
  }
  render() {
    return (
      <FoodForm handleSubmit={this.handleSubmit} title={'Add Food'} />
    )
  }
}
const mapDispatchToProps = dispatch => ({
  startAddFood: food => dispatch(startAddFood(food)),
});

export default connect(undefined, mapDispatchToProps)(AddFoodFormToFoods);
