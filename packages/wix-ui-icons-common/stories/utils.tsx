import { Icon, Category, CategoryTableRow } from "./types";

export const mapIconsToCategories = (
  icons: Array<Icon>,
  columns: Array<string>,
  mapIconToRow: (icon: Icon) => CategoryTableRow
): Array<Category> => {
  const categoryMap: Record<string, Category> = {};
  for (const icon of icons) {
    const { category = "Other" } = icon;
    // Add category
    if (!categoryMap[category]) {
      categoryMap[category] = {
        title: category,
        columns,
        rows: [],
      };
    }

    const iconRow = mapIconToRow(icon);
    categoryMap[category].rows.push(iconRow);
  }

  return Object.values(categoryMap);
};
