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
import API_Table from "../../APITable";
import IconsExample from "../../components/icons-example";
import * as iconComponents from "../../../src/on-stage/general/dist";
import OnStageGeneralCatrgoryList from './OnStageGeneralCategoryList'
import { ON_STAGE_CATEGORY, GENERAL_ICONS } from '../../constants'

export default {
  category: ON_STAGE_CATEGORY,
  storyName: GENERAL_ICONS,
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
            "import Duplicate from 'wix-ui-icons-common/on-stage/Duplicate';"
          ),
          divider(),
          title("Categories"),
          description({
            text:
              "The usage of each icon type is determined by intention and size. Icons should be used strictly according to the description.",
          }),
          <OnStageGeneralCatrgoryList />,
        ],
      }),
      tab({
        title: "API",
        sections: [description({ title: "Props", text: API_Table })],
      }),
    ]),
  ],
};
