import React from 'react';
import {render, screen} from '@testing-library/react';
import LoadingScreen from './loading-screen';


describe(`Test loading screen`, () => {
  it(`Render 'LoadingScreen' allways should render image with spinner`, () => {
    render(
        <LoadingScreen />
    );

    expect(screen.getByAltText(/loading in process/i)).toBeInTheDocument();
  });
});
