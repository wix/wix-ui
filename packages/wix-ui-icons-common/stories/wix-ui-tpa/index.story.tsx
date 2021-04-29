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
import HeaderIcons from "../components/header-icons";
import IconsExample from "../components/icons-example";
import * as iconComponents from "../../src/wix-ui-tpa/dist";
import API_Table from "../APITable";
import WixUiTpaCategoryList from './wixUiTpaCategoryList'
import { WUT_CATEGORY } from '../constants'

export default {
  category: WUT_CATEGORY,
  storyName: WUT_CATEGORY,
  component: () => (
    <IconsExample dataHook="icon-list" {...{ iconComponents }} />
  ),

  sections: [
    header({
      sourceUrl:
        "https://github.com/wix/wix-ui/tree/master/packages/wix-ui-icons-common",
    }),

    tabs([
      tab({
        title: "Icon List",
        sections: [
          importExample(
            "import Duplicate from 'wix-ui-icons-common/wix-ui-tpa/Duplicate';"
          ),
          divider(),
          title("Categories"),
          description({
            text:
              "The usage of each icon type is determined by intention and size. Icons should be used strictly according to the description.",
          }),
          <WixUiTpaCategoryList />,
        ],
      }),
      tab({
        title: "API",
        sections: [description({ title: "Props", text: API_Table })],
      }),
    ]),
  ],
};
