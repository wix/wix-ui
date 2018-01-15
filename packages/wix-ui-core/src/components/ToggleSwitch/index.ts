import * as React from 'react';
import ToggleSwitchComponent, {ToggleSwitchProps} from './ToggleSwitch';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import {ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {ToggleSwitchProps};
export const ToggleSwitch = withClasses(ToggleSwitchComponent, styles) as React.ComponentClass<ToggleSwitchProps & ThemedComponentProps & WixComponentProps>;
