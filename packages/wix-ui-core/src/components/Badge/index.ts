import BadgeComponent, {BadgeProps} from './Badge';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import * as React from 'react';
import {ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {BadgeProps};
export const Badge = withClasses(BadgeComponent, styles) as React.ComponentClass<BadgeProps & ThemedComponentProps & WixComponentProps>;
export default Badge;
