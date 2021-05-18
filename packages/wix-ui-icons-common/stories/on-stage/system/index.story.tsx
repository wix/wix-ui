import * as React from "react";
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  divider,
} from "wix-storybook-utils/Sections";
import SystemCategoryListBase from "../../components/system-category-list-base/SystemCategoryListBase";
import systemIconsMetadata from "../../../src/on-stage/system/metadata";
import * as iconComponents from "../../../src/on-stage/system/dist";
import API_Table from "../../APITable";
import { SYSTEM_ICONS, ON_STAGE_CATEGORY } from '../../constants'

export default {
  category: ON_STAGE_CATEGORY,
  storyName: SYSTEM_ICONS,

  sections: [
    header({
      sourceUrl:
        "https://github.com/wix/wix-ui/tree/master/packages/wix-ui-icons-common/src/system",
    }),

    tabs([
      tab({
        title: "Icon List",
        sections: [
          importExample(
            "import AddItemLarge from 'wix-ui-icons-common/on-stage/system/AddItemLarge';"
          ),
          divider(),
          title("Categories"),
          description({
            text:
              "The usage of each icon type is determined by intention and size. Icons should be used strictly according to the description.",
          }),
          <SystemCategoryListBase
            iconsMetadata={systemIconsMetadata}
            iconComponents={iconComponents}
          />,
        ],
      }),
      tab({
        title: "API",
        sections: [description({ title: "Props", text: API_Table })],
      }),
    ]),
  ],
};

