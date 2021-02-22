import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import offers from './mocks/offers.js';
import reviews from './mocks/reviews.js';

ReactDOM.render(
    <App
      offers={offers}
      reviews={reviews}
    />,
    document.querySelector(`#root`)
);
