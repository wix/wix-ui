import {inputWithOptionsDriverFactory} from '../../baseComponents/InputWithOptions/InputWithOptions.driver';

export const addressInputDriverFactory = (args) => {
    const {element, eventTrigger} = args;
    const input = element.querySelector('input[type=text]');
    const inputWithOptionsDriver = inputWithOptionsDriverFactory(args);

    return Object.assign(inputWithOptionsDriver, {
        change: str => eventTrigger.change(input, {target: {value: str}}),
        value: () => input.outerHTML
    });
};
