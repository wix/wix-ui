import * as React from "react";
import { IconDescriptor } from "../types";
import viewsStyles from "wix-storybook-utils/dist/src/Sections/views/styles.scss";
import { classes } from "./Sizes.st.css";

const isNumeric = (size: string) => /^\d+$/.test(size);

type Props = {
  sizes: Array<IconDescriptor>;
};

const Sizes: React.FC<Props> = ({ sizes }) => {
  return (
    <div className={classes.iconsContainer}>
      {sizes.map(({ size, name, Icon }) => {
        const sizeText = isNumeric(size) ? `(${size}x${size})` : `(${size})`;
        return (
          <div className={classes.icon} key={size}>
            <Icon className={classes.svg} />
            <div className={viewsStyles["table-markdown"]}>
              {name}
              <div className={classes.size}>{sizeText}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sizes;
