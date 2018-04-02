import React from 'react';
import { connect } from 'react-redux';
import { removeFoodFromCurrentLog } from '../actions/currentLog';
import FoodListDisplayCurrentLog from './FoodListDisplayCurrentLog';

class CurrentLog extends React.Component {
  handleRemove = (food) => {
    this.props.removeFoodFromCurrentLog(food.index);
  };
  render() {
    return (
      <div>
        <FoodListDisplayCurrentLog />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  currentLog: state.currentLog,
});

const mapDispatchToProps = (dispatch) => ({
  removeFoodFromCurrentLog: (index) =>  dispatch(removeFoodFromCurrentLog(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLog);