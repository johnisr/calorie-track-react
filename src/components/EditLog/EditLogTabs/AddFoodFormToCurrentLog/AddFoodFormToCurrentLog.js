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
      <FoodForm
        handleSubmit={this.handleSubmit}
        title={'Add Food To Log'}
      />
    )
  }
}
const mapDispatchToProps = dispatch => ({
  addFoodToCurrentLog: food => dispatch(addFoodToCurrentLog(food)),
});

export default connect(undefined, mapDispatchToProps)(AddFoodFormToCurrentLog);
