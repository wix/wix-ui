import Fuse from "fuse.js";
import { Category, CategoryTableRow, IconsMetadataIndex } from "./types";
import { IconMetadata } from "../src/types";

export const mapIconsToCategories = (
  iconsMetadata: Array<IconMetadata>,
  tableHeaderTitles: Array<string>,
  mapIconToRow: (icon: IconMetadata) => CategoryTableRow
): Array<Category> => {
  const categoryMap: Record<string, Category> = {};
  for (const icon of iconsMetadata) {
    const { category = "Uncategorized" } = icon;
    // Add category
    if (!categoryMap[category]) {
      categoryMap[category] = {
        title: category,
        tableHeaderTitles,
        rows: [],
      };
    }

    const iconRow = mapIconToRow(icon);
    categoryMap[category].rows.push(iconRow);
  }

  return Object.values(categoryMap);
};

// Get Fuse search index to query icons by text
export const getSearchIndex = (
  iconsMetadata: Array<IconMetadata>
): IconsMetadataIndex =>
  new Fuse(iconsMetadata, {
    keys: ["title", "sizes.18", "sizes.24", "tags"],
    threshold: 0.2,
  });

/** Searches `searchIndex` by `query` text
 * returns categories containing icon search results.
 */
export const searchCategoryIcons = (
  query: string,
  searchIndex: IconsMetadataIndex,
  initialCategories: Array<Category>, // Categories to show when query is empty
  mapIconsToCategories: (iconsMetadata: Array<IconMetadata>) => Array<Category>
) => {
  if (!query) {
    return initialCategories;
  }
  const searchResults = searchIndex.search(query);
  const filteredIcons = searchResults.map(({ item }) => item);
  const filteredCategories = mapIconsToCategories(filteredIcons);
  return filteredCategories;
};
