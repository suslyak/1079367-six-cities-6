import {combineReducers} from 'redux';
import {city} from './city/city';
import {offers} from './offers/offers';
import {reviews} from './reviews/reviews';
import {sorting} from './sorting/sorting';
import {map} from './map/map';

export const NameSpace = {
  CITY: `CITY`,
  OFFERS: `OFFERS`,
  REVIEWS: `REVIEWS`,
  SORTING: `SORTING`,
  MAP: `MAP`
};

export default combineReducers({
  [NameSpace.CITY]: city,
  [NameSpace.OFFERS]: offers,
  [NameSpace.REVIEWS]: reviews,
  [NameSpace.SORTING]: sorting,
  [NameSpace.MAP]: map
});
