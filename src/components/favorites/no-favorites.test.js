import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render} from '@testing-library/react';
import NoFavorites from './no-favorites';

jest.mock(`../header/header.jsx`, () => {
  const mockHeader = () => <div>This is mock Header</div>;
  mockHeader.displayName = `mockHeader`;

  return {
    __esModule: true,
    default: () => {
      return mockHeader();
    }
  };
});

describe(`Test no favorites screen`, () => {
  it(`'NoFavorites' should allways render that nothing yet saved.`, () => {
    let history = createMemoryHistory();
    const container = render(
        <Router history={history}>
          <NoFavorites />
        </Router>
    );

    expect(container.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
