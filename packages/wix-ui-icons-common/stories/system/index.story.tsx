import React from "react";
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
} from "wix-ui-icons-common/system";
import Sizes from "./Sizes";
import CategoryList from "../components/category-list";
import HeaderIcons from "../components/header-icons";
import IconsExample from "../components/icons-example";
import systemIconsMetadata from "../../src/system/metadata";
import * as iconComponents from "../../src/system/dist";
import { mapIconsToCategories } from "../utils";
import { IconMetadata } from "../../src/types";
import { SystemTableRow, IconDescriptor } from "../types";
import API_Table from "../APITable";

const mapIconToRow = ({
  title,
  sizes,
  description,
}: IconMetadata): SystemTableRow => {
  const iconDescriptors: Array<IconDescriptor> = [];
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

const tableHeaderTitles = ["Icon Name", "Sizes", "Use for"];
const categories = mapIconsToCategories(
  systemIconsMetadata,
  tableHeaderTitles,
  mapIconToRow
);

export default {
  category: "Icons",
  storyName: "System Icons",
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
          <CategoryList dataHook="icon-list" categories={categories} />,
        ],
      }),
      tab({
        title: "API",
        sections: [description({ title: "Props", text: API_Table })],
      }),
    ]),
  ],
};
