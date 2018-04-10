import React from 'react';
import { connect } from 'react-redux';
import { setFoodNameFilter, sortByUsage, sortByDate, setMaxFoodsShown, setFoodsOffset } from '../../actions/foodsFilters';
import selectFoods from '../../selectors/foods';

export class FoodListFilters extends React.Component {
  handleNameChange = (e) => {
    this.props.setFoodNameFilter(e.target.value);
    this.props.setFoodsOffset(0);
  };
  handleSortChange = (e) => {
    if (e.target.value === 'usage') {
      this.props.sortByUsage();
    } else if (e.target.value === 'date') {
      this.props.sortByDate();
    }
  };
  handleMaxFoodPageChange = (e) => {
    this.props.setMaxFoodsShown(parseInt(e.target.value, 10));
    this.props.setFoodsOffset(0);
  };
  handlePrevPageChange = () => {
    this.props.setFoodsOffset(this.props.filters.offset - 1);
  };
  handleNextPageChange = () => {
    this.props.setFoodsOffset(this.props.filters.offset + 1);
  };
  handleOffsetChange = (i) => {
    this.props.setFoodsOffset(i);

  }

  createPageButtons = () => {
    const foodsLength = this.props.foodsLength;
    const offset = this.props.filters.offset;
    const maxFoodsShown = this.props.filters.maxFoodsShown;

    const pagesNeeded = foodsLength % maxFoodsShown === 0 ?
      foodsLength / maxFoodsShown :
      (foodsLength / maxFoodsShown) + 1;
    
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
    const foodsLength = this.props.foodsLength;
    const offset = this.props.filters.offset;
    const maxFoodsShown = this.props.filters.maxFoodsShown;

    const isLastPage = (offset * maxFoodsShown) + maxFoodsShown >= foodsLength;

    return (
      <div className="foodsFilter">
        <div className="foodsFilter__search">
          <input 
            className="foodsFilter__input"
            type="text"
            placeholder="Search Foods"
            value={this.props.filters.name} 
            onChange={this.handleNameChange}
          />
        </div>
        <div className="foodsFilter__options">
          <select
            className="foodsFilter__select"
            value={this.props.filters.sortBy} 
            onChange={this.handleSortChange}
          >
            <option value="usage">Usage</option>
            <option value="date">Date</option>
          </select>
          <select
            className="foodsFilter__select"
            value={this.props.filters.maxFoodsShown} 
            onChange={this.handleMaxFoodPageChange}
          >
            <option value={1}>1</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>        
        </div>
        <div className="foodsFilter__pages flex-right-end">
          <button
            className={offset <= 0 ? "btn btn--page btn--disabled" : "btn btn--page"}
            onClick={this.handlePrevPageChange}
            disabled={offset <= 0}
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
  const visibleFoods = selectFoods(state.foods, state.foodsFilters);
  return {
    filters: state.foodsFilters,
    foodsLength: visibleFoods.length,
  }
};

const mapDispatchToProps = (dispatch) => ({
  setFoodNameFilter: (name) => dispatch(setFoodNameFilter(name)),
  sortByUsage: () => dispatch(sortByUsage()),
  sortByDate: () => dispatch(sortByDate()),
  setMaxFoodsShown: (max) => dispatch(setMaxFoodsShown(max)),
  setFoodsOffset: (offset) => dispatch(setFoodsOffset(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodListFilters);