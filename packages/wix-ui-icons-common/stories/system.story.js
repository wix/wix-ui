import React, { useState, useMemo, useEffect } from "react";
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  columns,
  divider,
  example,
  playground,
  api,
  testkit,
  table,
} from "wix-storybook-utils/Sections";
import {
  AddItemMedium,
  BreadcrumbsChevronRight,
  CheckboxChecked,
  DragAndDropLarge,
  FaceSmiling30,
  Help24,
} from "wix-ui-icons-common/system";
import CategoryList from "./CategoryList";
import systemIcons from "./icons/system";

import { classes } from "./index.story.st.css";

const HeaderIcons = () => (
  <div className={classes.headerIcons}>
    <AddItemMedium />
    <BreadcrumbsChevronRight />
    <CheckboxChecked />
    <DragAndDropLarge />
    <FaceSmiling30 />
    <Help24 />
  </div>
);

export default {
  category: "Icons",
  storyName: "System Icons",

  sections: [
    header({
      component: <HeaderIcons />,
      sourceUrl:
        "https://github.com/wix/wix-ui/tree/master/packages/wix-ui-icons-common",
    }),

    tabs([
      tab({
        title: "Icon List",
        dataHook: "icon-list",
        sections: [
          description({
            title: "Purpose of Use",
            text:
              "General icons are used to support the functional intentions of Wix Style elements.<br/>For more information read <a>Wix Style Iconography</a> article.",
          }),
          description({
            title: "Adding New Icons",
            text:
              "WSR icons are owned by Wix Style Team.<br/>If you can’t find an icon for your needs or some adjustments need to be made to existing ones, please submit Icon Request.",
          }),

          importExample(
            "import Duplicate from 'wix-ui-icons-common/Duplicate';"
          ),
          divider(),
          title("Categories"),
          description({
            text:
              "The usage of each icon type is determined by intention and size. Icons should be used strictly according to the description.",
          }),
          <CategoryList icons={systemIcons} system />,
        ],
      }),
    ]),
  ],
};
