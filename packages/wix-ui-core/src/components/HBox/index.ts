import HBoxComponent, {HBoxProps} from './HBox';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import * as React from 'react';
import {ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {HBoxProps};
export const HBox = withClasses(HBoxComponent, styles) as React.ComponentClass<HBoxProps & ThemedComponentProps & WixComponentProps>;
export default HBox;
