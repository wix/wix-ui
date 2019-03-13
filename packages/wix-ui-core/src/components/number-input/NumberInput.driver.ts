import {UniDriver} from 'unidriver';
import * as keycode from 'keycode';
import {Simulate} from 'react-dom/test-utils';
import {Modifiers} from './stepper';

export const numberInputDriverFactory = (base: UniDriver, body: UniDriver) => {
    const buildSelector = (selector: string) => `[data-automation-id="${selector}"]`;
    const selectNative = <T = HTMLElement>(selector: string): Promise<T> => base.$(buildSelector(selector)).getNative();

    const getNativeInput = () => selectNative<HTMLInputElement>('NATIVE_INPUT_NUMBER');
    const getStepper = () => selectNative('NUMBER_INPUT_STEPPER');
    const getIncrement = () => selectNative<HTMLButtonElement>('STEPPER_INCREMENT');
    const getDecrement = () => selectNative<HTMLButtonElement>('STEPPER_DECREMENT');
    const getPrefix = () => selectNative('PREFIX');
    const getSuffix = () => selectNative('SUFFIX');

    return {
        getNativeInput,
        getStepper,
        getIncrement,
        getDecrement,
        getPrefix,
        getSuffix,
        keyDown: async (key: string, opts?: Modifiers) => {
            const input = await getNativeInput();
            input.focus();
            Simulate.keyDown(input, {keyCode: keycode(key), ...opts});
        },
        typeIn: async (key: string) => {
            const input = await getNativeInput();
            input.value += key;
            Simulate.change(input);
        }
    }
}