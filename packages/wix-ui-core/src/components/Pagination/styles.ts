import {core, PaginationTheme} from './theme';
import {defaultsDeep} from 'lodash';

export const styles = theme => {
  theme = defaultsDeep(theme, core) as PaginationTheme;

  return {
    paginationRoot: theme.paginationRoot,
    pageNumber: theme.pageNumber,
    currentPage: theme.currentPage,
    inputField: theme.inputField,
    inputTotalPages: theme.inputTotalPages,
    ellipsis: theme.ellipsis
  };
};
