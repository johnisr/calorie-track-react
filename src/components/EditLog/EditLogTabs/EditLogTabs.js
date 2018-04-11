import React from 'react';
import { connect } from 'react-redux';
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '../../Tabs/Tabs';
import AddFoodFormToCurrentLog from './AddFoodFormToCurrentLog/AddFoodFormToCurrentLog';
import EditFoodFormForCurrentLog from './EditFoodFormForCurrentLog/EditFoodFormForCurrentLog';
import CurrentLogAddFoodListContainer from './CurrentLogAddFoodListContainer/CurrentLogAddFoodListContainer';
import FoodListFilters from '../../FoodListFilters/FoodListFilters';

export const EditLogTabs = (props) => (
  <Tabs activeIndex={props.activeIndex}>
    <TabList>
      <Tab>Add from database</Tab>
      <Tab>Add Manually</Tab>
      <Tab>Edit</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <FoodListFilters />
        <CurrentLogAddFoodListContainer />
      </TabPanel>
      <TabPanel>
        <AddFoodFormToCurrentLog />
      </TabPanel>
      <TabPanel>
        <EditFoodFormForCurrentLog />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

const mapStateToProps = (state, props) => ({
  activeIndex: state.currentLog.editFoodIndex !== undefined ? 2 : 0,
});

export default connect(mapStateToProps)(EditLogTabs);