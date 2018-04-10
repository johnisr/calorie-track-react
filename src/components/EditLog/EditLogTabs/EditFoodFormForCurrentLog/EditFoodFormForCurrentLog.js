import React from 'react';
import { connect } from 'react-redux';
import FoodForm from '../../../FoodForm/FoodForm';
import { editCurrentEditLog, editFoodFromCurrentLog, removeFoodFromCurrentLog } from '../../../../actions/currentLog';

export class EditFoodFormForCurrentLog extends React.Component {
  handleSubmit = async (updates) => {
    await this.props.editFoodFromCurrentLog(this.props.index, updates);
    this.props.editCurrentEditLog({ editFoodIndex: undefined });
  }
  handleRemove = () => {
    this.props.editCurrentEditLog({ editFoodIndex: undefined });
    this.props.removeFoodFromCurrentLog(this.props.index);
  }
  handleExit = () => {
    this.props.editCurrentEditLog({ editFoodIndex: undefined });
  }
  render() {

    if (this.props.index === undefined) {
      return <p className="center-text margin-bottom-small">Select from List above to Edit Item</p>;
    }

    return (
      <FoodForm
        food={this.props.food}
        handleSubmit={this.handleSubmit}
        title={'Edit Food'}
        onRemove={this.handleRemove}
        onExit={this.handleExit}
      />
    )
  }
}


const mapStateToProps = (state, props) => ({
  index: state.currentLog.editFoodIndex,
  food: state.currentLog.editFoodIndex !== undefined ? state.currentLog.foods[state.currentLog.editFoodIndex] : undefined,
});
const mapDispatchToProps = dispatch => ({
  editCurrentEditLog: (updates) => dispatch(editCurrentEditLog(updates)),
  editFoodFromCurrentLog: (index, updates) => dispatch(editFoodFromCurrentLog(index, updates)),
  removeFoodFromCurrentLog: (index) => dispatch(removeFoodFromCurrentLog(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditFoodFormForCurrentLog);
