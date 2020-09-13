import {
  mapIconsToCategories,
  searchCategoryIcons,
  getSearchIndex,
} from "./utils";
import { IconMetadata } from "../src/types";
import {
  mapIconToRow,
  tableHeaderTitles,
  iconsMetadata,
  editIconRow,
  confirmIconRow,
  languagesIconRow,
  initialCategories,
} from "./fixtures";
import { Category, IconsMetadataIndex } from "./types";

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
      confirmIconRow,
    ]);
    expect(generalCategory.rows).toMatchObject([languagesIconRow]);
  });
});

const searchIndex = getSearchIndex(iconsMetadata);

const mapSearchResultsToCategories = (searchResults: Array<IconMetadata>) =>
mapIconsToCategories(searchResults, tableHeaderTitles, mapIconToRow);

const searchParams: [
  searchIndex: IconsMetadataIndex,
  initialCategories: Array<Category>,
  mapSearchResultsToCategories: typeof mapSearchResultsToCategories] = [
  searchIndex,
  initialCategories,
  mapSearchResultsToCategories,
];

describe("searchCategoryIcons", () => {
  it("searches by title", () => {
    const results = searchCategoryIcons("Edit", ...searchParams);
    expect(results).toHaveLength(1);

    const [category] = results;
    const { rows } = category;
    expect(rows).toMatchObject([editIconRow]);
  });
  it("searches by sizes", () => {
    const results = searchCategoryIcons("EditSmall", ...searchParams);
    expect(results).toHaveLength(1);

    const [category] = results;
    const { rows } = category;
    expect(rows).toMatchObject([editIconRow]);
  });
  it("searches by tags", () => {
    const results = searchCategoryIcons("localization", ...searchParams);
    expect(results).toHaveLength(1);

    const [category] = results;
    const { rows } = category;
    expect(rows).toMatchObject([languagesIconRow]);
  });
  it("searches by aliases", () => {
    const results = searchCategoryIcons("Check", ...searchParams);
    expect(results).toHaveLength(1);

    const [category] = results;
    const { rows } = category;
    expect(rows).toMatchObject([confirmIconRow]);
  });
  it("returns empty array when no results found", () => {
    const results = searchCategoryIcons("gibberishtext", ...searchParams);
    expect(results).toHaveLength(0);
  });
  it("returns initial categories when query is empty", () => {
    const results = searchCategoryIcons("", ...searchParams);
    expect(results).toBe(initialCategories);
  });
});
