import { render, screen } from '@testing-library/react';
import App from "../App"
import {BrowserRouter} from "react-router";

test('renders learn react link', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getByText(/HOME/i);
  expect(linkElement).toBeInTheDocument();
});