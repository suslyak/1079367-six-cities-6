import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import Header from './header';

jest.mock(`./user.jsx`, () => {
  const mockUser = () => <div>This is mock User.</div>;
  mockUser.displayName = `mockUser`;

  return {
    __esModule: true,
    default: () => {
      return mockUser();
    }
  };
});

describe(`Test header`, () => {
  it(`Render 'Header' should allways contain logo and user component.`, () => {
    const history = createMemoryHistory();
    const container = render(
        <Router history={history}>
          <Header />
        </Router>
    );

    expect(container.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(container.getByText(/This is mock User./i)).toBeInTheDocument();
  });
});
