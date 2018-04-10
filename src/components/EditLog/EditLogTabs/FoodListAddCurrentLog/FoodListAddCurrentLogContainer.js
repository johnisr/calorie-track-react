import React from 'react';
import { connect } from 'react-redux';
import FoodListDisplayfoods from '../../../Foods/FoodListDisplayFoods/FoodListDisplayFoods';
import { addFoodToCurrentLogFromList } from '../../../../actions/currentLog';
import selectFoodsWithPages from '../../../../selectors/foodsWithPages';

export class FoodListAddCurrentLogContainer extends React.Component {
  handleClick = (food) => {
    this.props.addFoodToCurrentLogFromList(food);
  }
  render() {
    return (
      <FoodListDisplayfoods 
        foods={this.props.foods}
        onClick={(food) => this.handleClick(food)}
        buttonText={'Add'}
      />
    );
  }
}

const mapStateToProps = state => ({
  foods: selectFoodsWithPages(state.foods, state.foodsFilters),
});

const mapDispatchToProps = (dispatch) => ({
  addFoodToCurrentLogFromList: (food) => dispatch(addFoodToCurrentLogFromList(food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodListAddCurrentLogContainer);
