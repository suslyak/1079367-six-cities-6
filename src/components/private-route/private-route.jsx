import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AuthorizationStatus} from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import Header from '../header/header';

const PrivateRoute = ({render, path, exact}) => {
  const {authorizationStatus, authorizationInProcess} = useSelector((state) => state.USER);

  if (authorizationInProcess) {
    return (
      <div className='page page--main page__main--index-empty'>
        <Header />
        <main className='page__main page__main--index'>
          <div style={{textAlign: `center`}}>
            <h1>Authorization in process</h1>
            <LoadingScreen />
          </div>
        </main>
      </div>
    );
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(routeProps)
            : <Redirect to={`/login`} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;
