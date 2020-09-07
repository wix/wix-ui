import React from "react";
import { IconProps } from "../../types";
import { classes } from "./IconsExample.st.css";

type IconsExampleProps = {
  iconComponents: Record<string, React.FC<IconProps>>;
};

const IconsExample: React.FC<IconsExampleProps> = ({ iconComponents }) => (
  <div className={classes.root}>
    {Object.entries(iconComponents).map(([iconName, Icon]) => (
      <div className={classes.icon} key={iconName}>
        <Icon />
        <div>{iconName}</div>
      </div>
    ))}
  </div>
);

export default IconsExample;
