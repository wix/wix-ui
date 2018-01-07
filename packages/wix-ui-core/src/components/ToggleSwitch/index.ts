import ToggleSwitchComponent, {ToggleSwitchProps} from './ToggleSwitch';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import {ThemedComponentProps} from 'wix-ui-jss';
import * as React from 'react';
import {WixComponentProps} from '../../createHOC/index';

export {ToggleSwitchProps};
export const ToggleSwitch = withClasses(ToggleSwitchComponent, styles) as React.ComponentClass<ToggleSwitchProps & ThemedComponentProps & WixComponentProps>;
export default ToggleSwitch;
