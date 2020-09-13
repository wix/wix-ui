import { Category, CategoryTableRow } from "./types";
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
