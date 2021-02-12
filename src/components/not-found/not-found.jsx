import React from 'react';
import Header from '../header/header.jsx';

const NotFound = () => {
  return (
    <div className="page page--gray">
      <Header />
      <main className="page__main">
        <div className="container">
          <b>404. Page not found.</b>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
