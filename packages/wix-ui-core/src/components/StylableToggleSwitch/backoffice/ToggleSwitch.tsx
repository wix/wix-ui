import * as React from 'react';
import {withStylable} from '../';
import style from './ToggleSwitch.st.css';
import {StylableToggleSwitch} from '../';

const BOStylableToggleSwitch: React.ComponentClass<any> = withStylable(
  StylableToggleSwitch,
  style,
  ({size, skin}) => ({[size]: true, [skin]: true})
);

BOStylableToggleSwitch.defaultProps = {skin: 'standard', size: 'large'};

export default BOStylableToggleSwitch;
