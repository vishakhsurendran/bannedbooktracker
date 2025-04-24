import { render, screen } from '@testing-library/react';
import App from "../App"
import {BrowserRouter} from "react-router";
import BookDetails from '../pages/BookDetails'
import {MemoryRouter} from 'react-router'
import SearchPage from "../pages/SearchPage";

//Test that the app is rendering correctly
test('renders learn react link', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getByText(/HOME/i);
  expect(linkElement).toBeInTheDocument();
});


jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({
    state: null
  }),
  useNavigate: () => jest.fn(),
}));

test('renders BookDetails component without book data', () => {
  render(
    <MemoryRouter>
      <BookDetails />
    </MemoryRouter>
  );

  expect(screen.getByText(/No book data available/i)).toBeInTheDocument();
});


jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({
    search: '', // No query
  }),
}));

test('renders SearchPage with no query', () => {
  render(
    <MemoryRouter>
      <SearchPage />
    </MemoryRouter>
  );

  expect(screen.getByText(/Search Results for ""/i)).toBeInTheDocument();
  expect(screen.getByText(/No results found./i)).toBeInTheDocument();
});