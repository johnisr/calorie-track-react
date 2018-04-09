import React from 'react';
import { connect } from 'react-redux';
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '../../Tabs/Tabs';
import EditFoodFormForFoods from './EditFoodFormForFoods/EditFoodFormForFoods';
import AddFoodFormToFoods from './AddFoodFormToFoods/AddFoodFormToFoods';

const FoodsDisplayTabs = (props) => (
  <Tabs activeIndex={props.activeIndex}>
    <TabList>
      <Tab>Add</Tab>
      <Tab>Edit</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <AddFoodFormToFoods />
      </TabPanel>
      <TabPanel>
        <EditFoodFormForFoods />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

const mapStateToProps = (state, props) => ({
  activeIndex: state.currentFood.id !== '' ? 1 : 0,
});

export default connect(mapStateToProps)(FoodsDisplayTabs);