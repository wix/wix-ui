import { mapIconsToCategories, getCategoryIconsSearch } from "./utils";
import { IconMetadata } from "../src/types";
import {
  mapIconToRow,
  tableHeaderTitles,
  iconsMetadata,
  editIconRow,
  docDuplicateIconRow,
  languagesIconRow,
  initialCategories,
} from "./fixtures";

describe("mapIconsToCategories", () => {
  it("returns the right amount of categories", () => {
    const categories = mapIconsToCategories(
      iconsMetadata,
      tableHeaderTitles,
      mapIconToRow
    );
    expect(categories).toHaveLength(2);
  });

  it("maps category icons into rows using provided mapper", () => {
    const [actionsCategory, generalCategory] = mapIconsToCategories(
      iconsMetadata,
      tableHeaderTitles,
      mapIconToRow
    );
    expect(actionsCategory.rows).toMatchObject([
      editIconRow,
      docDuplicateIconRow,
    ]);
    expect(generalCategory.rows).toMatchObject([languagesIconRow]);
  });
});
const searchCategoryIcons = getCategoryIconsSearch(
  initialCategories,
  iconsMetadata,
  (iconsMetadata: Array<IconMetadata>) =>
    mapIconsToCategories(iconsMetadata, tableHeaderTitles, mapIconToRow)
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
