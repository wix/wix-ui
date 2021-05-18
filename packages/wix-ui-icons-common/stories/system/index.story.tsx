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
import {
  AddItemMedium,
  BreadcrumbsChevronRight,
  CheckboxChecked,
  DragAndDropLarge,
  FaceSmiling30,
  Help24,
} from "../../src/system/dist";
import SystemCategoryListBase from "../components/system-category-list-base/SystemCategoryListBase";
import HeaderIcons from "../components/header-icons";
import IconsExample from "../components/icons-example";
import systemIconsMetadata from "../../src/system/metadata";
import * as iconComponents from "../../src/system/dist";
import API_Table from "../APITable";
import { SYSTEM_ICONS, WSR_CATEGORY } from '../constants'

export default {
  category: WSR_CATEGORY,
  storyName: SYSTEM_ICONS,
  component: () => (
    <IconsExample dataHook="icon-list" {...{ iconComponents }} />
  ),

  sections: [
    header({
      component: (
        <HeaderIcons>
          <AddItemMedium />
          <BreadcrumbsChevronRight />
          <CheckboxChecked />
          <DragAndDropLarge />
          <FaceSmiling30 />
          <Help24 />
        </HeaderIcons>
      ),
      sourceUrl:
        "https://github.com/wix/wix-ui/tree/master/packages/wix-ui-icons-common/src/system",
    }),

    tabs([
      tab({
        title: "Icon List",
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
            "import AddItemLarge from 'wix-ui-icons-common/system/AddItemLarge';"
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
