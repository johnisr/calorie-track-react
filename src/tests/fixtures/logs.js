import moment from 'moment';
import foods from './foods';

export default [{
  date: moment(0).subtract(1, 'day').valueOf(),
  weight: 202,
  unit: 'lb',
  foods: [
    foods[2],
    foods[0],
    foods[1]
  ],
  total: {
    calories: 533,
    carbohydrates: 46.5,
    fat: 18,
    protein: 41.2,
  },
}, {
  date: moment(0).valueOf(),
  weight: 200,
  unit: 'lb',
  foods: [
    foods[0],
    foods[0]
  ],
  total: {
    calories: 410,
    carbohydrates: 88,
    fat: 0.8,
    protein: 8.4,
  },
}, {
  date: moment(0).add(1, 'day').valueOf(),
  weight: 201,
  unit: 'lb',
  foods: [
    foods[0],
    foods[1],
    foods[2]
  ],
  total: {
    calories: 533,
    carbohydrates: 46.5,
    fat: 18,
    protein: 41.2,
  },
}];