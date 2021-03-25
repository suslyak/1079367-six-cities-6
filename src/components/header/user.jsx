import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/api-actions';
import {AuthorizationStatus} from '../../const';

const User = () => {
  const {authorizationStatus, AuthInfo} = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  const handleUserNameClick = (evt) => {
    evt.preventDefault();
    dispatch(logout());
  };

  if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
    return (
      <Link className="header__nav-link header__nav-link--profile" to="/login">
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__login">Sign in</span>
      </Link>
    );
  }

  return (
    <a className="header__nav-link header__nav-link--profile" href="#" onClick={handleUserNameClick}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__user-name user__name">{AuthInfo.email}</span>
    </a>
  );
};

export default User;
