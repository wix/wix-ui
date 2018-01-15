import * as React from 'react';
import VBoxComponent, {VBoxProps} from './VBox';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import {ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {VBoxProps};
export const VBox = withClasses(VBoxComponent, styles) as React.ComponentClass<VBoxProps & ThemedComponentProps & WixComponentProps>;
