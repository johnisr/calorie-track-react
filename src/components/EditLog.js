import React from 'react';
import { connect } from 'react-redux';
import CurrentLog from './CurrentLog';
 import AddFoodFormToCurrentLog from './AddFoodFormToCurrentLog';
// import EditFoodForm from './EditFoodForm';
import FoodListAddCurrentLog from './FoodListAddCurrentLog';

class EditLog extends React.Component {
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
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
              <AddFoodFormToCurrentLog />
            </div>
          )
        }
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  currentLog: state.currentLog,
});

export default connect(mapStateToProps)(EditLog);