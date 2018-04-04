import React from 'react';
import { connect } from 'react-redux';
import FoodListItem from './FoodListItem';
import { addFoodToCurrentLogFromList } from '../actions/currentLog';
import selectFoodsWithPages from '../selectors/foodsWithPages';

export class FoodListAddCurrentLog extends React.Component {
  handleClick = (food) => {
    console.log(food);
    this.props.addFoodToCurrentLogFromList(food);
  }
  render() {
    return (
      <div>
        <h3>Add Food From Foods Database</h3>
        {
          this.props.foods.length === 0 ? (
            <p>No Foods</p>
          ) : (
            this.props.foods.map(food => (
              <div key={`div ${food.id}`}>
                <FoodListItem 
                  key={`item ${food.id}`}
                  {...food}
                />
                <button 
                  key={`button ${food.id}`} 
                  onClick={() => this.handleClick(food)}
                >
                  Add This
                </button>
              </div>
            ))
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  foods: selectFoodsWithPages(state.foods, state.foodsFilters),
});

const mapDispatchToProps = (dispatch) => ({
  addFoodToCurrentLogFromList: (food) => dispatch(addFoodToCurrentLogFromList(food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodListAddCurrentLog);
