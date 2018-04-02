import React from 'react';
import { connect } from 'react-redux';
import FoodList from './FoodList';
import { removeFoodFromCurrentLog } from '../actions/currentLog';

class CurrentLog extends React.Component {
  handleRemove = (food) => {
    this.props.removeFoodFromCurrentLog(food.index);
  };
  render() {
    return (
      <div>
        <h1>Current Log</h1>
        <FoodList
          foods={this.props.currentLog.foods}
          handleClick={this.handleRemove}
          buttonText={'No Effect'}
        />
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