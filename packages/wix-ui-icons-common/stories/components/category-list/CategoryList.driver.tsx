import dataHooks from "../../dataHooks";

const getAllByDataHook = (baseElement: HTMLElement, dataHook: string) =>
  baseElement.querySelectorAll(`[data-hook="${dataHook}"]`);

const getByDataHook = (baseElement: HTMLElement, dataHook: string) =>
  baseElement.querySelector(`[data-hook="${dataHook}"]`);

export default class CategoryListDriver {
  baseElement: HTMLElement;

  constructor(baseElement: HTMLElement) {
    this.baseElement = baseElement;
  }

  getSearchInput = () =>
    getByDataHook(
      this.baseElement,
      dataHooks.categorySearchInput
    ) as HTMLInputElement;

  getCategoryTitles = () =>
    getAllByDataHook(this.baseElement, dataHooks.categoryTableTitle);

  getCategoryRows = () =>
    getAllByDataHook(this.baseElement, dataHooks.categoryTableCell);
}
