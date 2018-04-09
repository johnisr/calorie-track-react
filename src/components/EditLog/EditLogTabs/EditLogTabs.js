import React from 'react';
import { connect } from 'react-redux';
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '../../Tabs';
import AddFoodFormToCurrentLog from './AddFoodFormToCurrentLog/AddFoodFormToCurrentLog';
import EditFoodFormForCurrentLog from './EditFoodFormForCurrentLog/EditFoodFormForCurrentLog';
import FoodListAddCurrentLog from './FoodListAddCurrentLog/FoodListAddCurrentLog';
import FoodListFilters from '../../FoodListFilters';

const EditLogTabs = (props) => (
  <Tabs activeIndex={props.activeIndex}>
    <TabList>
      <Tab>Add from database</Tab>
      <Tab>Add Manually</Tab>
      <Tab>Edit</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <FoodListFilters />
        <FoodListAddCurrentLog />
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