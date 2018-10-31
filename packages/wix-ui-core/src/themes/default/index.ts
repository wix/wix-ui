import classNames from "classnames";

import Avatar from "./avatar/avatar.st.css";
import DefaultTheme from "./theme.st.css";

const getClassNames = (values, stylesheet, rootcls) => {
  const clsArray = values.map(cls => stylesheet[cls] || null);
  return classNames(stylesheet[rootcls], clsArray);
};

export const avatar = (...values) =>
  getClassNames(values, Avatar, "avatar");
export const defaultTheme = DefaultTheme.root;
