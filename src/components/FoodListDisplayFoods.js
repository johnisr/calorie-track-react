import React from 'react';
import { connect } from 'react-redux';
import FoodListItem from './FoodListItem';
import { addCurrentFood, removeCurrentFood } from '../actions/currentFood';
import selectFoodsWithPages from '../selectors/foodsWithPages';

export class FoodListDisplayFoods extends React.Component {
  handleClick = (food) => {
    if(this.props.currentFood.id !== '') {
      this.props.removeCurrentFood(food);
    }
    this.props.addCurrentFood(food);
  }
  createTable = () => (
    this.props.foods.map((food, index) => (
      <div 
        key={`div ${food.id}`}
        className={index % 2 === 0 ? 
          "listDisplay__list-table" : 
          "listDisplay__list-table listDisplay__list-table--even"}
      >
        <FoodListItem
          key={`item ${food.id}`}
          {...food}
        />
        <button
          className="btn listDisplay__list-btn flex-right-end"
          key={`button ${food.id}`} 
          onClick={() => this.handleClick(food)}
        >
          Edit
        </button>
      </div>
    ))
  )
  render() {
    return (
        <div className="listDisplay">
          <h3 className="heading-secondary listDisplay__header">Foods in Database</h3>
          {
            this.props.foods.length === 0 ? (
              <p className="heading-secondary listDisplay__header">No Foods</p>
            ) : (
            <div className="listDisplay__list">
              <div className="listDisplay__list-header">
                <p className="listDisplay__list-title">name</p>
                <p className="listDisplay__list-title">amount</p>
                <p className="listDisplay__list-title">carbs</p>
                <p className="listDisplay__list-title">protein</p>
                <p className="listDisplay__list-title">fat</p>
                <p className="listDisplay__list-title">calories</p>
              </div>
              {this.createTable()}
            </div>
            )
          }
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FoodListDisplayFoods);
