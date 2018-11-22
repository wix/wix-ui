import * as React from 'react';

import {Avatar} from '.';
import {
  avatar,
  defaultTheme
} from '../../themes/default';

import User from 'wix-ui-icons-common/User';
import { storySettings } from './storySettings';

const defaultThemeWrapper = ({component})=><div className={defaultTheme}>{component}</div>;

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Avatar,
  componentPath: 'avatar.tsx',

  componentProps: {
    name: 'John Doe',
    'data-hook': 'storybook-avatar',
    className: avatar(),
  },
  componentWrapper: defaultThemeWrapper,
  exampleProps: {
    className: [{label: 'defaultTheme', value: avatar()}],
    placeholder: [{label: 'Icon1', value: <User style={{height: 'inherit', width: 'inherit'}}/>}],
    imgProps: [
      {label: 'image1', value:{src:'https://static.wixstatic.com/media/9ab0d1_8f1d1bd00e6c4bcd8764e1cae938f872~mv1.png'}},
      {label: 'image_non_existing_url', value:{src:'https://static.wixstatic.com/media/123454321.png'}}
    ]
  }

};
