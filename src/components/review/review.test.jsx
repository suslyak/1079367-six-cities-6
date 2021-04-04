import React from 'react';
import {render, screen} from '@testing-library/react';
import Review from './review';

const mockReview = {
  comment: `What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!`,
  date: `2021-03-07T08:04:28.647Z`,
  id: 2,
  rating: 4,
  user: {"id": 15, "is_pro": false, "name": `Kendall`, "avatarUrl": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/6.jpg`}
};
describe(`Test review`, () => {
  it(`Render 'Review' should contain review info from props`, () => {
    render(
        <Review
          review={mockReview}
          key={`review1`}
        />
    );

    expect(screen.getByText(`What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!`)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
  });
});
