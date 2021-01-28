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
  Edit,
  Duplicate,
  Delete,
  MoveToTrash,
  AddCircle,
  Text,
  Design,
} from "../../../src/classic-editor/general/dist";
import HeaderIcons from "../../components/header-icons";
import IconsExample from "../../components/icons-example";
import generalIconsMetadata from "../../../src/classic-editor/general/metadata";
import * as iconComponents from "../../../src/classic-editor/general/dist";
import API_Table from "../../APITable";
import GeneralCategoryListBase from '../../components/general-category-list-base/GeneralCategoryList'
import ClassicEditorGeneralCategoryList from './classicEditorGeneralCategoryList'

export default {
  category: "Classic-Editor Icons",
  storyName: "General Icons",
  component: () => (
    <IconsExample dataHook="icon-list" {...{ iconComponents }} />
  ),

  sections: [
    header({
      component: (
        <HeaderIcons>
          <Edit />
          <Delete />
          <MoveToTrash />
          <AddCircle />
          <Design />
          <Text />
          <Duplicate />
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
            title: "Adding New Icons",
            text: `Base UI Icons are owned by Hive Team.<br/>If you can’t find an icon for your needs or some adjustments need to be made to existing ones, please submit <a href="https://docs.google.com/forms/d/e/1FAIpQLScLrVAwWsVVqlL1dvtVIMRX_mmTZAWIKHv1Mf0LYKkj8i1xUw/viewform">Icon Request.</a>`,
          }),
          importExample(
            "import Duplicate from 'wix-ui-icons-common/classic-editor/Duplicate';"
          ),
          divider(),
          title("Categories"),
          description({
            text:
              "The usage of each icon type is determined by intention and size. Icons should be used strictly according to the description.",
          }),
          <ClassicEditorGeneralCategoryList />,
        ],
      }),
      tab({
        title: "API",
        sections: [description({ title: "Props", text: API_Table })],
      }),
    ]),
  ],
};
