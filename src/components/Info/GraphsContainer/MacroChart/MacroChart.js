import React from 'react';
import '../../../../../node_modules/react-vis/dist/style.css';
import {FlexibleWidthXYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries, Hint, LabelSeries } from 'react-vis';
import './MacroChart.css';

class MacroChart extends React.Component {
  render() {
    const {averageMacroData, onSelectedChange} = this.props;
    console.log(averageMacroData);
    return (
      <div className='MacroChart'>
        <h2 className='MacroChart__text'>Average Macro Intake in grams</h2>
        <FlexibleWidthXYPlot height={300} getY={d => d.value} getX={d => d.label} xType={'ordinal'} color="#4fb79b" colorType="literal">
          <XAxis />
          <YAxis tickFormat={d => `${d}g`}/>
          <VerticalGridLines />
          <HorizontalGridLines />
          <VerticalBarSeries
            data={averageMacroData}
            onValueClick={onSelectedChange}
          />
        </FlexibleWidthXYPlot>
      </div>
    );
  }
} 

export default MacroChart;