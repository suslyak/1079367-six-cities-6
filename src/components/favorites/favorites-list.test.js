import React from 'react';
import {render, screen} from '@testing-library/react';
import FavoritesList from './favorites-list';

const mockOffers = [
  {
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
    "rating": 3,
    "type": `room`
  },
  {
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
    "title": `The Joshua Tree House`,
    "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
    "isPremium": false,
    "previewImage": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
    "price": 250,
    "isFavorite": false,
    "rating": 5,
    "type": `room`
  },
  {
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
    "title": `Canal View Prinsengracht`,
    "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
    "isPremium": false,
    "previewImage": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
    "price": 450,
    "isFavorite": false,
    "rating": 4,
    "type": `room`
  }
];

jest.mock(`../place-card/place-card.jsx`, () => {
  const mockPlaceCard = () => <div>I am mock PlaceCard.</div>;
  mockPlaceCard.displayName = `mockPlaceCard`;

  return {
    __esModule: true,
    default: () => {
      return mockPlaceCard();
    }
  };
});

describe(`Test favorites List`, () => {

  it(`Render 'Favorites List' should contain the number of given in props offers`, () => {
    render(
        <FavoritesList
          offers={mockOffers}
        />
    );

    const cards = screen.getAllByText(/I am mock PlaceCard./i);

    expect(cards[0]).toBeInTheDocument();
    expect(cards).toHaveLength(3);
  });
});

