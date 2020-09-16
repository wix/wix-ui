import { Category, CategoryTableRow, IconsMetadataIndex } from "./types";
import { IconMetadata } from "../src/types";

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
