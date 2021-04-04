import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../header/header.jsx';

const NotFound = () => {
  return (
    <div className="page page--gray">
      <Header />
      <main className="page__main">
        <div className="container">
          <h1 style={{"textAlign": `center`}}>
            404. Page not found.
          </h1>
          <div style={{display: `block`, width: `100%`, textAlign: `center`}}>
            <Link className="footer__logo-link" to="/">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
