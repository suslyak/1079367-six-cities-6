import {map} from './map';
import {changeCurrentOffer} from '../action';

describe(`Reducer 'map' work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(map(undefined, {}))
      .toEqual({mouseHoverOffer: null});
  });
  it(`Reducer should change current offer for map`, () =>{
    const state = {
      mouseHoverOffer: null
    };

    expect(map(state, changeCurrentOffer(101)))
      .toEqual({mouseHoverOffer: 101});
  });
});
