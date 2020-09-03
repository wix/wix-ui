import React from "react";
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  divider,
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
import CategoryList from "../components/category-list/CategoryList";
import HeaderIcons from "../components/header-icons";
import CategoryTable from "./CategoryTable";
import icons from "../icons/system";

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
          <Help24 />
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
            "import AddItemLarge from 'wix-ui-icons-common/system/AddItemLarge';"
          ),
          divider(),
          title("Categories"),
          description({
            text:
              "The usage of each icon type is determined by intention and size. Icons should be used strictly according to the description.",
          }),
          <CategoryList {...{ icons, CategoryTable }} />,
        ],
      }),
    ]),
  ],
};
