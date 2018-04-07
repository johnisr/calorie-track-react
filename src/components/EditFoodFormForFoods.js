import React from 'react';
import { connect } from 'react-redux';
import FoodForm from './FoodForm';
import { startEditFood, startRemoveFood } from '../actions/foods';
import { removeCurrentFood } from '../actions/currentFood';

export class EditFoodFormForFoods extends React.Component {
  handleSubmit = async (updates) => {
    await this.props.startEditFood(this.props.food.id, updates);
    this.props.removeCurrentFood();
  }
  handleRemove = async (food) => {
    await this.props.startRemoveFood(this.props.food);
    this.props.removeCurrentFood();
  }
  handleExit = () => {
    this.props.removeCurrentFood();
  }
  render() {
    return (
      <div className="pane">
          <h1 className="pane__title">Edit Food</h1>
          {
            (this.props.food.id !== '') ? (
              <div>
                <FoodForm
                  food={this.props.food}
                  handleSubmit={this.handleSubmit}
                />
                <div className="pane__buttons">
                  <div>
                    <button className="btn btn--form" onClick={this.handleRemove}>Remove</button>
                  </div>
                  <div>
                    <button className="btn btn--form" onClick={this.handleExit}>Exit</button>
                  </div>
                </div>
              </div>
            ) : ( 
              <p className="pane__warning">Select from List above to Edit Item</p>
            )
          }
      </div>
    )
  }
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
