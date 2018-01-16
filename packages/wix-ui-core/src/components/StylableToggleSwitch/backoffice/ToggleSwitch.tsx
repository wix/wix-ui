import CoreToggleSwitch from '../ToggleSwitch';
import style from './ToggleSwitch.st.css';
import {withStylable} from '../../../withStylable';

export const ToggleSwitch: any = withStylable(
  CoreToggleSwitch,
  style,
  ({size, skin}) => ({[size]: true, [skin]: true})
);

ToggleSwitch.defaultProps = {skin: 'standard', size: 'large'};
