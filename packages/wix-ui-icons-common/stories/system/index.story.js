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
import Sizes from "./Sizes";
import CategoryList from "../components/category-list/CategoryList";
import HeaderIcons from "../components/header-icons";
import icons from "../icons/system";
import * as iconComponents from "../../src/system/dist";
import { mapIconsToCategories } from "../utils";

const mapIconToRow = ({ title, sizes, description }) => {
  const iconDescriptors = [];
  for (const [size, name] of Object.entries(sizes)) {
    const Icon = iconComponents[name];
    iconDescriptors.push({
      size,
      name,
      Icon,
    });
  }
  return [title, <Sizes sizes={iconDescriptors} />, description];
};

const columns = ["Icon Name", "Sizes", "Use for"];
const categories = mapIconsToCategories(icons, columns, mapIconToRow);

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
          <CategoryList dataHook="icon-list" categories={categories} />,
        ],
      }),
    ]),
  ],
};
