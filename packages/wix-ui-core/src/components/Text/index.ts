import TextComponent, {TextProps} from './Text';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import {ThemedComponentProps} from 'wix-ui-jss';
import * as React from 'react';
import {WixComponentProps} from '../../createHOC';

export {TextProps};
export const Text = withClasses(TextComponent, styles) as React.ComponentClass<TextProps & ThemedComponentProps & WixComponentProps>;
export default Text;
