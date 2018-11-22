import {Simulate} from 'react-dom/test-utils';
import {queryHook} from 'wix-ui-test-utils/dom';

export class PaginationDriver {
  constructor(public root: HTMLElement) { }

  get previousButton() {
    return queryHook(this.root, 'previous');
  }

  get nextButton() {
    return queryHook(this.root, 'next');
  }

  get firstButton() {
    return queryHook(this.root, 'first');
  }

  get lastButton() {
    return queryHook(this.root, 'last');
  }

  get input(): HTMLInputElement {
    return queryHook(this.root, 'page-input');
  }

  get totalPagesLabel() {
    return queryHook(this.root, 'total-pages');
  }

  get pageStrip() {
    return queryHook(this.root, 'page-strip');
  }

  get pages() {
    return Array.from(this.pageStrip.firstElementChild.children);
  }

  get pageLabels() {
    return this.pages.map(p => p.textContent);
  }

  get currentPage() {
    return queryHook(this.root, 'current-page');
  }

  getPage(n) {
    return queryHook(this.root, `page-${n}`);
  }

  changeInput(value) {
    this.input.value = value;
    Simulate.change(this.input);
  }

  commitInput() {
    Simulate.keyDown(this.input, {keyCode: 13});
  }
}
