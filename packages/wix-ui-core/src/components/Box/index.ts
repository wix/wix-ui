import BoxComponent, {BoxProps} from './Box';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import {ThemedComponentProps} from 'wix-ui-jss';
import * as React from 'react';
import {WixComponentProps} from '../../createHOC';

export {BoxProps};
export const Box = withClasses(BoxComponent, styles) as React.ComponentClass<BoxProps & ThemedComponentProps & WixComponentProps>;
export default Box;
