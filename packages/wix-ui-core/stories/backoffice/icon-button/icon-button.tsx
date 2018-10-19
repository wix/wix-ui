import * as React from "react";
import { backofficeTheme } from "../../../src/themes/backoffice";
import { ButtonNext as ButtonNextCore } from "../../../src/components/button-next";
import { iconButton } from "../../../src/themes/backoffice";

export class IconButton extends React.Component {
  static displayName = "ButtonNext";
  render() {
    return (
      <div className={backofficeTheme}>
        <ButtonNextCore className={iconButton()} {...this.props} />
      </div>
    );
  }
}
