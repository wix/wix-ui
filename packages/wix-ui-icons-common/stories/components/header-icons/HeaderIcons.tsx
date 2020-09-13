import React from "react";
import { classes } from "./HeaderIcons.st.css";

type Props = {
  children: React.ReactNode;
};

const HeaderIcons: React.FC<Props> = ({ children }) => (
  <div className={classes.root}>{children}</div>
);

export default HeaderIcons;
