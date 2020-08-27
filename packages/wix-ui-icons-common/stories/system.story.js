import React from "react";
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  columns,
  divider,
  example as baseExample,
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
} from "wix-ui-icons-common/system";
import * as systemIcons from "wix-ui-icons-common/system";
import HeaderIcons from "./HeaderIcons";
import { classes } from "./system.story.st.css";
import commonStyles from "wix-storybook-utils/dist/src/common.scss";

const SystemIcons = () => (
  <div className={classes.iconList}>
    {Object.keys(systemIcons).map((iconName) => (
      <div key={iconName} className={classes.iconWithName}>
        {React.createElement(systemIcons[iconName], {
          className: classes.icon,
        })}
        <div className={commonStyles.commonText}>{iconName}</div>
      </div>
    ))}
  </div>
);

export default {
  category: "Icons",
  storyName: "System Icons",

  sections: [
    header({
      component: (
        <HeaderIcons>
          <AddItemMedium />
          <BreadcrumbsChevronRight />
          <CheckboxChecked />
          <DragAndDropLarge />
          <FaceSmiling30 />
        </HeaderIcons>
      ),
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
            text: "System icons are used to...",
          }),
          description({
            title: "Adding New Icons",
            text:
              "WSR icons are owned by Wix Style Team.<br/>If you can’t find an icon for your needs or some adjustments need to be made to existing ones, please submit Icon Request.",
          }),

          importExample(
            "import CheckboxChecked from 'wix-ui-icons-common/system/CheckboxChecked';"
          ),
          divider(),
          title("Icons"),
          <SystemIcons />,
        ],
      }),
    ]),
  ],
};
