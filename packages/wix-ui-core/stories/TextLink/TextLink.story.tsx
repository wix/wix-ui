import {TextLink} from '../../src/components/TextLink';

export default {
  category: 'Components',
  storyName: 'TextLink',

  component: TextLink,
  componentPath: '../../src/components/TextLink',

  componentProps: () => ({
    'data-hook': 'storybook-text-link',
    children: 'I want you to click',
    target: '_blank',
    href: 'https://wix.com'
  })
};
