import React from 'react';
import { connect } from 'react-redux';
import FoodForm from './FoodForm';
import { editCurrentEditLog, editFoodFromCurrentLog, removeFoodFromCurrentLog } from '../actions/currentLog';

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
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Food</h1>
          </div>
        </div>
          {
            (this.props.index !== undefined) ? (
              <div className="content-container">
                <FoodForm
                  food={this.props.food}
                  handleSubmit={this.handleSubmit}
                />
                <button onClick={this.handleRemove}>Remove</button>
                <button onClick={this.handleExit}>Exit</button>
                
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
  index: state.currentLog.editFoodIndex,
  food: state.currentLog.editFoodIndex !== undefined ? state.currentLog.foods[state.currentLog.editFoodIndex] : undefined,
});
const mapDispatchToProps = dispatch => ({
  editCurrentEditLog: (updates) => dispatch(editCurrentEditLog(updates)),
  editFoodFromCurrentLog: (index, updates) => dispatch(editFoodFromCurrentLog(index, updates)),
  removeFoodFromCurrentLog: (index) => dispatch(removeFoodFromCurrentLog(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditFoodFormForCurrentLog);
