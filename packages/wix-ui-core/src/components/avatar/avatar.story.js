import {Avatar} from '.';
import {
  avatar,
} from "../../themes/default";

export default {
  category: 'Components',
  storyName: 'WIP - Avatar',
  component: Avatar,
  componentPath: 'avatar.tsx',

  componentProps: {
    name: 'John Doe',
    'data-hook': 'storybook-avatar',
    className: avatar()
  },

};
