import React from 'react';
import { connect } from 'react-redux';
import CurrentLog from './CurrentLog';
import AddFoodFormToCurrentLog from './AddFoodFormToCurrentLog';
import EditFoodFormForCurrentLog from './EditFoodFormForCurrentLog';
import FoodListAddCurrentLog from './FoodListAddCurrentLog';
import FoodListFilters from './FoodListFilters';
import Header from '../components/Header';
import { history } from '../routers/AppRouter';

class EditLog extends React.Component {
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  render() {
    return (
      <div>
        <Header history={history}/>
        <h1>EDIT FOOD</h1>
        {
          this.isEmpty(this.props.currentLog) ? (
            <p>Select a Log from Log dashboard to edit</p>
          ) : (
            <div>
              <CurrentLog history={history} />
              <FoodListFilters />
              <FoodListAddCurrentLog />
              <AddFoodFormToCurrentLog />
              <EditFoodFormForCurrentLog />
            </div>
          )
        }
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  currentLog: state.currentLog,
});

export default connect(mapStateToProps)(EditLog);