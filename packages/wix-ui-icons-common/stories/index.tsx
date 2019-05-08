import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {IconsStory , ICON_TYPES, ICON_SIZES} from './Icons';

Object.keys(ICON_TYPES)
  .forEach(type => Object.keys(ICON_SIZES)
    .forEach(size => storiesOf(`Icons/${ICON_TYPES[type]}`, module)
      .add(ICON_SIZES[size], () => <IconsStory type={ICON_TYPES[type]} size={ICON_SIZES[size]} />)));
