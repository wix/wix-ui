import * as React from 'react';
import ButtonComponent, {ButtonProps} from './Button';
import {styles} from './styles';
import {withClasses, ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {ButtonProps};
export const Button = withClasses(ButtonComponent, styles) as React.ComponentClass<ButtonProps & ThemedComponentProps & WixComponentProps>;
