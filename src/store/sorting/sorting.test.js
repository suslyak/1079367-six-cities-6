import {sorting} from './sorting';
import {
  ActionType
} from '../action';
import {Sorting} from '../../const.js';

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(sorting(undefined, {}))
      .toEqual({
        currentOffersSortingType: Object.keys(Sorting)[0]
      });
  });

  it(`Reducer should set current sorting type in state`, () => {
    const state = {
      currentOffersSortingType: Object.keys(Sorting)[0]
    };

    const changeSorting = {
      type: ActionType.CHANGE_SORTING,
      payload: Object.keys(Sorting)[3]
    };

    expect(sorting(state, changeSorting))
      .toEqual({
        currentOffersSortingType: Object.keys(Sorting)[3]
      });
  });
});
