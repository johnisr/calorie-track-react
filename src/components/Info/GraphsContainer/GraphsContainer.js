import React from 'react';
import { connect } from 'react-redux';
import GraphInfo from './GraphInfo/GraphInfo';
import InfoFilters from './InfoFilters/InfoFilters';
import WeightChart from './WeightChart/WeightChart';
import MacroChart from './MacroChart/MacroChart';
import MacroTimeChart from './MacroTimeChart/MacroTimeChart';
import { setDataFilter } from '../../../actions/infoFilters';

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
    data: [],
    selected: 'carbohydrates',
  };
  componentDidMount() {
    const data = [];
    const logsData = JSON.parse(JSON.stringify(this.props.logs));
    Object.keys(logsData).forEach(key => {
      const log = logsData[key];
      data.push({ date:log.date, weight: log.weight, ...log.total});
    });
    this.setState(() => ({ data }))
  }
  dataFilterChange = (e) => {
    const filter = e.target.value;
    this.props.setDataFilter(filter);
  }
  onSelectedChange = (dataPoint, event) => {
    const selected = dataPoint.label;
    this.setState(() => ({ selected }));
  }
  render() {
    const { selected, data } = this.state;
    const { infoFilters } = this.props;

    const filteredData = data.slice(infoFilters.dataFilter);
    const {tdee, prevWeekWeight} = getTDEE(filteredData);
    const tdeeRounded = Math.ceil(tdee / 5) * 5;
    const weightLost = (prevWeekWeight[prevWeekWeight.length-1] - prevWeekWeight[0]).toFixed(2);
    
    const averageMacro = getAverage(filteredData);
    const averageMacroData = [];
    Object.keys(averageMacro).forEach(key => {
      if (key !== 'calories' && key !== 'weight') {
        const total = averageMacro.carbohydrates + averageMacro.protein + averageMacro.fat;
        const dataObj = { label: key, value: averageMacro[key], subLabel: (averageMacro[key] / total * 100).toFixed(2) };
        if (key === this.state.selected) dataObj.color = '#FF9833';
        averageMacroData.push(dataObj);
      }
    });

    const macroFilter = selected === 'protein' ? infoFilters.proteinFilter : 
      selected === 'fat' ? infoFilters.fatFilter : infoFilters.carbohydratesFilter;

    if (filteredData.length === 0) {
      return null;
    }

    return (
      <div>
        <InfoFilters
          dataFilterValue={this.props.infoFilters.dataFilter}
          onDataFilterChange={this.dataFilterChange}
          selected={selected}
          macroFilter={macroFilter}
          />
        <GraphInfo tdee={tdeeRounded} weightLost={weightLost} />
        <WeightChart data={filteredData}/>
        <MacroChart
          averageMacroData={averageMacroData}
          onSelectedChange={this.onSelectedChange}
          />
        <MacroTimeChart
          data={filteredData}
          prevWeekWeight={prevWeekWeight}
          selected={selected}
          macroFilter={macroFilter}
        />
      </div>
    );
  }
};

const mapStateToProps = state => ({
  logs: state.logs,
  infoFilters: state.infoFilters,
});

const mapDispatchToProps = dispatch => ({
  setDataFilter: (filter) => dispatch(setDataFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphsContainer);