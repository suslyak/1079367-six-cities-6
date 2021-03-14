import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import App from './components/app/app';
import reviews from './mocks/reviews.js';
import {reducer} from './store/reducer';

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

ReactDOM.render(
    <Provider store={store}>
      <App
        reviews={reviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);
