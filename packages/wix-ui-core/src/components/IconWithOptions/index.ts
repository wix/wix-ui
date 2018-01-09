import * as React from 'react';
import IconWithOptionsComponent, {IconWithOptionsProps} from './IconWithOptions';
import {styles} from './styles';
import {withClasses, ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {IconWithOptionsProps};
export const IconWithOptions = withClasses(IconWithOptionsComponent, styles) as React.ComponentClass<IconWithOptionsProps & ThemedComponentProps & WixComponentProps>;
export default IconWithOptions;
