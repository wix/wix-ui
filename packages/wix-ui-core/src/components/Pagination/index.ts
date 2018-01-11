import PaginationComponent, {PaginationProps} from './Pagination';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import * as React from 'react';
import {ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {PaginationProps};
export const Pagination = withClasses(PaginationComponent, styles) as React.ComponentClass<PaginationProps & ThemedComponentProps & WixComponentProps>;
export default Pagination;
