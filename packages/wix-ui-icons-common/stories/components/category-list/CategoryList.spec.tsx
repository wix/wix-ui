/**
 * FIXME:
 * remove when yoshi is updated to use jsdom 14
 * @jest-environment jest-environment-jsdom-fourteen
 */
import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import CategoryList, { mapIconsToCategories } from "./CategoryList";
import { tableHeaderTitles, iconsMetadata, searchKeys } from "../../fixtures";
import dataHooks from "../../dataHooks";
import CategoryListDriver from "./CategoryList.driver";

const mapIconToRow = ({ title }) => [
  <div data-hook={dataHooks.categoryTableCell}>{title}</div>,
];

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
    // assert amount of category tables rendered
    expect(driver.getAmountOfCategoryTitles()).toBe(2);

    expect(driver.getAmountOfCategoryRows()).toBe(3);
  });

  it("can be searched by query", async () => {
    const { baseElement } = render(
      <CategoryList
        {...{ iconsMetadata, tableHeaderTitles, searchKeys, mapIconToRow }}
      />
    );
    const driver = new CategoryListDriver(baseElement);

    expect(driver.getAmountOfCategoryRows()).toBe(3);

    const [edit] = iconsMetadata;
    const query = edit.title;
    driver.search(query);

    await waitFor(() => {
      expect(driver.getAmountOfCategoryRows()).toBe(1);
    });

    expect(driver.getRowText(0)).toBe("Edit");
  });
});
