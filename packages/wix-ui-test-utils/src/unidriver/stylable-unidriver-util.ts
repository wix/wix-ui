import { StylableUnidriverUtil as StylableUnidriverUtilV2 } from "@stylable/uni-driver";

import {
  StylableUnidriverUtilLegacy,
  StylableUnidriverUtilCompat
} from "./stylable-unidriver-util-legacy";
import {
  CommonStylesheet,
  StylesheetV2,
  CompatStylesheet,
  LegacyStylesheet
} from "./legacy-stylable-types";

function getStylesheetMode(sheet: any) {
  if (sheet.$cssStates) {
    const res = sheet.$cssStates({});
    if (res.className) {
      return "compat";
    } else {
      return "legacy";
    }
  } else {
    return "v2";
  }
}

export class StylableUnidriverUtil {
  constructor(stylesheet: CommonStylesheet) {
    const mode = getStylesheetMode(stylesheet);
    if (mode === "v2") {
      return new StylableUnidriverUtilV2(stylesheet as StylesheetV2);
    } else if (mode === "compat") {
      return new StylableUnidriverUtilCompat(stylesheet as CompatStylesheet);
    } else {
      return new StylableUnidriverUtilLegacy(stylesheet as LegacyStylesheet);
    }
  }
}
