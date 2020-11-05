import { render, screen } from '@testing-library/react';
import SimpleList from './simple_list';

test('render with default render prop', () => {
  const items = ['one', 'two', 'three', 'four'];
  render(<SimpleList items={items} />);
  expect(screen.getByText("one", { selector: 'li' })).toBeInTheDocument();
  expect(screen.getByText("two", { selector: 'li' })).toBeInTheDocument();
  expect(screen.getByText("three", { selector: 'li' })).toBeInTheDocument();
  expect(screen.getByText("four", { selector: 'li' })).toBeInTheDocument();
});

test('render with a custom render props', () => {
  const items = ['one', 'two', 'three', 'four'];
  render(
    <SimpleList
      items={items}
      renderLine={(item, index) => (
        <li key={index}>
          <span className={`item ${index % 2 === 0 ? 'even' : 'odd'}`}>
            {item}
          </span>
        </li>
      )}
    />);
  expect(screen.getByText("one", { selector: 'span.even' })).toBeInTheDocument();
  expect(screen.getByText("two", { selector: 'span.odd' })).toBeInTheDocument();
  expect(screen.getByText("three", { selector: 'span.even' })).toBeInTheDocument();
  expect(screen.getByText("four", { selector: 'span.odd' })).toBeInTheDocument();
});
