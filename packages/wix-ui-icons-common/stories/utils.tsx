import { Icon, Category, CategoryTableRow } from "./types";

export const mapIconsToCategories = (
  icons: Array<Icon>,
  tableHeaderTitles: Array<string>,
  mapIconToRow: (icon: Icon) => CategoryTableRow
): Array<Category> => {
  const categoryMap: Record<string, Category> = {};
  for (const icon of icons) {
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
