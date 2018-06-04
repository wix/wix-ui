import {Simulate} from 'react-dom/test-utils';

export class PaginationDriver {
  constructor(public root: HTMLElement) { }

  get previousButton() {
    return this.root.querySelector('[data-hook=previous]');
  }

  get nextButton() {
    return this.root.querySelector('[data-hook=next]');
  }

  get firstButton() {
    return this.root.querySelector('[data-hook=first]');
  }

  get lastButton() {
    return this.root.querySelector('[data-hook=last]');
  }

  get input(): HTMLInputElement {
    return this.root.querySelector('[data-hook=page-input]');
  }

  get totalPagesLabel() {
    return this.root.querySelector('[data-hook=total-pages]');
  }

  get pageStrip() {
    return this.root.querySelector('[data-hook=page-strip]');
  }

  get pages() {
    return Array.from(this.pageStrip.firstElementChild.children);
  }

  get pageLabels() {
    return this.pages.map(p => p.textContent);
  }

  get currentPage() {
    return this.root.querySelector('[data-hook~=current-page]');
  }

  getPage(n) {
    return this.root.querySelector(`[data-hook~=page-${n}]`);
  }

  changeInput(value) {
    this.input.value = value;
    Simulate.change(this.input);
  }

  commitInput() {
    Simulate.keyDown(this.input, {keyCode: 13});
  }
}
