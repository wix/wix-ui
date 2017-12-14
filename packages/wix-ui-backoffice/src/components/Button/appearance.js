import {SIZE} from './constants';

const sizeToAppearance = {
  [SIZE.tiny]: 'T4',
  [SIZE.small]: 'T3',
  [SIZE.medium]: 'T1',
  [SIZE.large]: 'T1'
};

export const appearance = size =>
  sizeToAppearance[size];
