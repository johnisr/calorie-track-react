import React from 'react';
import FoodListContainer from './FoodListContainer/FoodListContainer';
import FoodListFilters from '../FoodListFilters';
import FoodsDisplayTabs from './FoodsDisplayTabs/FoodsDisplayTabs';
import Header from '../Header/Header';
import { history } from '../../routers/AppRouter';

const Foods = () => (
  <div className="container">
  <div className="row">
    <section className="section__full-start-end">
      <Header history={history}/>
    </section>
    <section className="section__center-start-end">
      <FoodListFilters />
    </section>
    <section className="section__center-6-start-end">
      <FoodListContainer />
    </section>
    <section className="section__center-6-start-end margin-bottom-large">
      <FoodsDisplayTabs />
    </section>
  </div>
  </div>
);

export default Foods;