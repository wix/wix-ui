import * as React from 'react';
import {withStylable} from '../index';
import style from './ToggleSwitch.st.css';
import {StylableToggleSwitch} from '../index';

const BOStylableToggleSwitch: React.ComponentClass<any> = withStylable(
  StylableToggleSwitch,
  style,
  ({size, skin}) => ({[size]: true, [skin]: true})
);

BOStylableToggleSwitch.defaultProps = {skin: 'standard', size: 'large'};

export default BOStylableToggleSwitch;
