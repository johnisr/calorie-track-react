import React from 'react';
import { connect } from 'react-redux';
import {Tabs, TabList, Tab, TabPanels, TabPanel} from './Tabs';
import EditFoodFormForFoods from './EditFoodFormForFoods';
import AddFoodFormToFoods from './AddFoodFormToFoods';

const FoodsDisplayTabs = (props) => (
  <div className="row">
    <div className="section__center-6-start-end margin-bottom-small">
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
    </div>
  </div>
);

const mapStateToProps = (state, props) => ({
  activeIndex: state.currentFood.id !== '' ? 1 : 0,
});

export default connect(mapStateToProps)(FoodsDisplayTabs);