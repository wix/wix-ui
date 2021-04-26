import * as React from 'react';
import { render } from '@testing-library/react';
import { DoDont } from './DoDont';

const doList = [
  'Use it to insert names, titles and other short textual information.',
  'Use it to build custom inputs like Credit Card input.',
];

describe('DoDont', () => {
  it('should render only do when dont is not defined', () => {
    const props = {
      do: { list: doList },
    };
    const { container } = render(<DoDont {...props} />);

    expect(container.querySelector('[data-hook="dodont-do"]')).toBeTruthy();
    expect(container.querySelector('[data-hook="dodont-dont"]')).toBe(null);
  });

  it('should render only dont when do is not defined', () => {
    const props = {
      dont: { list: doList },
    };
    const { container } = render(<DoDont {...props} />);

    expect(container.querySelector('[data-hook="dodont-dont"]')).toBeTruthy();
    expect(container.querySelector('[data-hook="dodont-do"]')).toBe(null);
  });

  it('should have title for do by default', () => {
    const props = {
      do: { list: doList },
    };
    const container = render(<DoDont {...props} />);

    expect(container.getByText('Do').textContent).toBe('Do');
  });

  it('should have title for dont by default', () => {
    const props = {
      dont: { list: doList },
    };
    const container = render(<DoDont {...props} />);

    expect(container.getByText(`Don't`).textContent).toBe(
      `Don't`,
    );
  });
});
