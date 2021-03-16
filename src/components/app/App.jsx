import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainPage from '../main-page/main-page.jsx';
import Room from '../offer/offer.jsx';
import SignIn from '../login/login.jsx';
import Favorites from '../favorites/favorites.jsx';
import NotFound from '../not-found/not-found.jsx';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage
            reviews = {[]}
          />
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/offer/:id">
          <Room/>
        </Route>
        <Route exact path="/favorites">
          <Favorites/>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
