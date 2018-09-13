import * as React from "react";
import { backOfficeTheme } from "../../../src/themes/backoffice";
import { ButtonTwo as ButtonTwoCore } from "../../../src/components/ButtonV2/";

export function ButtonTwo(props) {
  return (
    <div className={backOfficeTheme}>
      <ButtonTwoCore {...props} />
    </div>
  );
}
