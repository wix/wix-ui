import * as classNames from 'classnames';

import { classes as Avatar } from './avatar/avatar.st.css';
import { classes as ButtonNext } from './button/button.st.css';
import { classes as IconButton } from './icon-button/icon-button.st.css';
import { classes as TextButton } from './text-button/text-button.st.css';
import { classes as CloseButton } from './close-button/close-button.st.css';
import { classes as BackofficeTheme } from './theme.st.css';
import { classes as Opacity } from './opacity.st.css';
import { classes as Border } from './border.st.css';

export const opacity = Opacity;
export const border = Border;

const getClassNames = (values, stylesheet, rootcls?) => {
  const clsArray = values.map(cls => stylesheet[cls] || null);
  return classNames(stylesheet[rootcls], clsArray);
};

export const avatar = (...values) => getClassNames(values, Avatar, 'avatar');
export const button = (...values) =>
  getClassNames(values, ButtonNext, 'button');
export const iconButton = (...values) =>
  getClassNames(values, IconButton, 'iconButton');
export const textButton = (...values) =>
  getClassNames(values, TextButton, 'textButton');
export const closeButton = (...values) =>
  getClassNames(values, CloseButton, 'closeButton');
// FIX ME. I fail on yoshi test --protractor when used
// only with BackofficeTheme.root
export const backofficeTheme = (BackofficeTheme && BackofficeTheme.root) || {};
