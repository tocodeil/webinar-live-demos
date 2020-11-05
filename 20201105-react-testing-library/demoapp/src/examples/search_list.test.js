import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import SearchList from './search_list';

test('render shows all items', () => {
  const items = ['one', 'two', 'three', 'four'];
  render(<SearchList items={items} />);
  expect(screen.getByText("one", { selector: 'li' })).toBeInTheDocument();
  expect(screen.getByText("two", { selector: 'li' })).toBeInTheDocument();
  expect(screen.getByText("three", { selector: 'li' })).toBeInTheDocument();
  expect(screen.getByText("four", { selector: 'li' })).toBeInTheDocument();
});

test('can filter by item text', () => {
  const items = ['one', 'two', 'only', 'four'];
  render(<SearchList items={items} />);
  userEvent.type(screen.getByRole('searchbox'), 'on');
  expect(screen.getByText("one", { selector: 'li' })).toBeInTheDocument();
  expect(screen.queryByText("two", { selector: 'li' })).not.toBeInTheDocument();
  expect(screen.getByText("only", { selector: 'li' })).toBeInTheDocument();
  expect(screen.queryByText("four", { selector: 'li' })).not.toBeInTheDocument();
});



