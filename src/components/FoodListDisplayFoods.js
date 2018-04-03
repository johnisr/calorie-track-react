import React from 'react';
import { connect } from 'react-redux';
import FoodListItem from './FoodListItem';
import { addCurrentFood } from '../actions/currentFood';
import selectFoodsWithPages from '../selectors/foodsWithPages';

export class FoodListDisplayFoods extends React.Component {
  handleClick = (food) => {
    this.props.addCurrentFood(food);
  }
  render() {
    return (
      <div>
        <h3>Foods in Database</h3>
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
                  Edit This
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
  addCurrentFood: (food) => dispatch(addCurrentFood(food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodListDisplayFoods);
