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
  Edit,
  DocDuplicate,
  Delete,
  EmptyTrash,
  Add,
  Minus,
} from "wix-ui-icons-common";
import CategoryList from "../components/category-list";
import HeaderIcons from "../components/header-icons";
import IconsExample from "../components/icons-example";
import * as iconComponents from "../../src/general/dist";
import generalIconsMetadata from "../../src/general/metadata";
import { mapIconsToCategories } from "../utils";

// (icon: IconMetadata) => GeneralTableRow
const mapIconToRow = ({ description, sizes }) => {
  const Icon = iconComponents[sizes[24]];
  const SmallIcon = iconComponents[sizes[18]];
  return [
    Icon && <Icon />,
    sizes[24],
    SmallIcon && <SmallIcon />,
    sizes[18],
    description,
  ];
};

const tableHeaderTitles = [
  "24x24",
  "Icon Name",
  "18x18",
  "Icon Name",
  "Use for",
];
const categories = mapIconsToCategories(
  generalIconsMetadata,
  tableHeaderTitles,
  mapIconToRow
);

export default {
  category: "Icons",
  storyName: "General Icons",
  component: () => (
    <IconsExample dataHook="icon-list" {...{ iconComponents }} />
  ),

  sections: [
    header({
      component: (
        <HeaderIcons>
          <Edit />
          <DocDuplicate />
          <Delete />
          <EmptyTrash />
          <Add />
          <Minus />
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
          <CategoryList dataHook="icon-list" categories={categories} />,
        ],
      }),
    ]),
  ],
};
