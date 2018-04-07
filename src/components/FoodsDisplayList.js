import React from 'react';
import FoodListDisplayFoods from './FoodListDisplayFoods';
import FoodListFilters from './FoodListFilters';

const FoodsDisplayList = () => (
    <section className="section__center-start-end">
      <FoodListFilters />
      <FoodListDisplayFoods />
    </section>
);

export default FoodsDisplayList;
