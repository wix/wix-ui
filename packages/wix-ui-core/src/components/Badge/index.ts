import * as React from 'react';
import BadgeComponent, {BadgeProps} from './Badge';
import {styles} from './styles';
import {withClasses, ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {BadgeProps};
export const Badge = withClasses(BadgeComponent, styles) as React.ComponentClass<BadgeProps & ThemedComponentProps & WixComponentProps>;
