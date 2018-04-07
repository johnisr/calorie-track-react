import React from 'react';
import { connect } from 'react-redux';
import FoodForm from './FoodForm';
import { startAddFood } from '../actions/foods';

export class AddFoodFormToFoods extends React.Component {
  handleSubmit = (food) => {
    console.log('Submitting to Foods');
    console.log(food);
    this.props.startAddFood(food);
  }
  render() {
    return (
      <div className="pane">
        <h1 className="pane__title">Add Food</h1>
        <FoodForm handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  startAddFood: food => dispatch(startAddFood(food)),
});

export default connect(undefined, mapDispatchToProps)(AddFoodFormToFoods);
