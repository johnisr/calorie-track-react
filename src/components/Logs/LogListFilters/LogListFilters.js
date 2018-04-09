import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {
  setStartDate,
  setEndDate,
  sortByNewest,
  sortByOldest,
  setMaxLogsShown,
  setLogsOffset
} from '../../../actions/logsFilters';
import selectLogs from '../../../selectors/logs';

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
    if (pagesNeeded - offset < 3) { // reaching end of results 
      start = Math.max(0, pagesNeeded - 6);
    } else { // Normal case
      start = Math.max(0, offset - 3);
    }

    let end;
    if (start === 0) { // pages 1 .. (pagesNeeded or 10)
      end = Math.min(pagesNeeded - 1, 6); // count starts from 0
    } else { // Normal case
      end = Math.min(offset + 3, pagesNeeded);
    }

    const pageButtons = [];
    for (let i = start; i < end; i++) {
      pageButtons.push(
        <button
        className={this.props.filters.offset === i ? 'btn btn--page btn--active' : 'btn btn--page'}
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
      <div className="logsFilter">
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
        <div className="logsFilter__options">
          <select
            className="logsFilter__select"
            value={this.props.filters.sortBy} 
            onChange={this.handleSortChange}
          >
            <option value="newest">new</option>
            <option value="oldest">old</option>
          </select>
          <select
            className="logsFilter__select"
            value={this.props.filters.maxLogsShown} 
            onChange={this.handleMaxLogsPageChange}
          >
            <option value={1}>1</option>
            <option value={7}>7</option>
            <option value={14}>14</option>
            <option value={31}>31</option>
          </select>
        </div>
        <div className="foodsFilter__pages flex-right-end">
          <button
            className={offset <= 0 ? "btn btn--page btn--disabled" : "btn btn--page"}
            onClick={this.handlePrevPageChange}
            disabled={this.props.filters.offset <= 0}
          >
            Prev
          </button>
          {this.createPageButtons()}
          <button 
            className={isLastPage ? "btn btn--page btn--disabled" : "btn btn--page"}
            onClick={this.handleNextPageChange}
            disabled={isLastPage}
          >
            Next
          </button>
        </div>
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