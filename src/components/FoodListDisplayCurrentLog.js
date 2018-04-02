import React from 'react';
import { connect } from 'react-redux';
import FoodListItem from './FoodListItem';
import { removeFoodFromCurrentLog } from '../actions/currentLog';

export class FoodListDisplayCurrentLog extends React.Component {
  handleClick = (index) => {
    this.props.removeFoodFromCurrentLog(index);
  }
  render() {
    return (
      <div>
        <h3>Foods in Current Log</h3>
        {
          this.props.foods.length === 0 ? (
            <p>No Foods</p>
          ) : (
            this.props.foods.map(food => (
              <div key={`div ${food.index}`}>
                <FoodListItem 
                  key={`item ${food.index}`}
                  {...food}
                />
                <button 
                  key={`button ${food.index}`} 
                  onClick={() => this.handleClick(food.index)}
                >
                  Remove This
                </button>
              </div>
            ))
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  foods: state.currentLog.foods,
});

const mapDispatchToProps = (dispatch) => ({
  removeFoodFromCurrentLog: (index) => dispatch(removeFoodFromCurrentLog(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodListDisplayCurrentLog);
