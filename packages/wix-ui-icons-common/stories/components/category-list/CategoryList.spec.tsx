import React from "react";
import { render } from "@testing-library/react";
import CategoryList from "./CategoryList";
import {
  mapIconToRow,
  tableHeaderTitles,
  iconsMetadata,
  searchKeys,
} from "../../fixtures";
import dataHooks from "../../dataHooks";

const getAllByDataHook = (baseElement: HTMLElement, dataHook: string) =>
  baseElement.querySelectorAll(`[data-hook="${dataHook}"]`);

describe("<CategoryList/>", () => {
  it("renders all categories", () => {
    const { baseElement } = render(
      <CategoryList
        {...{ iconsMetadata, tableHeaderTitles, mapIconToRow, searchKeys }}
      />
    );
    const categoryTitles = getAllByDataHook(
      baseElement,
      dataHooks.categoryTableTitle
    );
    expect(categoryTitles).toHaveLength(2);
  });

  it("renders categories rows", () => {
    const { baseElement } = render(
      <CategoryList
        mapIconToRow={() => [<div data-hook={dataHooks.categoryTableCell} />]}
        {...{ iconsMetadata, tableHeaderTitles, searchKeys }}
      />
    );

    const categoryRows = getAllByDataHook(
      baseElement,
      dataHooks.categoryTableCell
    );
    expect(categoryRows).toHaveLength(3);
  });
});
