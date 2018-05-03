import React from 'react';
import moment from 'moment';
import '../../../../../node_modules/react-vis/dist/style.css';
import {FlexibleWidthXYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, RadialChart, VerticalBarSeries, Hint, LabelSeries } from 'react-vis';
import './MacroTimeChart.css';

class MacroTimeChart extends React.Component {
  state = {
    data: {},
  }
  onDataChange = (value, obj) => {
    this.setState(() => ({data: value }))
  }
  render() {
    console.log(this.state.data[selected]);
    const {data, prevWeekWeight, selected, macroFilter} = this.props;
    const title = `Daily ${selected.charAt(0).toUpperCase()}${selected.slice(1)} Intake`;
    return (
      <div className="MacroTimeChart">
        <h2 className='MacroChart__text'>{title}</h2>
        <FlexibleWidthXYPlot height={400} animation getX={d => d.date} getY={d => d[selected]} xType='time' yPadding={20} >
        <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickLabelAngle={-45}/>
          <YAxis tickFormat={d => `${d}g`} />
          {
            this.state.data[selected] !== undefined &&
            <Hint value={this.state.data}>
              <div style={{background: 'black'}}>
                <h3>{moment(this.state.data.date).format('ll')}</h3>
                <h3>{this.state.data[selected]}g</h3>
              </div>
            </Hint>
          }
          <LineSeries data={data} onNearestX={this.onDataChange}/>
          {selected !== 'protein' &&
            macroFilter.map((number, i) => 
              <LineSeries
                key={i}
                data={[
                  {date: data[0].date, [selected]: number}, 
                  { date: data[data.length - 1].date, [selected]: number},
                ]}
              />)
          }
          {selected === 'protein' &&
            macroFilter.map((number, i) => 
              <LineSeries
                key={i}
                data={[
                  {date: data[0].date, [selected]: prevWeekWeight[prevWeekWeight.length - 1] * number}, 
                  { date: data[data.length - 1].date, [selected]: prevWeekWeight[prevWeekWeight.length - 1] * number},
                ]}
              />)
          }
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}

export default MacroTimeChart;