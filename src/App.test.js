import { render, screen } from '@testing-library/react';
import App from './App';
import HomePage from './App';

describe("app", () => {
  test('renders the app and find the title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Products/i);
    expect(titleElement).toBeInTheDocument();
  });

  describe("home page renders filters", () => {
    test('page renders 3 filter items', () => {
      render(<HomePage />);
      const sortingElement = screen.getByText(/Sorting/i);
      const brandsElement = screen.getByText(/Brands/i);
      const tagsElement = screen.getByText(/Tags/i);
      expect(sortingElement).toBeInTheDocument();
      expect(brandsElement).toBeInTheDocument();
      expect(tagsElement).toBeInTheDocument();
    });
  });
});

