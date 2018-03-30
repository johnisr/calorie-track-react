import React from 'react';
import { connect } from 'react-redux';
import FoodForm from './FoodForm';
import { editFood, removeFood } from '../actions/foods';

export class EditFoodPage extends React.Component {
  handleSubmit = (food) => {
    this.props.editFood(this.props.food.id, food);
    this.props.history.push('/dashboard');
  }
  handleRemove = (food) => {
    this.props.removeFood(this.props.food);
    this.props.history.push('/dashboard');
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Food</h1>
          </div>
        </div>
        <div className="content-container">
          <FoodForm
            food={this.props.food}
            handleSubmit={this.handleSubmit}
          />
          <button onClick={this.handleRemove}>Remove</button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  food: state.foods.find(food => food.id === props.match.params.id),
});
const mapDispatchToProps = dispatch => ({
  editFood: (id, updates) => dispatch(editFood(id, updates)),
  removeFood: (food) => dispatch(removeFood(food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditFoodPage);
