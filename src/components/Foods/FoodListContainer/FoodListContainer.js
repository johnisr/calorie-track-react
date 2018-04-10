import React from 'react';
import { connect } from 'react-redux';
import FoodList from '../../FoodList/FoodList';
import { addCurrentFood, removeCurrentFood } from '../../../actions/currentFood';
import selectFoodsWithPages from '../../../selectors/foodsWithPages';

export class FoodListContainer extends React.Component {
  handleClick = (food) => {
    if(this.props.currentFood.id !== '') {
      this.props.removeCurrentFood(food);
    }
    this.props.addCurrentFood(food);
  }
  render() {
    return (
      <FoodList
        foods={this.props.foods}
        onClick={this.handleClick}
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

export default connect(mapStateToProps, mapDispatchToProps)(FoodListContainer);
