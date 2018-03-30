import React from 'react';
import { connect } from 'react-redux';
import FoodForm from './FoodForm';
import { addFood } from '../actions/foods';

export class AddFoodPage extends React.Component {
  handleSubmit = (food) => {
    this.props.addFood({
      ...food,
    });
    this.props.history.push('/home');
  }
  render() {
    return (
      <div>
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
    )
  }
}
const mapDispatchToProps = dispatch => ({
  addFood: food => dispatch(addFood(food)),
});

export default connect(undefined, mapDispatchToProps)(AddFoodPage);
