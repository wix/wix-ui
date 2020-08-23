import React from "react";
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  columns,
  divider,
  example as baseExample,
  playground,
  api,
  testkit,
} from "wix-storybook-utils/Sections";
import {
  Edit,
  DocDuplicate,
  Delete,
  EmptyTrash,
  Add,
  Minus,
} from "wix-ui-icons-common";
import { classes } from "./index.story.st.css";

const example = (config) =>
  baseExample({
    components: {
      a: () => {},
    },
    ...config,
  });

const HeaderIcons = () => (
  <div className={classes.headerIcons}>
    <Edit />
    <DocDuplicate />
    <Delete />
    <EmptyTrash />
    <Add />
    <Minus />
  </div>
);

export default {
  category: "Icons",
  storyName: "Component Icons",

  component: () => <div />,
  componentPath: ".",

  componentProps: {},

  exampleProps: {},

  sections: [
    header({
      component: <HeaderIcons />,
      sourceUrl:
        "https://github.com/wix/wix-style-react/tree/master/src/MessageModalLayout/",
    }),

    tabs([
      tab({
        title: "Description",
        sections: [
          description({
            title: "Description",
            text:
              "Use this component inside a <Modal /> to display content in the MessageModalLayout. You may place a title and/or a footer with actions relevant to the displayed content",
          }),

          importExample(
            "import { MessageModalLayout } from 'wix-style-react';"
          ),
          divider(),
          title("Examples"),
          // example({
          //   title: "Simple Usage",
          //   text: "A simple example with compact preview",
          // }),
          // example({
          //   title: "Footnote Example",
          //   description: "A simple example with Footnote",
          // }),
          // example({
          //   title: "Illustration Example",
          //   description: "A simple example with illustration",
          // }),
          // example({
          //   title: "Destructive Theme Example",
          //   description:
          //     "A simple example with destructive theme and illustration",
          // }),
          // example({
          //   title: "Premium Theme Example",
          //   text: "A simple example with premium theme and illustration",
          // }),
        ],
      }),

      ...[
        { title: "API", sections: [api()] },
        { title: "Testkit", sections: [testkit()] },
        { title: "Playground", sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
