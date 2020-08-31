import { Icon, Category } from "./types";

export const mapIconsToCategories = (icons: Array<Icon>): Array<Category> => {
  const categoryMap = {};
  for (const { category = "Other", ...icon } of icons) {
    if (!categoryMap[category]) {
      categoryMap[category] = [];
    }

    categoryMap[category].push(icon);
  }

  return Object.entries(categoryMap);
};
