import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainPage from '../main-page/main-page.jsx';
import Room from '../offer/offer.jsx';
import SignIn from '../login/login.jsx';
import Favorites from '../favorites/favorites.jsx';
import NotFound from '../not-found/not-found.jsx';
import {PropValidation} from '../../const.js';


const App = (props) => {
  const {offers, reviews} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage
            offers={offers}
            reviews={reviews}
          />
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/offer/:id">
          <Room
            offers={offers}
            reviews={reviews}
          />
        </Route>
        <Route exact path="/favorites">
          <Favorites
            offers={offers.filter((offer) => offer.is_favorite)}
          />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(PropValidation.OFFER),
  reviews: PropTypes.arrayOf(PropValidation.REVIEW)
};

export default App;
