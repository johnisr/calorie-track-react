import React from 'react';
import { connect } from 'react-redux';
import LogListItem from './LogListItem';

export class LogList extends React.Component {
  calculateTotal(foods, macro) {
    if (macro === 'calories') {
      return foods.reduce((prev, curr) => prev + curr.calories, 0);
    } 
    else if (macro === 'fat') {
      return foods.reduce((prev, curr) => prev + curr.fat, 0);
    } else if (macro === 'protein') {
      return foods.reduce((prev, curr) => prev + curr.protein, 0);
    } else if (macro === 'carbohydrates') {
      return foods.reduce((prev, curr) => prev + curr.carbohydrates, 0);
    }
    return 0;
  }
  
  render() {
    return (
      <div>
        <h1>Log List</h1>
        {
          this.props.logs === 0 ? (
            <p>No logs</p>
          ) : (
            this.props.logs.map(log => (
              <LogListItem
                key={`item ${log.date}`}
                totalCalories={this.calculateTotal(log.foods, 'calories')} 
                totalProtein={this.calculateTotal(log.foods, 'protein')} 
                totalCarbohydrates={this.calculateTotal(log.foods, 'carbohydrates')} 
                totalFat={this.calculateTotal(log.foods, 'fat')} 
                {...log} 
              />
            )
          ))
        }
      </div>
    );
  }
}  

const mapStateToProps = (state) => ({
  logs: state.logs,
});

export default connect(mapStateToProps)(LogList);
