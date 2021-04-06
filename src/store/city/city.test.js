import {city} from './city';
import {changeCity} from '../action';
import {City} from '../../const';

describe(`Reducer 'city' work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(city(undefined, {}))
      .toEqual({
        city: City[`Paris`]
      });
  });
  it(`Reducer should change city in state`, () =>{
    const state = {
      city: City[`Paris`]
    };

    expect(city(state, changeCity(City[`Amsterdam`])))
      .toEqual({
        city: City[`Amsterdam`]
      });
  });
});
