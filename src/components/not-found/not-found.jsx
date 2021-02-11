import React from 'react';
import Header from '../header/header.jsx';

const NotFound = () => {
  return (
    <div className="page page--gray">
      <Header />
      <main className="page__main">
        404. Page not found.
      </main>
    </div>
  );
};

export default NotFound;
