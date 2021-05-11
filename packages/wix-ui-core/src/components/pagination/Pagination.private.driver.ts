import { Simulate } from 'react-dom/test-utils';
import { queryHook } from 'wix-ui-test-utils/dom';

import { PaginationDataHooks } from './DataHooks';

export class PaginationDriver {
  constructor(public root: HTMLElement) {}

  get previousButton() {
    return queryHook(this.root, PaginationDataHooks.previous);
  }

  get nextButton() {
    return queryHook(this.root, PaginationDataHooks.next);
  }

  get firstButton() {
    return queryHook(this.root, PaginationDataHooks.first);
  }

  get lastButton() {
    return queryHook(this.root, PaginationDataHooks.last);
  }

  get input(): HTMLInputElement {
    return queryHook(this.root, PaginationDataHooks.pageInput);
  }

  get totalPagesLabel() {
    return queryHook(this.root, PaginationDataHooks.totalPages);
  }

  get slashLabel() {
    return queryHook(this.root, PaginationDataHooks.slashLabel);
  }

  get pageStrip() {
    return queryHook(this.root, PaginationDataHooks.pageStrip);
  }

  get pageCompact() {
    return queryHook(this.root, PaginationDataHooks.pageCompact);
  }

  get pages() {
    return Array.from(this.pageStrip.firstElementChild.children);
  }

  get pageLabels() {
    return this.pages.map((p) => p.textContent);
  }

  get currentPage() {
    return queryHook(this.root, PaginationDataHooks.currentPage);
  }

  getPage(n) {
    return queryHook(this.root, `${PaginationDataHooks.page}-${n}`);
  }

  changeInput(value) {
    this.input.value = value;
    Simulate.change(this.input);
  }

  commitInput() {
    Simulate.keyDown(this.input, { keyCode: 13 });
  }
}
