import {city} from './city';
import {changeCity} from '../action';
import {City} from '../../const';

describe(`Reducer 'city' work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(city(undefined, {}))
      .toEqual({
        city: {
          "name": City[`Paris`].name,
          "lat": City[`Paris`].coords[0],
          "lng": City[`Paris`].coords[1],
          "zoom": 12
        }
      });
  });
  it(`Reducer should change city in state`, () =>{
    const state = {
      city: {
        "name": City[`Paris`].name,
        "lat": City[`Paris`].coords[0],
        "lng": City[`Paris`].coords[1],
        "zoom": 12
      }
    };

    expect(city(state, changeCity(`Amsterdam`)))
      .toEqual({
        city: {
          "name": City[`Amsterdam`].name,
          "lat": City[`Amsterdam`].coords[0],
          "lng": City[`Amsterdam`].coords[1],
          "zoom": 12
        }
      });
  });
});
