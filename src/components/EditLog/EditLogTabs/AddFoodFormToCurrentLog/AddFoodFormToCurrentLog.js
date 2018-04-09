import React from 'react';
import { connect } from 'react-redux';
import FoodForm from '../../../FoodForm/FoodForm';
import { addFoodToCurrentLog } from '../../../../actions/currentLog';

export class AddFoodFormToCurrentLog extends React.Component {
  handleSubmit = (food) => {
    this.props.addFoodToCurrentLog(food);
  }
  render() {
    return (
      <div>
        <h1 className="pane__title">Add Food To Log</h1>
        <FoodForm
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  addFoodToCurrentLog: food => dispatch(addFoodToCurrentLog(food)),
});

export default connect(undefined, mapDispatchToProps)(AddFoodFormToCurrentLog);
