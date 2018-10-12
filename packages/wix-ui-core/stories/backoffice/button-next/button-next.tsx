import * as React from "react";
import { backofficeTheme } from "../../../src/themes/backoffice";
import { ButtonNext as ButtonNextCore } from "../../../src/components/button-next";

export function ButtonNext(props) {
  return (
    <div className={backofficeTheme}>
      <ButtonNextCore {...props} />
    </div>
  );
}
