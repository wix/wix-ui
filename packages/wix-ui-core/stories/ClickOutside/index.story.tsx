import { Category } from '../utils';
import { ClickOutsideStory } from './ClickOutside-story';

export default {
  category: Category.COMPONENTS,
  storyName: 'ClickOutside',

  component: ClickOutsideStory,
  componentPath: '../../src/components/click-outside',

  componentProps: setState => ({
    clickOutsideCallback: () => {},
    excludeClass: '',
  }),

  exampleProps: {},

  codeExample: false,
};
