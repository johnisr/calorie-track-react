import moment from 'moment';
import foods from './foods';

export default [{
  date: moment(0).valueOf(),
  weight: 200,
  unit: 'lb',
  foods: [
    foods[0],
    foods[0]
  ],
}, {
  date: moment(0).add(1, 'day').valueOf(),
  weight: 201,
  unit: 'lb',
  foods: [
    foods[0],
    foods[1],
    foods[2]
  ],
}, {
  date: moment(0).subtract(1, 'day').valueOf(),
  weight: 202,
  unit: 'lb',
  foods: [
    foods[2],
    foods[0],
    foods[1]
  ],
}];