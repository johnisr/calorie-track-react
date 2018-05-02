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
    return (
      <div className="WeightChart">
        <FlexibleWidthXYPlot height={400} getX={d => d.date} getY={d => d.weight} xPadding={5} yPadding={20} xType='time' >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
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