import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import NotFound from './not-found';

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

describe(`Test 404 screen`, () => {
  it(`Render 'NotFound' allways should render 404-message`, () => {
    const history = createMemoryHistory();

    render(
        <Router history={history}>
          <NotFound/>
        </Router>
    );

    expect(screen.getByText(/404. Page not found./i)).toBeInTheDocument();
  });
});
