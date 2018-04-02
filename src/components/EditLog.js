import React from 'react';
import { connect } from 'react-redux';
import CurrentLog from './CurrentLog';
// import AddFoodForm from './AddFoodForm';
// import EditFoodForm from './EditFoodForm';
import FoodListAddCurrentLog from './FoodListAddCurrentLog';
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
              <FoodListAddCurrentLog />
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