import React from 'react';
import { connect } from 'react-redux';
import FoodList from './FoodList';
import AddFood from './AddFood';
import EditFood from './EditFood';
import { editCurrentEditLog } from '../actions/currentLog';

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
  currentLog: state.currentLog,
});

const mapDispatchToProps = dispatch => ({
  editCurrentEditLog: (updates)=> dispatch(editCurrentEditLog(updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLog);