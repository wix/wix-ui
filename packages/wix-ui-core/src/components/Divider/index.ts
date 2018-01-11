import DividerComponent, {DividerProps} from './Divider';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import * as React from 'react';
import {ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {DividerProps};
export const Divider = withClasses(DividerComponent, styles) as React.ComponentClass<DividerProps & ThemedComponentProps & WixComponentProps>;
export default Divider;
