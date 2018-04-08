import React from 'react';
import moment from 'moment';

const LogListItem = ({ date, weight, unit, foods, totalCarbohydrates, totalFat, totalProtein, totalCalories}) => (
  <div className="listItem">
    <p className="listItem__text">{moment(date).format('MMMM Do, YYYY')}</p>
    <p className="listItem__text">{weight} {unit}</p>
    <p className="listItem__text">{totalCarbohydrates}</p>
    <p className="listItem__text">{totalProtein}</p>
    <p className="listItem__text">{totalFat}</p>
    <p className="listItem__text">{totalCalories}</p>
  </div>
);

export default LogListItem;
