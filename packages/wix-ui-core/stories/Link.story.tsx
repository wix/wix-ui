import {Link} from '../src/components/Link';

export default {
  category: 'Components',
  storyName: 'Link',

  component: Link,
  componentPath: '../src/components/Link/Link.tsx',

  componentProps: {
    children: 'hello',
    src: 'http://wix.com',
    'data-hook': 'storybook-link'
  }
};
