import React from 'react';
import { connect } from 'react-redux';
import FoodList from './FoodList';
import EditFood from './EditFood';
import AddFood from './AddFood';
import { addCurrentFood } from '../actions/currentFood';

export class FoodDashboardPage extends React.Component {
  handleClick = (food) => {
    this.props.addCurrentFood(food);
  }
  render() {
    return (
      <div>
        <FoodList foods={this.props.foods} handleClick={this.handleClick} buttonText={'Edit This'}/>
        <AddFood />
        <EditFood />
      </div>
    );
  }
};

const mapStateToProps = state => ({
  foods: state.foods,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrentFood: (food) => dispatch(addCurrentFood(food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodDashboardPage);