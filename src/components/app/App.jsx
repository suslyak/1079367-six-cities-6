import React from 'react';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import MainPage from '../main-page/main-page.jsx';
import Room from '../offer/offer.jsx';
import SignIn from '../login/login.jsx';
import Favorites from '../favorites/favorites.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import NotFound from '../not-found/not-found.jsx';
import browserHistory from '../../browser-history';
import {AppRoute} from '../../const';

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainPage
          />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <SignIn />
        </Route>
        <Route
          exact
          path={AppRoute.ROOM}
          render={(paramsToProps) => <Room {...paramsToProps.match.params} />}
        >
        </Route>
        <PrivateRoute exact
          path={AppRoute.FAVORITES}
          render={() => <Favorites />}
        >
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
        <Route exact path={AppRoute.NOT_FOUND}>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
