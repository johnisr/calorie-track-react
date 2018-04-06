import React from 'react';
import moment from 'moment';

const LogListItem = ({ date, weight, unit, foods, totalCarbohydrates, totalFat, totalProtein, totalCalories}) => (
  <div>
    <p className="listItem__date">{moment(date).format('MMMM Do, YYYY')}</p>
    <p className="listItem__weight">{weight} {unit}</p>
    <p className="listItem__totalCarbohydrates">{totalCarbohydrates}</p>
    <p className="listItem__totalProtein">{totalProtein}</p>
    <p className="listItem__totalFat">{totalFat}</p>
    <p className="listItem__totalCalories">{totalCalories}</p>
  </div>
);

export default LogListItem;
