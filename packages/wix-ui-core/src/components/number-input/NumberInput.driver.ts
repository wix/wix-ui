import {UniDriver} from 'unidriver';

export const numberInputDriverFactory = (base: UniDriver, body: UniDriver) => {
    const buildSelector = (selector: string) => `[data-automation-id="${selector}"]`;
    const selectNative = <T = HTMLElement>(selector: string): Promise<T> => base.$(buildSelector(selector)).getNative();

    return {
        getNativeInput: () => selectNative<HTMLInputElement>('NATIVE_INPUT_NUMBER'),
        getStepper: () => selectNative('NUMBER_INPUT_STEPPER'),
        getIncrement: () => selectNative<HTMLButtonElement>('STEPPER_INCREMENT'),
        getDecrement: () => selectNative<HTMLButtonElement>('STEPPER_DECREMENT')
    }
}