import React from 'react';
import { connect } from 'react-redux';
import FoodForm from './FoodForm';
import { addFoodToCurrentLog } from '../actions/currentLog';

export class AddFoodFormToCurrentLog extends React.Component {
  handleSubmit = (food) => {
    this.props.addFoodToCurrentLog(food);
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Food To Log</h1>
          </div>
        </div>
        <div className="content-container">
          <FoodForm
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  addFoodToCurrentLog: food => dispatch(addFoodToCurrentLog(food)),
});

export default connect(undefined, mapDispatchToProps)(AddFoodFormToCurrentLog);
