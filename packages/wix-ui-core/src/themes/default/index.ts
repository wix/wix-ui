import * as classNames from 'classnames';

import { classes as avatarClasses } from './avatar/avatar.st.css';
import { classes as defaultThemeClasses } from './theme.st.css';

const getClassNames = (values, stylesheet, rootcls?) => {
  const clsArray = values.map(cls => stylesheet[cls] || null);
  return classNames(stylesheet[rootcls], clsArray);
};

export const avatar = (...values) => getClassNames(values, avatarClasses);
export const defaultTheme = defaultThemeClasses.root;
