import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Category } from "../../types";

/** Searches icons with `searchCategoryIcons`
 * and sets the resulting categories to state
 * returns categories and a debounced `searchCategoryIcons`
 */
function useCategoryListSearch(
  initialCategories: Array<Category>,
  searchCategoryIcons: (query: string) => Array<Category>
) {
  const [categories, setCategories] = useState(initialCategories);

  // Debounced input callback
  const [debouncedSearch] = useDebouncedCallback((query: string) => {
    const filteredCategories = searchCategoryIcons(query);
    setCategories(filteredCategories);
  }, 300);

  return { categories, debouncedSearch };
}

export default useCategoryListSearch;
