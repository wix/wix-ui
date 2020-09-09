import { getIconsToCategoriesMapper, getCategoryIconsSearch } from "./utils";
import { IconMetadata } from "../src/types";

const tableHeaderTitles = ["Header 1", "Header 2"];
const mapIconToRow = ({ title, description }: IconMetadata) => [
  title,
  description,
];

const iconsMetadata: Array<IconMetadata> = [
  {
    title: "Edit",
    category: "Actions",
    description: "Button - opens editing mode",
    tags: ["edit", "pencil", "write"],
    sizes: { "18": "EditSmall", "24": "Edit" },
  },
  {
    title: "DocDuplicate",
    category: "Actions",
    description: "Button - makes a copy of a file",
    tags: ["copy"],
    sizes: { "24": "DocDuplicate" },
  },
  {
    title: "Languages",
    category: "General",
    description: "Button - opens language selection",
    tags: ["globe", "localization"],
    sizes: { "18": "LanguagesSmall", "24": "Languages" },
  },
];

const mapIconsToCategory = getIconsToCategoriesMapper(
  tableHeaderTitles,
  mapIconToRow
);
const editIconRow = mapIconToRow(iconsMetadata[0]);
const docDuplicateIconRow = mapIconToRow(iconsMetadata[1]);
const languagesIconRow = mapIconToRow(iconsMetadata[2]);

describe("mapIconsToCategories", () => {
  it("returns the right amount of categories", () => {
    const categories = mapIconsToCategory(iconsMetadata);
    expect(categories).toHaveLength(2);
  });

  it("maps category icons into rows using provided mapper", () => {
    const [actionsCategory, generalCategory] = mapIconsToCategory(
      iconsMetadata
    );
    expect(actionsCategory.rows).toMatchObject([
      editIconRow,
      docDuplicateIconRow,
    ]);
    expect(generalCategory.rows).toMatchObject([languagesIconRow]);
  });
});

const initialCategories = mapIconsToCategory(iconsMetadata);
const searchCategoryIcons = getCategoryIconsSearch(
  initialCategories,
  iconsMetadata,
  mapIconsToCategory
);

describe("searchCategoryIcons", () => {
  it("searches by title", () => {
    const results = searchCategoryIcons("Edit");
    expect(results).toHaveLength(1);

    const [category] = results;
    const { rows } = category;
    expect(rows).toMatchObject([editIconRow]);
  });
  it("searches by sizes", () => {
    const results = searchCategoryIcons("EditSmall");
    expect(results).toHaveLength(1);

    const [category] = results;
    const { rows } = category;
    expect(rows).toMatchObject([editIconRow]);
  });
  it("searches by tags", () => {
    const results = searchCategoryIcons("localization");
    expect(results).toHaveLength(1);

    const [category] = results;
    const { rows } = category;
    expect(rows).toMatchObject([languagesIconRow]);
  });
  it("returns empty array when no results found", () => {
    const results = searchCategoryIcons("gibberishtext");
    expect(results).toHaveLength(0);
  });
  it("returns initial categories when query is empty", () => {
    const results = searchCategoryIcons("");
    expect(results).toBe(initialCategories);
  });
});
