import type Fuse from "fuse.js";
import { useState, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";
import { IconMetadata } from "../../../src/types";

interface FuseConstructor<T>  {
  new (
    list: Array<T>,
    options?: Fuse.IFuseOptions<T>,): Fuse<T>;
}

const FuseIndex = require("fuse.js/dist/fuse.common") as FuseConstructor<IconMetadata>;

/** Searches icons
 * and sets the results to state
 * returns filtered and a debounced `searchCategoryIcons`
 */
function useSearchIcons(
  iconsMetadata: Array<IconMetadata>,
  keys: Array<string>
) {
  const searchIndex = useMemo(
    () =>
      new FuseIndex(iconsMetadata, {
        keys,
        threshold: 0.2,
      }),
    [iconsMetadata, keys]
  );
  const [filteredIconsMetadata, setFilteredIconsMetadata] = useState(
    iconsMetadata
  );

  // Debounced input callback
  const [debouncedSearch] = useDebouncedCallback((query: string) => {
    if (!query) {
      // When query is empty reset to initial data
      setFilteredIconsMetadata(iconsMetadata);
    } else {
      const searchResults = searchIndex.search(query);
      const filteredIconsMetadata = searchResults.map(({ item }) => item);
      setFilteredIconsMetadata(filteredIconsMetadata);
    }
  }, 300);

  return { filteredIconsMetadata, debouncedSearch };
}

export default useSearchIcons;
