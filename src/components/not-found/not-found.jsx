import React from 'react';
import Header from '../header/header.jsx';

const NotFound = () => {
  return (
    <div className="page page--gray">
      <Header />
      <main className="page__main">
        <div className="container">
          <h1 style={{"text-align": `center`}}>
            404. Page not found.
          </h1>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
