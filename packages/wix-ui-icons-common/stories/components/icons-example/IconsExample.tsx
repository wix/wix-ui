import * as React from "react";
import { IconProps } from "../../types";
import { classes } from "./IconsExample.st.css";

type IconsExampleProps = {
  iconComponents: Record<string, React.FC<IconProps>>;
  dataHook?: string;
};

const IconsExample: React.FC<IconsExampleProps> = ({
  iconComponents,
  dataHook,
}) => (
  <div className={classes.root} data-hook={dataHook}>
    {Object.entries(iconComponents).map(([iconName, Icon]) => (
      <div className={classes.icon} key={iconName}>
        <Icon />
        <div>{iconName}</div>
      </div>
    ))}
  </div>
);

export default IconsExample;
