import React from 'react';
import { connect } from 'react-redux';
import FoodForm from '../../../FoodForm/FoodForm';
import { startEditFood, startRemoveFood } from '../../../../actions/foods';
import { removeCurrentFood } from '../../../../actions/currentFood';

export class EditFoodFormForFoods extends React.Component {
  handleSubmit = async (updates) => {
    await this.props.startEditFood(this.props.food.id, updates);
    this.props.removeCurrentFood();
  }
  handleRemove = async () => {
    await this.props.startRemoveFood(this.props.food);
    this.props.removeCurrentFood();
  }
  handleExit = () => {
    this.props.removeCurrentFood();
  }
  render() {

    if (this.props.food.id === '') {
      return <p className="center-text margin-bottom-small">Select from List above to Edit Item</p>;
    }

    return (
      <FoodForm
        food={this.props.food}
        handleSubmit={this.handleSubmit}
        title={'Edit Food'}
        onRemove={this.handleRemove}
        onExit={this.handleExit}
      />
    );
  };
}


const mapStateToProps = (state, props) => ({
  food: state.currentFood,
});
const mapDispatchToProps = dispatch => ({
  startEditFood: (id, updates) => dispatch(startEditFood(id, updates)),
  startRemoveFood: (food) => dispatch(startRemoveFood(food)),
  removeCurrentFood: () => dispatch(removeCurrentFood()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditFoodFormForFoods);
