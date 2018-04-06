import React from 'react';
import FoodListDisplayFoods from './FoodListDisplayFoods';
import FoodListFilters from './FoodListFilters';

const FoodsDisplayList = () => (
    <section className="row">
      <FoodListFilters />
      <FoodListDisplayFoods />
    </section>
);

export default FoodsDisplayList;
