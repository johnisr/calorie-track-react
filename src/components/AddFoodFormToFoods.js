import React from 'react';
import { connect } from 'react-redux';
import FoodForm from './FoodForm';
import { startAddFood } from '../actions/foods';

export class AddFoodFormToFoods extends React.Component {
  handleSubmit = (food) => {
    this.props.startAddFood(food);
  }
  render() {
    return (
      <section className="row">
        <div className="form">
          <div className="page-header">
            <div className="content-container">
              <h1 className="page-header__title">Add Food</h1>
            </div>
          </div>
          <div className="content-container">
            <FoodForm
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </section>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  startAddFood: food => dispatch(startAddFood(food)),
});

export default connect(undefined, mapDispatchToProps)(AddFoodFormToFoods);
