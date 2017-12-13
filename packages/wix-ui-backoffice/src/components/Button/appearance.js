import {SIZE} from './constants';

const sizeToAppearance = {
  [SIZE.small]: 't3',
  [SIZE.medium]: 't1',
  [SIZE.large]: 't1'
};

export const appearance = size =>
  sizeToAppearance[size];
