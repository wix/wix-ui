import { header, title, table } from "../../src/Sections";

const rows = [
  ["`children`", "`node`", undefined, undefined, "Any component or string"],
  ["`disabled`", "`bool`", undefined, undefined, "Apply disabled styles"],
  [
    "`theme`",
    "`oneOf ['dashes', 'plain', 'filled', 'image']`",
    undefined,
    undefined,
    "The theme of component",
  ],
];
const headerTitles = [
  "Name",
  "Type",
  "Default Value",
  "Required",
  "Description",
];

export default {
  category: "Sections",
  storyName: "Table Section",
  sections: [
    header({ title: "Table" }),

    title("Table"),
    table({ rows }),

    title("Table with header"),
    table({ rows, headerTitles }),

    title("Table with transparent header"),
    table({ rows, headerTitles, transparentHeader: true }),
  ],
};
