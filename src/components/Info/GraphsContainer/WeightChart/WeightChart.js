import React from 'react';
import moment from 'moment';
import '../../../../../node_modules/react-vis/dist/style.css';
import {
  FlexibleWidthXYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Hint
} from 'react-vis';
import './WeightChart.css';


class WeightChart extends React.Component {
  state = {
    data: {},
  }
  onDataChange = (value, obj) => {
    this.setState(() => ({data: value }))
  }
  render() {
    const title = 'Daily Weight';
    return (
      <div className="WeightChart">
        <h2 className='MacroChart__text'>{title}</h2>
        <FlexibleWidthXYPlot height={400} getX={d => d.date} getY={d => d.weight} xPadding={5} yPadding={20} xType='time' >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickLabelAngle={-45}/>
          <YAxis tickFormat={d => `${d}`}/>
          { this.state.data.weight !== undefined &&
            <Hint value={this.state.data}>
              <div style={{background: 'black'}}>
                <h3>{moment(this.state.data.date).format('ll')}</h3>
                <h3>{this.state.data.weight} lbs</h3>
              </div>
            </Hint>
          }
          <LineSeries
            data={this.props.data}
            onNearestX={this.onDataChange}
          />
        </FlexibleWidthXYPlot>
      </div>
    );
  }
} 

export default WeightChart;