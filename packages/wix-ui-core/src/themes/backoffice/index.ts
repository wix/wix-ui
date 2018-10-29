import classNames from "classnames";

import ButtonNext from "./button/button-temp.st.css";
import IconButton from "./icon-button/icon-button.st.css";
import TextButton from "./text-button/text-button.st.css";
import CloseButton from "./close-button/close-button.st.css";
import BackofficeTheme from "./theme.st.css";

const getClassNames = (values, stylesheet, rootcls) => {
  const clsArray = values.map(cls => stylesheet[cls] || null);
  return classNames(stylesheet[rootcls], clsArray);
};

export const buttonNext = (...values) =>
  getClassNames(values, ButtonNext, "button");
export const iconButton = (...values) =>
  getClassNames(values, IconButton, "iconButton");
export const textButton = (...values) =>
  getClassNames(values, TextButton, "textButton");
export const closeButton = (...values) =>
  getClassNames(values, CloseButton, "closeButton");
export const backofficeTheme = BackofficeTheme.root;
