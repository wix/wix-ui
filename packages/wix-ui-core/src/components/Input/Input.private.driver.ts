import {Input} from './Input';

export class InputDriver {
  constructor(public root: HTMLElement, public instance: Input) {}

  get input() {
    return this.root.querySelector('input');
  }

  get prefix() {
    return this.input.previousSibling;
  }

  get suffix() {
    return this.input.nextSibling;
  }
}
