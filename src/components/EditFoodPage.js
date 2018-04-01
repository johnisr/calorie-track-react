import React from 'react';
import { connect } from 'react-redux';
import FoodForm from './FoodForm';
import { startEditFood, startRemoveFood } from '../actions/foods';
import { removeCurrentFood } from '../actions/currentFood';

export class EditFoodPage extends React.Component {
  handleSubmit = async (food) => {
    await this.props.startEditFood(this.props.food.id, food);
    this.props.removeCurrentFood();
  }
  handleRemove = async (food) => {
    await this.props.startRemoveFood(this.props.food);
    this.props.removeCurrentFood();
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Food</h1>
          </div>
        </div>
          {
            (this.props.food.id !== '') ? (
              <div className="content-container">
                <FoodForm
                  food={this.props.food}
                  handleSubmit={this.handleSubmit}
                />
                <button onClick={this.handleRemove}>Remove</button>
              </div>
            ) : ( 
              <p>Select from List above to Edit Item</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditFoodPage);
