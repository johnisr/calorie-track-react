import React from 'react';
import { connect } from 'react-redux';
import FoodListDisplayFoods from './FoodListDisplayFoods';
import { addCurrentFood, removeCurrentFood } from '../../../actions/currentFood';
import selectFoodsWithPages from '../../../selectors/foodsWithPages';

export class FoodListDisplayFoodsContainer extends React.Component {
  handleClick = (food) => {
    if(this.props.currentFood.id !== '') {
      this.props.removeCurrentFood(food);
    }
    this.props.addCurrentFood(food);
  }
  render() {
    return (
      <FoodListDisplayFoods
        foods={this.props.foods}
        onClick={(food) => this.handleClick(food)}
        buttonText={'Edit'}
      />
    );
  }
}

const mapStateToProps = state => ({
  foods: selectFoodsWithPages(state.foods, state.foodsFilters),
  currentFood: state.currentFood,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrentFood: (food) => dispatch(addCurrentFood(food)),
  removeCurrentFood: (food) => dispatch(removeCurrentFood(food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodListDisplayFoodsContainer);
