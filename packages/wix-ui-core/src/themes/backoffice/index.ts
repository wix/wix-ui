import classNames from "classnames";
import ButtonNext from "./button/button-temp.st.css";
import BackofficeTheme from "./theme.st.css";

const getClassNames = (values, stylesheet) => {
  const classNamesArray = values.map(
    cls => (stylesheet[cls] ? stylesheet[cls] : null)
  );
  return classNames(classNamesArray);
};

export const buttonNext = (...values) => getClassNames(values, ButtonNext);
export const backofficeTheme = BackofficeTheme.root;
