import { render } from '@testing-library/react';
import { storyPage } from './story-page';

const defaultStoryConfig = {} as any;

describe.skip('StoryPage', () => {
  it('should render only do when dont is not defined', () => {
    const props = {} as any;
    const { container } = render(storyPage(props, defaultStoryConfig));

    expect(container.querySelector('[data-hook=""]')).toBe(true);
    expect(container.querySelector('[data-hook=""]')).toBe(null);
  });
});
