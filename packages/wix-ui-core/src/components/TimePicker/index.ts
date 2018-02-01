import * as React from 'react';
import TimePickerComponent, {TimePickerProps} from './TimePicker';
import {styles} from './styles';
import {FIELD} from './utils';
import {withClasses} from 'wix-ui-jss';
import {ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {TimePickerProps};
export {FIELD};
export const TimePicker = withClasses(TimePickerComponent, styles) as React.ComponentClass<TimePickerProps & ThemedComponentProps & WixComponentProps>;
