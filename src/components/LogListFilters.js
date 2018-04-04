import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setStartDate, setEndDate, sortByNewest, sortByOldest, setMaxLogsShown, setLogsOffset } from '../actions/logsFilters';
import selectLogs from '../selectors/logs';

export class FoodListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };
  handleSortChange = (e) => {
    if (e.target.value === 'newest') {
      this.props.sortByNewest();
    } else if (e.target.value === 'oldest') {
      this.props.sortByOldest();
    }
  }
  handleMaxLogsPageChange = (e) => {
    this.props.setMaxLogsShown(parseInt(e.target.value, 10));
    this.props.setLogsOffset(0);
  };
  handlePrevPageChange = () => {
    this.props.setLogsOffset(this.props.filters.offset - 1);
  };
  handleNextPageChange = () => {
    this.props.setLogsOffset(this.props.filters.offset + 1);
  };
  handleOffsetChange = (i) => {
    this.props.setLogsOffset(i);
  }

  createPageButtons = () => {
    const logsLength = this.props.logsLength;
    const offset = this.props.filters.offset;
    const maxLogsShown = this.props.filters.maxLogsShown;

    const pagesNeeded = logsLength % maxLogsShown === 0 ?
      logsLength / maxLogsShown :
      (logsLength / maxLogsShown) + 1;
    
    let start;
    if (pagesNeeded - offset < 5) { // reaching end of results 
      start = Math.max(0, pagesNeeded - 10);
    } else { // Normal case
      start = Math.max(0, offset - 5);
    }

    let end;
    if (start === 0) { // pages 1 .. (pagesNeeded or 10)
      end = Math.min(pagesNeeded - 1, 10); // count starts from 0
    } else { // Normal case
      end = Math.min(offset + 5, pagesNeeded);
    }

    const pageButtons = [];
    for (let i = start; i < end; i++) {
      pageButtons.push(
        <button
        key={i}
        onClick={() => this.handleOffsetChange(i)}
        disabled={i === this.props.filters.offset}
        >{i + 1}</button>)
    }
    return pageButtons;
  }
  
  render() {
    const logsLength = this.props.logsLength;
    const offset = this.props.filters.offset;
    const maxLogsShown = this.props.filters.maxLogsShown;

    const isLastPage = (offset * maxLogsShown) + maxLogsShown >= logsLength;

    return (
      <div>
        <DateRangePicker 
          startDate={this.props.filters.startDate}
          startDateId={'startDate'}
          endDate={this.props.filters.endDate}
          endDateId={'endDate'}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDates={true}
        />
        <select
          className="select"
          value={this.props.filters.sortBy} 
          onChange={this.handleSortChange}
        >
          <option value="newest">newest</option>
          <option value="oldest">oldest</option>
        </select>
        <select
          className="select"
          value={this.props.filters.maxLogsShown} 
          onChange={this.handleMaxLogsPageChange}
        >
          <option value={7}>7</option>
          <option value={14}>14</option>
          <option value={31}>31</option>
        </select>
        <button 
          onClick={this.handlePrevPageChange}
          disabled={this.props.filters.offset <= 0}
        >
          Prev Page
        </button>
        {this.createPageButtons()}
        <button 
          onClick={this.handleNextPageChange}
          disabled={isLastPage}
        >
          Next Page
        </button>
      </div>
    );
  };
}

const mapStateToProps = state => {
  const visibleLogs = selectLogs(state.logs, state.logsFilters);
  return {
    filters: state.logsFilters,
    logsLength: visibleLogs.length,
  }
};

const mapDispatchToProps = (dispatch) => ({
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  sortByNewest: () => dispatch(sortByNewest()),
  sortByOldest: () => dispatch(sortByOldest()),
  setMaxLogsShown: (max) => dispatch(setMaxLogsShown(max)),
  setLogsOffset: (offset) => dispatch(setLogsOffset(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodListFilters);