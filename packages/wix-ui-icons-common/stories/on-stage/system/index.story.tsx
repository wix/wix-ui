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
import Sizes from "../../system/Sizes";
import CategoryList from "../../components/category-list";
import systemIconsMetadata from "../../../src/on-stage/system/metadata";
import * as iconComponents from "../../../src/on-stage/system/dist";
import { IconMetadata } from "../../../src/types";
import { SystemTableRow, IconDescriptor } from "../../types";
import API_Table from "../../APITable";
import { getIconSizeKeys } from '../../utils'
import { SYSTEM_ICONS, ON_STAGE_CATEGORY } from '../../constants'

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

const iconSizeKeys = getIconSizeKeys(systemIconsMetadata);
const searchKeys = ["title", ...iconSizeKeys, "tags", "aliases"];

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
          <CategoryList
            dataHook="icon-list"
            iconsMetadata={systemIconsMetadata}
            {...{
              tableHeaderTitles,
              searchKeys,
              mapIconToRow,
            }}
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

