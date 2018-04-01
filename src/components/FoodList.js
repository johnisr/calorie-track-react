import React from 'react';
import { connect } from 'react-redux';
import FoodListItem from './FoodListItem';
import { addCurrentFood } from '../actions/currentFood';

export class FoodList extends React.Component {
  handleClick(food) {
    this.props.addCurrentFood(food);
  }
  render() {
    return (
      <div>
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
                onClick={() => this.handleClick(food)}>
                  edit this
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
  foods: state.foods,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrentFood: (food) => dispatch(addCurrentFood(food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodList);
