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
  DocDuplicate,
  Delete,
  EmptyTrash,
  Add,
  Minus,
} from "../../src/general/dist";
import HeaderIcons from "../components/header-icons";
import IconsExample from "../components/icons-example";
import generalIconsMetadata from "../../src/general/metadata";
import * as iconComponents from "../../src/general/dist";
import API_Table from "../APITable";
import GeneralCategoryListBase from '../components/general-category-list-base/GeneralCategoryList'

export default {
  category: "WSR Icons",
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
            text: `WSR icons are owned by Wix Style Team.<br/>If you can’t find an icon for your needs or some adjustments need to be made to existing ones, please submit <a href="https://goo.gl/forms/wrVuHnyBrEISXUPF2">Icon Request.</a>`,
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
          <GeneralCategoryListBase iconComponents={iconComponents} iconsMetadata={generalIconsMetadata}/>,
        ],
      }),
      tab({
        title: "API",
        sections: [description({ title: "Props", text: API_Table })],
      }),
    ]),
  ],
};
