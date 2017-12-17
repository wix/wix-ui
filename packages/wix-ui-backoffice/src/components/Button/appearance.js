import {SIZE} from './constants';

const sizeToAppearance = {
  [SIZE.tiny]: 'T4',
  [SIZE.small]: 'T3',
  [SIZE.medium]: 'T1',
  [SIZE.large]: 'T1'
};

const sizeToIconSize = {
  [SIZE.tiny]: '8px',
  [SIZE.small]: '12px',
  [SIZE.medium]: '12px',
  [SIZE.large]: '16px'
};

export const appearance = size => sizeToAppearance[size];

export const iconSize = size => sizeToIconSize[size];
