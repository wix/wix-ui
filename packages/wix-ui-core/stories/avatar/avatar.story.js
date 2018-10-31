import {Avatar} from '../../src/components/avatar';
import {
  avatar,
} from "../../src/themes/default";


export default {
  category: 'Components',
  storyName: 'WIP - Avatar',
  component: Avatar,
  componentPath: '../../src/components/Avatar/Avatar.tsx',

  componentProps: {
    name: 'John Doe',
    'data-hook': 'storybook-avatar',
    className: avatar()
  },

};
