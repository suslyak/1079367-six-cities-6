import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import SortingFiltersList from './sorting-filters-list';

jest.mock(`../../const.js`, () => ({
  Sorting: {
    ONE: `filterOne`,
    TWO: `filterTwo`,
    THREE: `filterThree`,
  }
}));

describe(`Test sorting filter list`, () => {

  it(`Render 'SortingFiltersLister' contain filters Sorting cons`, () => {
    const handleSortingClick = jest.fn();

    render(
        <SortingFiltersList
          isOpened={true}
          currentSorting={`filterOne`}
          onHandlerClick={handleSortingClick}
        />
    );

    expect(screen.getByText(`filterOne`)).toBeInTheDocument();
    expect(screen.getByText(`filterTwo`)).toBeInTheDocument();
    expect(screen.getByText(`filterThree`)).toBeInTheDocument();
  });

  it(`Rendered filter tabs should have onClick handlers`, () => {
    const handleSortingClick = jest.fn();

    render(
        <SortingFiltersList
          isOpened={true}
          currentSorting={`filterOne`}
          onHandlerClick={handleSortingClick}
        />
    );

    const filterOneTab = screen.getByText(`filterOne`);
    const filterTwoTab = screen.getByText(`filterTwo`);
    const filterThreeTab = screen.getByText(`filterThree`);

    fireEvent.click(filterOneTab);
    fireEvent.click(filterTwoTab);
    fireEvent.click(filterThreeTab);
    expect(handleSortingClick).toHaveBeenCalledTimes(3);
  });
});

