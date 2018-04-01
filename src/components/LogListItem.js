import React from 'react';
import moment from 'moment';

const LogListItem = ({ date, weight, unit, foods, totalCarbohydrates, totalFat, totalProtein, totalCalories}) => (
  <div>
    <p>{moment(date).format('MMMM Do, YYYY')} - {weight} {unit}</p>
    <p>C: {totalCarbohydrates} P: {totalProtein} F:{totalFat} C: {totalCalories}</p>
  </div>
);

export default LogListItem;
