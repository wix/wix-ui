import classNames from 'classnames';

import Avatar from './avatar/avatar.st.css';
import ButtonNext from './button/button.st.css';
import IconButton from './icon-button/icon-button.st.css';
import TextButton from './text-button/text-button.st.css';
import CloseButton from './close-button/close-button.st.css';
import BackofficeTheme from './theme.st.css';

const getClassNames = (values, stylesheet, rootcls?) => {
  const clsArray = values.map(cls => stylesheet[cls] || null);
  return classNames(stylesheet[rootcls], clsArray);
};

export const avatar = (...values) => getClassNames(values, Avatar);
export const buttonNext = (...values) =>
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
