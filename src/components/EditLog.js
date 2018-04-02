import React from 'react';
import { connect } from 'react-redux';
import CurrentLog from './CurrentLog';
import FoodList from './FoodList';
import AddFood from './AddFood';
import EditFood from './EditFood';
import { editCurrentEditLog, addFoodToCurrentLogFromList } from '../actions/currentLog';

class EditLog extends React.Component {
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  handleAddFromList = (food) => {
    this.props.addFoodToCurrentLogFromList(food);
  }
  render() {
    return (
      <div>
        <h1>EDIT FOOD</h1>
        {
          this.isEmpty(this.props.currentLog) ? (
            <p>Select a Log from Log dashboard to edit</p>
          ) : (
            <div>
              <CurrentLog />
              <FoodList
                foods={this.props.foods}
                handleClick={this.handleAddFromList}
                buttonText={'Add This'}
              />
              <AddFood />
              <EditFood />
            </div>
          )
        }
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  foods: state.foods,
  currentLog: state.currentLog,
});

const mapDispatchToProps = dispatch => ({
  editCurrentEditLog: (updates) => dispatch(editCurrentEditLog(updates)),
  addFoodToCurrentLogFromList: (food) => dispatch(addFoodToCurrentLogFromList(food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLog);