import { mapIconsToCategories } from "./utils";
import {
  mapIconToRow,
  tableHeaderTitles,
  iconsMetadata,
  editIconRow,
  confirmIconRow,
  languagesIconRow,
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
    expect(actionsCategory.rows).toMatchObject([editIconRow, confirmIconRow]);
    expect(generalCategory.rows).toMatchObject([languagesIconRow]);
  });
});
