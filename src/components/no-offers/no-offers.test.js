import React from 'react';
import {render, screen} from '@testing-library/react';
import NoOffers from './no-offers';

describe(`Test no-offers screen`, () => {
  it(`Render 'NoOffers' allways should render no-offers message for city got from props`, () => {
    render(
        <NoOffers
          city={`New York`}
        />
    );

    expect(screen.getByText(/New York/i)).toBeInTheDocument();
  });
});
