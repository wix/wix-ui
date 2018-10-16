import * as React from "react";
import { backofficeTheme } from "../../../src/themes/backoffice";
import { ButtonNext as ButtonNextCore } from "../../../src/components/button-next";

export class ButtonNext extends React.Component {
  static displayName = "ButtonNext";
  render() {
    return (
      <div className={backofficeTheme}>
        <ButtonNextCore {...this.props} />
      </div>
    );
  }
}
