import React from 'react';
import { connect } from 'react-redux';

function getAverage (data) {
  const total = data.reduce((prev, curr) => ({
    calories: prev.calories + curr.calories,
    carbohydrates: prev.carbohydrates + curr.carbohydrates,
    protein: prev.protein + curr.protein,
    fat: prev.fat + curr.fat,
    weight: prev.weight + curr.weight,
  }), {calories: 0, carbohydrates: 0, protein: 0, fat: 0, weight: 0 });

  Object.keys(total).forEach(key => {
    total[key] = +(total[key] / (data.length)).toFixed(2);
  });
  return total;
};

function getTDEE(week) {
  const prevWeekTDEE = [];
  const prevWeekWeight = [];
  let index = 0;
  let nextWeek = week.slice(index, index + 7);

  while (nextWeek.length !== 0) {
    // Get avgCalories/totalDeficit/weightLost for current week 
    const { calories: avgCalories, weight: avgWeight } = getAverage(nextWeek);
    const prevAvgWeight = prevWeekWeight.length === 0 ? +nextWeek[0].weight : prevWeekWeight[prevWeekWeight.length - 1];
    const weightLost = +avgWeight - prevAvgWeight;
    const totalDeficit = -weightLost * 3500 / 7;

    // Add all other previous TDEE and calculate TDEE as weighted average
    const otherTDEE = prevWeekTDEE.length === 0 ? 0 : prevWeekTDEE.reduce((prev, curr) => prev + +curr, 0);
    const tdee = (+avgCalories + totalDeficit + otherTDEE) / (1 + prevWeekTDEE.length);
    prevWeekTDEE.push(tdee);
    prevWeekWeight.push(+avgWeight);
    
    // Increment for next Week
    index += 7;
    nextWeek = week.slice(index, index + 7);
  }

  return {
    tdee: prevWeekTDEE[prevWeekTDEE.length - 1],
    prevWeekWeight,
    prevWeekTDEE,
  };
}

class GraphsContainer extends React.Component {
  state = {

  };
  componentDidMount() {
    const data = [];
    const logsData = JSON.parse(JSON.stringify(this.props.logs));
    Object.keys(logsData).forEach(key => {
      const log = logsData[key];
      data.push({ date:log.date, weight: log.weight, ...log.total});
    });

  }
  render() {
    return (
      <div>
        Graphs Container
      </div>
    );
  }
};

const mapStateToProps = state => ({
  logs: state.logs,
  infoFilters: state.infoFilters,
});


export default connect(mapStateToProps)(GraphsContainer);