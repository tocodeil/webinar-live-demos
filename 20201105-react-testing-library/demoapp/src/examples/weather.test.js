import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Weather from './weather';

jest.setTimeout(10000);

test('fetches real weather data', async () => {
  render(<Weather city="Tel Aviv" />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."), { timeout: 5000 });
  screen.debug();
  expect(screen.getByText(/Weather in Tel Aviv/i)).toBeInTheDocument();
});


