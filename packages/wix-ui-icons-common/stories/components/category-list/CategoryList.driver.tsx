import { fireEvent, createEvent } from "@testing-library/react";
import dataHooks from "../../dataHooks";

const getAllByDataHook = (baseElement: Element, dataHook: string) =>
  baseElement.querySelectorAll(`[data-hook="${dataHook}"]`);

const getByDataHook = (baseElement: Element, dataHook: string) =>
  baseElement.querySelector(`[data-hook="${dataHook}"]`);

const getSearchInput = (baseElement: Element) =>
  getByDataHook(baseElement, dataHooks.categorySearchInput) as HTMLInputElement;

const getCategoryRows = (baseElement: Element) =>
  getAllByDataHook(baseElement, dataHooks.categoryTableCell);

export default class CategoryListDriver {
  baseElement: Element;

  constructor(baseElement: Element) {
    this.baseElement = baseElement;
  }

  getAmountOfCategoryTitles = () =>
    getAllByDataHook(this.baseElement, dataHooks.categoryTableTitle).length;

  getAmountOfCategoryRows = () => getCategoryRows(this.baseElement).length;

  getRowText = (index: number) => {
    const categoryRows = getCategoryRows(this.baseElement);
    const row = categoryRows.item(index);
    return row.textContent;
  };

  search = (query: string) => {
    const searchInput = getSearchInput(this.baseElement);
    const inputEvent = createEvent.input(searchInput, {
      target: { value: query },
    });

    fireEvent(searchInput, inputEvent);
  };
}
