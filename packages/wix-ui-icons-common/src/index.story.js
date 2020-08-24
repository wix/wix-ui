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
import { classes } from "./index.story.st.css";
import icons from "./icons.json";

const getIcon = (name, system) => {
  if (!name) return;
  if (system) {
    return require(`./system/dist/components/${name}`).default;
  }
  return require(`./general/dist/components/${name}`).default;
};

const mapIconToRow = ({ description, system, sizes }) => {
  const Icon = getIcon(sizes[24], system);
  const SmallIcon = getIcon(sizes[18], system);
  console.log("Icon: ", Icon);
  return [
    Icon && <Icon />,
    sizes[24],
    SmallIcon && <SmallIcon />,
    sizes[18],
    description,
  ];
};

const mapIconsToCategories = (icons) => {
  const categoryMap = {};
  for (const { category, ...icon } of icons) {
    if (!categoryMap[category]) {
      categoryMap[category] = [];
    }

    categoryMap[category].push(icon);
  }

  return Object.entries(categoryMap);
};

const getCategoryTables = (icons) => {
  const categories = mapIconsToCategories(icons);
  const columns = ["24x24", "Icon Name", "18x18", "Icon Name", "Use for"];
  const tables = categories.map(([category, icons]) =>
    table({
      title: category,
      rows: [columns, ...icons.map(mapIconToRow)],
    })
  );
  return tables;
};

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
  storyName: "1.4 Component Icons",

  sections: [
    header({
      component: <HeaderIcons />,
      sourceUrl:
        "https://github.com/wix/wix-style-react/tree/master/src/MessageModalLayout/",
    }),

    tabs([
      tab({
        title: "Icon List",
        dataHook: "icon-list",
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
            "import Favorite from 'wix-style-react/new-icons/Favorite';"
          ),
          divider(),
          title("Categories"),
          description({
            text:
              "The usage of each icon type is determined by intention and size. Icons should be used strictly according to the description.",
          }),

          ...getCategoryTables(icons),
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
    ]),
  ],
};
