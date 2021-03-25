import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainPage from '../main-page/main-page.jsx';
import Room from '../offer/offer.jsx';
import SignIn from '../login/login.jsx';
import Favorites from '../favorites/favorites.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import NotFound from '../not-found/not-found.jsx';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage
          />
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/offer/:id">
          <Room/>
        </Route>
        <PrivateRoute exact
          path="/favorites"
          render={() => <Favorites />}
        >
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
