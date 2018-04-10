import React from 'react';
import { connect } from 'react-redux';
import LogList from './LogList';
import { addCurrentEditLog } from '../../../actions/currentLog';
import { defaultLog, startAddLog } from '../../../actions/logs';
import selectLogsWithPages from '../../../selectors/logsWithPages';

export class LogListContainer extends React.Component {
  handleEdit = (date) => {
    const log = this.props.logs.filter(log => log.date === date)[0];
    this.props.addCurrentEditLog(log);
    this.props.history.push('/editlog');
  }
  handleCreate = (time) => {
    const date = time.startOf('day').valueOf();
    const log = this.props.logs.filter(log => log.date === date)[0];
    if (!log) {
      const newLog = {
        ...defaultLog,
        date,
      };
      this.props.startAddLog(newLog);
      this.props.addCurrentEditLog(newLog);
    } else {
      this.props.addCurrentEditLog(log);
    }
    this.props.history.push('/editlog');
  }
  render() {
    return (
      <LogList
        logs={this.props.logs}
        onEdit={(date) => this.handleEdit(date)}
        onCreate={(time) => this.handleCreate(time)}
      />
    );
  }
}  

const mapStateToProps = (state) => ({
  logs: selectLogsWithPages(state.logs, state.logsFilters),
});

const mapDispatchToProps = (dispatch) => ({
  startAddLog: (log) => dispatch(startAddLog(log)),
  addCurrentEditLog: (log) => dispatch(addCurrentEditLog(log)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogListContainer);
