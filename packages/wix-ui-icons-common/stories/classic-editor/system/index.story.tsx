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
import CategoryList from "../../components/category-list";
import { classes } from "./style.st.css";
import {
  Settings,
  Presets,
  CustomizeDesign,
  Layout,
  Crop,
  Link
} from "../../../src/classic-editor/system/dist";
import HeaderIcons from "../../components/header-icons";
import IconsExample from "../../components/icons-example";
import systemIconsMetadata from "../../../src/classic-editor/system/metadata";
import * as iconComponents from "../../../src/classic-editor/system/dist";
import { IconMetadata } from "../../../src/types";
import API_Table from "../../APITable";
import { getIconSizeKeys } from '../../utils'

const mapIconToRow = (
  {
    title,
    description,
    sizes,
  }: IconMetadata) => {
  const iconSize = Object.keys(sizes).length ? Object.keys(sizes)[0] : ''
  const Icon = iconComponents[title]
  return [
    Icon && <Icon/>,
    title,
    iconSize && `${iconSize}x${iconSize}`
  ]
}


const tableHeaderTitles = ["Icon", "Icon Name", "Icon Size"];

const iconSizeKeys = getIconSizeKeys(systemIconsMetadata);
const searchKeys = ["title", ...iconSizeKeys, "tags", "aliases"];

export default {
  category: "Classic-Editor Icons",
  storyName: "System Icons",
  component: () => (
    <IconsExample dataHook="icon-list" {...{ iconComponents }} />
  ),

  sections: [
    header({
      component: (
        <HeaderIcons>
          <Settings />
          <Presets />
          <CustomizeDesign />
          <Layout />
          <Crop />
          <Link />
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
            title: "Adding New Icons",
            text:
              `Base UI Icons are owned by Hive Team.<br/>If you can’t find an icon for your needs or some adjustments need to be made to existing ones, please submit <a href="https://docs.google.com/forms/d/e/1FAIpQLScLrVAwWsVVqlL1dvtVIMRX_mmTZAWIKHv1Mf0LYKkj8i1xUw/viewform">Icon Request.</a>`,
          }),
          importExample(
            "import ConnectedToData from 'wix-ui-icons-common/classic-editor/system/ConnectedToData';"
          ),
          divider(),
          title("Categories"),
          description({
            text:
              "The usage of each icon type is determined by intention and size. Icons should be used strictly according to the description.",
          }),
          <CategoryList
            dataHook="icon-list"
            className={classes.tableList}
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
