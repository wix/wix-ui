import React from "react";
import { act } from "react-dom/test-utils";
import {
  render,
  fireEvent,
  createEvent,
  waitForDomChange,
} from "@testing-library/react";
import CategoryList, { mapIconsToCategories } from "./CategoryList";
import { tableHeaderTitles, iconsMetadata, searchKeys } from "../../fixtures";
import dataHooks from "../../dataHooks";
import CategoryListDriver from "./CategoryList.driver";

const mapIconToRow = () => [<div data-hook={dataHooks.categoryTableCell} />];

const search = async (query: string, searchInput: HTMLInputElement) => {
  const inputEvent = createEvent.input(searchInput, {
    target: { value: query },
  });

  fireEvent(searchInput, inputEvent);

  await waitForDomChange();
};

describe("mapIconsToCategories", () => {
  it("splits icons into categories", () => {
    const categories = mapIconsToCategories(iconsMetadata);
    expect(categories).toHaveLength(2);
    const [actionsCategory, generalCategory] = categories;
    const [edit, confirm, languages] = iconsMetadata;
    expect(actionsCategory.iconsMetadata).toMatchObject([edit, confirm]);
    expect(generalCategory.iconsMetadata).toMatchObject([languages]);
  });

  it("returns categories with titles", () => {
    const categories = mapIconsToCategories(iconsMetadata);
    const [actionsCategory, generalCategory] = categories;
    expect(actionsCategory.title).toBe("Actions");
    expect(generalCategory.title).toBe("General");
  });
});

describe("<CategoryList/>", () => {
  it("renders all categories", () => {
    const { baseElement } = render(
      <CategoryList
        {...{ iconsMetadata, tableHeaderTitles, mapIconToRow, searchKeys }}
      />
    );
    const driver = new CategoryListDriver(baseElement);
    const categoryTitles = driver.getCategoryTitles();
    expect(categoryTitles).toHaveLength(2);

    const categoryRows = driver.getCategoryRows();

    expect(categoryRows).toHaveLength(3);
  });

  it("can be searched by query", async () => {
    const { baseElement } = render(
      <CategoryList
        {...{ iconsMetadata, tableHeaderTitles, searchKeys, mapIconToRow }}
      />
    );
    const driver = new CategoryListDriver(baseElement);
    const searchInput = driver.getSearchInput();

    expect(driver.getCategoryRows()).toHaveLength(3);

    const [edit] = iconsMetadata;
    const query = edit.title;
    await search(query, searchInput);

    expect(driver.getCategoryRows()).toHaveLength(1);
  });
});
