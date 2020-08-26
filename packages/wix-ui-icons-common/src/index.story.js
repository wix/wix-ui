import React, { useState } from "react";
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
import Markdown from "wix-storybook-utils/Markdown";
import Input from "wix-storybook-utils/dist/src/ui/input";
import {
  Edit,
  DocDuplicate,
  Delete,
  EmptyTrash,
  Add,
  Minus,
  Search,
} from "wix-ui-icons-common";
import sectionStyles from "wix-storybook-utils/dist/src/Sections/styles.scss";
import { classes } from "./index.story.st.css";
import icons from "./icons.json";

const getIcon = (name, system) => {
  if (!name) return "";
  if (system) {
    return `<object data=${require(`./system/raw/${name}.svg`)} type="image/svg+xml" />`;
  }
  return `<object data=${require(`./general/raw/${name}.svg`)} type="image/svg+xml" />`;
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

const categories = mapIconsToCategories(icons);

const mapCategoryToTable = ([categoryName, icons]) => {
  let table = `
  | 24x24 | Icon Name | 18x18 | Icon Name | Use for |
  | --- | --- | --- | --- | --- |
  `;
  for (const icon of icons) {
    const {
      description,
      system,
      sizes: { "18": smallName = "", "24": name = "" },
    } = icon;

    const Icon = getIcon(name, system);
    const IconSmall = getIcon(smallName, system);
    const parsedDescription = description
      .replace(/\n/g, "<br/>")
      .replace(/\|/g, "&#10072;");

    table += `| ${Icon} | ${name} | ${IconSmall} | ${smallName} | ${parsedDescription} |\n`;
  }

  return (
    <>
      <h2 className={sectionStyles["section-title"]}>{categoryName}</h2>
      <Markdown source={table} />
    </>
  );
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

const SearchInput = () => {
  return (
    <div className={classes.search}>
      <Input placeholder="Search Icons" className={classes.searchInput} />
      <Search className={classes.searchIcon} />
    </div>
  );
};

const CategoryTables = () => {
  const [results, setResults] = useState(categories);
  return (
    <>
      <SearchInput />
      {results.map(mapCategoryToTable)}
    </>
  );
};

export default {
  category: "Icons",
  storyName: "All",

  sections: [
    header({
      component: <HeaderIcons />,
      sourceUrl:
        "https://github.com/wix/wix-ui/tree/master/packages/wix-ui-icons-common",
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
            "import Duplicate from 'wix-ui-icons-common/Duplicate';"
          ),
          divider(),
          title("Categories"),
          description({
            text:
              "The usage of each icon type is determined by intention and size. Icons should be used strictly according to the description.",
          }),
          <CategoryTables />,
        ],
      }),
    ]),
  ],
};
