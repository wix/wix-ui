import * as React from 'react';
import {styles} from './styles';
import {withClasses, ThemedComponentProps} from 'wix-ui-jss';
import ButtonComponent, {ButtonProps} from './Button';
import {WixComponentProps} from '../../createHOC/index';

export {ButtonProps};
export const Button = withClasses(ButtonComponent, styles) as React.ComponentClass<ButtonProps & ThemedComponentProps & WixComponentProps>;
export default Button;
