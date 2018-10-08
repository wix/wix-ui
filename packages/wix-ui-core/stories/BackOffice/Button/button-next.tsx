import * as React from "react";
import { backOfficeTheme } from "../../../src/themes/backoffice";
import { ButtonNext as ButtonNextCore } from "../../../src/components/button-next";

export function ButtonNext(props) {
  return (
    <div className={backOfficeTheme}>
      <ButtonNextCore {...props} />
    </div>
  );
}
