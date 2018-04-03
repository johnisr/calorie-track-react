import React from 'react';
import { connect } from 'react-redux';
import { setFoodNameFilter, sortByUsage, sortByDate, setMaxFoodsShown, setOffset } from '../actions/foodsFilters';

export class FoodListFilters extends React.Component {
  handleNameChange = (e) => {
    this.props.setFoodNameFilter(e.target.value);
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
    this.props.setOffset(0);
  };
  handlePrevPageChange = () => {
    this.props.setOffset(this.props.filters.offset - 1);
  };
  handleNextPageChange = () => {
    this.props.setOffset(this.props.filters.offset + 1);
  };
  
  render() {
    const isLastPage = 
      this.props.filters.offset *
      this.props.filters.maxFoodsShown +
      this.props.filters.maxFoodsShown >=
      this.props.foodsLength;
    return (
      <div>
        <input 
          type="text"
          placeholder="Search Foods"
          value={this.props.filters.name} 
          onChange={this.handleNameChange}
        />
        <select
          className="select"
          value={this.props.filters.sortBy} 
          onChange={this.handleSortChange}
        >
          <option value="usage">Usage</option>
          <option value="date">Date</option>
        </select>
        <select
          className="select"
          value={this.props.filters.maxFoodsShown} 
          onChange={this.handleMaxFoodPageChange}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <button 
          onClick={this.handlePrevPageChange}
          disabled={this.props.filters.offset <= 0}>Prev Page</button>
        <button 
          onClick={this.handleNextPageChange}
          disabled={isLastPage}>Next Page</button>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  filters: state.foodsFilters,
  foodsLength: state.foods.length,
});

const mapDispatchToProps = (dispatch) => ({
  setFoodNameFilter: (name) => dispatch(setFoodNameFilter(name)),
  sortByUsage: () => dispatch(sortByUsage()),
  sortByDate: () => dispatch(sortByDate()),
  setMaxFoodsShown: (max) => dispatch(setMaxFoodsShown(max)),
  setOffset: (offset) => dispatch(setOffset(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodListFilters);