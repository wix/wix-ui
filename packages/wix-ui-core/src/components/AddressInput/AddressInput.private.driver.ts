import {Simulate} from 'react-dom/test-utils'
import {queryHook, queryHookAll} from 'wix-ui-test-utils/dom'
import * as waitForCond from 'wait-for-cond';

export class AddressInputPrivateDriver {
    constructor(public root: HTMLElement) { }

    get value() {
        return this.root.querySelector('input').value;
    }

    type(value) {
        const input = this.root.querySelector('input');
        Simulate.click(input);
        input.value = value;
        Simulate.change(input);
    }

    selectOption(index) {
        const option = queryHookAll(this.root, 'option')[index];
        Simulate.click(option);
    }

    waitForContentElement() {
        return waitForCond(() => queryHook(this.root, 'popover-content'));
    }

    waitForValue(value) {
        return waitForCond(() => this.value === value);
    }
}
