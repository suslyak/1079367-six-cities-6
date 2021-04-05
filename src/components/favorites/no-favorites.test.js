import React from 'react';
import {render} from '@testing-library/react';
import NoFavorites from './no-favorites';

describe(`Test no favorites screen`, () => {
  it(`'NoFavorites' should allways render that nothing yet saved.`, () => {
    const container = render(
        <NoFavorites />
    );

    expect(container.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
