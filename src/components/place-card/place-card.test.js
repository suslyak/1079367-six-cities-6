import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, fireEvent} from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import PlaceCard from './place-card';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const history = createMemoryHistory();

const mockOffer = {
  "bedrooms": 1,
  "city": {
    "location": {
      "latitude": 52.370216,
      "longitude": 4.895168,
      "zoom": 10
    },
    "name": `Amsterdam`
  },
  "host": {
    "avatarUrl": `img/avatar-max.jpg`,
    "id": 1,
    "isPro": false,
    "name": `Max`
  },
  "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
  "description": `room offer`,
  "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
  "id": 1,
  "maxAdults": 40,
  "title": `The house among olive`,
  "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
  "isPremium": false,
  "previewImage": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
  "price": 169,
  "isFavorite": false,
  "rating": 4,
  "type": `room`
};

describe(`Test place card`, () => {
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'PlaceCard' should contain offer info.`, () => {
    const handleCardMouseover = jest.fn();

    const container = render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <PlaceCard
              onCardMouseOver={() => handleCardMouseover}
              key={`card1`}
              offer={mockOffer}
            />
          </Router>
        </redux.Provider>
    );

    expect(container.getByAltText(/Place image/i)).toBeInTheDocument();
    expect(container.getByText(/€169/i)).toBeInTheDocument();
    expect(container.getByText(/Rating/i)).toBeInTheDocument();
    expect(container.getByText(/room/i)).toBeInTheDocument();
    expect(container.getByText(/The house among olive/i)).toBeInTheDocument();
  });

  it(`on mouse over 'PlaceCard' the handler should be called.`, () => {
    const handleCardMouseover = jest.fn();

    const container = render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <PlaceCard
              onCardMouseOver={handleCardMouseover}
              key={`card1`}
              offer={mockOffer}
            />
          </Router>
        </redux.Provider>
    );

    fireEvent.mouseOver(container.getByText(`The house among olive`));
    expect(handleCardMouseover).toBeCalled();
  });

  it(`'PlaceCard' should render Premium status if offer is premium.`, () => {
    const offer = Object.assign(
        {},
        mockOffer,
        {"isPremium": true}
    );
    const handleCardMouseover = jest.fn();

    const container = render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <PlaceCard
              onCardMouseOver={handleCardMouseover}
              key={`card1`}
              offer={offer}
            />
          </Router>
        </redux.Provider>
    );

    expect(container.getByText(/Premium/i)).toBeInTheDocument();
  });

  it(`'PlaceCard' should render 'In bookmarks' status if offer is in bookmarks.`, () => {
    const offer = Object.assign(
        {},
        mockOffer,
        {"isFavorite": true}
    );
    const handleCardMouseover = jest.fn();

    const container = render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <PlaceCard
              onCardMouseOver={handleCardMouseover}
              key={`card1`}
              offer={offer}
            />
          </Router>
        </redux.Provider>
    );

    expect(container.getByText(/In bookmarks/i)).toBeInTheDocument();
  });

  it(`'PlaceCard' should render 'To bookmarks' status if offer not in bookmarks.`, () => {
    const handleCardMouseover = jest.fn();

    const container = render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <PlaceCard
              onCardMouseOver={handleCardMouseover}
              key={`card1`}
              offer={mockOffer}
            />
          </Router>
        </redux.Provider>
    );

    expect(container.getByText(/To bookmarks/i)).toBeInTheDocument();
  });
});
