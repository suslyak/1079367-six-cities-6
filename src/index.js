import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  PLACES_COUNT: 5
};

ReactDOM.render(
    <App
      placesCount={Setting.PLACES_COUNT}
    />,
    document.querySelector(`#root`)
);
