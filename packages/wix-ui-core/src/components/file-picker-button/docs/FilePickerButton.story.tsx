import * as React from 'react';
import { FilePickerButton } from '..';
import { storySettings } from './storySettings';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: FilePickerButton,
  componentPath: '../FilePickerButton.tsx',
  componentProps: {
    'data-hook': storySettings.dataHook,
    children: '+ Choose a File',
    accept: '.jpeg,.png,.jpg',
  },
  exampleProps: {
    onChange: files =>
      `Triggered onChange with "${files.map(f => f.name).join(',')}"`,
  },
};
