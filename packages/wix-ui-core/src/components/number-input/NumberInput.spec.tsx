import * as React from 'react';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {numberInputDriverFactory} from './NumberInput.driver';
import {NumberInput, NumberInputProps} from './NumberInput';
import {Simulate} from 'react-dom/test-utils';

function assertInput(
    input: Element | null,
    onInput: jest.Mock,
    expectedValue: number | undefined
): void {
    expect(onInput).toHaveBeenCalledTimes(1);
    expect(onInput).toHaveBeenCalledWith({value: String(expectedValue)})
    expect(input).toHaveProperty('value', String(expectedValue));
}

function assertCommit(
    input: Element | null,
    onChange: jest.Mock,
    expectedValue: number | undefined
): void {
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({value: expectedValue});
    expect(input).toHaveProperty('value', String(expectedValue));
}

function blurAndAssetCommin(
    input: Element | null,
    onChange: jest.Mock,
    expectedValue: number | undefined
) {
    Simulate.blur(input);
    assertCommit(input, onChange, expectedValue);
}

describe('NumberInput', () => {
    const createDriver = new ReactDOMTestContainer()
        .unmountAfterEachTest()
        .createUniRendererAsync(numberInputDriverFactory);

    const renderWithProps = (props: NumberInputProps) => {
        return createDriver(
            <NumberInput {...props}/>
        )
    }

    it('should output an input form element with type="number" by default', async () => {
        const value = 0;
        const min = -5;
        const max = 5;
        const step = 2;
        const name = 'input-name';
        const driver = await renderWithProps({value, min, max, step, name});

        const numberInput = await driver.getNativeInput();

        expect(numberInput).toBeDefined();
        expect(numberInput).toHaveProperty('tagName', 'INPUT');
        expect(numberInput).toHaveProperty('type', 'number');
        expect(numberInput).toHaveProperty('min', String(min));
        expect(numberInput).toHaveProperty('max', String(max));
        expect(numberInput).toHaveProperty('step', String(step));
        expect(numberInput).toHaveProperty('name', String(name));
        expect(numberInput).toHaveProperty('required', false);
        expect(numberInput).toHaveProperty('value', String(value));
    });

    it('should only set appropriate attributes on native input', async () => {
        const value = 0;
        const driver = await renderWithProps({value});

        const numberInput = await driver.getNativeInput();

        expect(numberInput).toBeDefined();
        expect(numberInput).toHaveProperty('tagName', 'INPUT');

        expect(numberInput).toHaveProperty('type', 'number');
        expect(numberInput).toHaveProperty('value', String(value));
        expect(numberInput.getAttribute('min')).toBeNull();
        expect(numberInput.getAttribute('max')).toBeNull();
        expect(numberInput.getAttribute('step')).toBeNull();
        expect(numberInput.getAttribute('name')).toBeNull();
        expect(numberInput.getAttribute('required')).toBeNull();
    });

    it('can be disabled', async () => {
        const value = 0;
        const driver = await renderWithProps({value, disabled: true});

        const numberInput = await driver.getNativeInput();
        const increment = await driver.getIncrement();
        const decrement = await driver.getDecrement();

        expect(numberInput).toHaveProperty('disabled', true);
        expect(increment).toHaveProperty('disabled', true);
        expect(decrement).toHaveProperty('disabled', true);
    });

    it('should render a stepper', async () => {
        const driver = await renderWithProps({value: 0});
        const stepper = await driver.getStepper();
        expect(stepper).toBeDefined();
    });

    describe('Stepper', () => {
        it('should render increment and decrement controls', async () => {
            const driver = await renderWithProps({value: 0});

            const increment = await driver.getIncrement();
            const decrement = await driver.getDecrement();

            expect(increment).toBeDefined();
            expect(decrement).toBeDefined();
        });

        describe('increment', () => {
            it('should increase the value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, step, onChange, onInput});
                const numberInput = await driver.getNativeInput();
                const increment = await driver.getIncrement();

                Simulate.click(increment);
                assertInput(numberInput, onInput, value + step);
                blurAndAssetCommin(numberInput, onChange, value + step);
            });
            it('should increase the value by a large step when shift key is held', async () => {
                const value = 0;
                const step = 2;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, step, onChange, onInput});
                const numberInput = await driver.getNativeInput();
                const increment = await driver.getIncrement();

                Simulate.click(increment, {shiftKey: true});
                assertInput(numberInput, onInput, value + 10 * step);
                blurAndAssetCommin(numberInput, onChange, value + 10 * step);
            });
            it('should be disabled when value >= max', async () => {
                const value = 2;
                const max = 2;
                const driver = await renderWithProps({value, max});
                const increment = await driver.getIncrement();

                expect(increment).toHaveProperty('disabled', true)
            });
            it('should set the value to min when value < min', async () => {
                const value = -3;
                const min = 0;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, min, onChange, onInput});
                const numberInput = await driver.getNativeInput();
                const increment = await driver.getIncrement();

                Simulate.click(increment);
                assertInput(numberInput, onInput, value + 1);
                blurAndAssetCommin(numberInput, onChange, min);
            });
        });
        
        describe('decrement', () => {
            it('should decrease the value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, step, onChange, onInput});
                const numberInput = await driver.getNativeInput();
                const decrement = await driver.getDecrement();

                Simulate.click(decrement);
                assertInput(numberInput, onInput, value - step);
                blurAndAssetCommin(numberInput, onChange, value - step);
            });

            it('should decrease the value by a large step when shift key is held', async () => {
                const value = 0;
                const step = 2;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, step, onChange, onInput});
                const numberInput = await driver.getNativeInput();
                const decrement = await driver.getDecrement();

                Simulate.click(decrement, {shiftKey: true});
                assertInput(numberInput, onInput, value - 10 * step);
                blurAndAssetCommin(numberInput, onChange, value - 10 * step);
            });

            it('should be disabled when value <= min', async () => {
                const value = -1;
                const min = 0;
                const driver = await renderWithProps({value, min});
                const decrement = await driver.getDecrement();

                expect(decrement).toHaveProperty('disabled', true)
            });

            it('should set the value to max when value > max', async () => {
                const value = 3;
                const max = 0;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, max, onChange, onInput});
                const numberInput = await driver.getNativeInput();
                const decrement = await driver.getDecrement();

                Simulate.click(decrement);
                assertInput(numberInput, onInput, value - 1);
                blurAndAssetCommin(numberInput, onChange, max);
            });

        });
    });

    describe('keyboard interactions', () => {
        describe('up key', () => {
            it('should increase value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, step, onChange, onInput});
                const numberInput = await driver.getNativeInput();

                await driver.keyDown('up')
                assertInput(numberInput, onInput, value + step);
                blurAndAssetCommin(numberInput, onChange, value + step);
            });

            it('should increase value by 10*step with shift key', async () => {
                const value = 0;
                const step = 2;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, step, onChange, onInput});
                const numberInput = await driver.getNativeInput();

                await driver.keyDown('up', {shiftKey: true})
                assertInput(numberInput, onInput, value + 10 * step);
                blurAndAssetCommin(numberInput, onChange, value + 10 * step);
            });

            it('should set value to max when value > max', async () => {
                const value = 1;
                const max = 0;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, max, onChange, onInput});
                const numberInput = await driver.getNativeInput();

                await driver.keyDown('up')
                assertInput(numberInput, onInput, value + 1);
                blurAndAssetCommin(numberInput, onChange, max);
            });

            it('should set value to min when value < min', async () => {
                const value = 0;
                const min = 1;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, min, onChange, onInput});
                const numberInput = await driver.getNativeInput();

                await driver.keyDown('up')
                assertInput(numberInput, onInput, value + 1);
                blurAndAssetCommin(numberInput, onChange, min);
            });

            it('should not call onChange when value = max', async () => {
                const value = 0;
                const max = 0;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, max, onChange, onInput});
                const numberInput = await driver.getNativeInput();

                await driver.keyDown('up')
                assertInput(numberInput, onInput, value + 1);
                Simulate.blur(numberInput);
                expect(onChange).not.toBeCalled();
            });

        });

        describe('down key', () => {
            it('should decrease value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, step, onChange, onInput});
                const numberInput = await driver.getNativeInput();

                await driver.keyDown('down')
                assertInput(numberInput, onInput, value - step);
                blurAndAssetCommin(numberInput, onChange, value - step);
            });

            it('should decrease value by 10*step with shift key', async () => {
                const value = 0;
                const step = 2;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, step, onChange, onInput});
                const numberInput = await driver.getNativeInput();

                await driver.keyDown('down', {shiftKey: true})
                assertInput(numberInput, onInput, value - step * 10);
                blurAndAssetCommin(numberInput, onChange, value - step * 10);
            });

            it('should set value to max when value > max', async () => {
                const value = 1;
                const max = 0;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, max, onChange, onInput});
                const numberInput = await driver.getNativeInput();

                await driver.keyDown('down')
                assertInput(numberInput, onInput, value - 1);
                blurAndAssetCommin(numberInput, onChange, max);
            });

            it('should set value to min when value < min', async () => {
                const value = 0;
                const min = 1;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, min, onChange, onInput});
                const numberInput = await driver.getNativeInput();

                await driver.keyDown('down')
                assertInput(numberInput, onInput, value - 1);
                blurAndAssetCommin(numberInput, onChange, min);
            });

            it('should not call onChange when value = min', async () => {
                const value = 0;
                const min = 0;
                const onChange = jest.fn();
                const onInput = jest.fn();
                const driver = await renderWithProps({value, min, onChange, onInput});
                const numberInput = await driver.getNativeInput();

                await driver.keyDown('down')
                assertInput(numberInput, onInput, value - 1);
                Simulate.blur(numberInput);
                expect(onChange).not.toBeCalled();
            });

        });

        describe('value being typed', () => {

            it('should call onInput on every keystroke', async () => {
                const onInput = jest.fn();
                const driver = await renderWithProps({onInput});
                const numberInput = await driver.getNativeInput();

                await driver.typeIn('1');
                await driver.typeIn('2');
                await driver.typeIn('3');
                expect(onInput).toHaveBeenCalledTimes(3);
                expect(onInput).lastCalledWith({value: '123'});
                expect(numberInput).toHaveProperty('value', '123');
            });

            it('should not commit and validate the value', async () => {
                const onInput = jest.fn();
                const onChange = jest.fn();
                const max = 10;
                const driver = await renderWithProps({onInput, onChange, max});
                const numberInput = await driver.getNativeInput();

                await driver.typeIn('123');
                expect(onChange).not.toBeCalled();
                expect(numberInput).toHaveProperty('value', '123');
            });

            describe('enter', () => {
                it('should commit the entered value', async () => {
                    const onChange = jest.fn();
                    const driver = await renderWithProps({onChange, useKeyboard: true});
                    const numberInput = await driver.getNativeInput();

                    await driver.typeIn('123');
                    await driver.keyDown('enter');
                    assertCommit(numberInput, onChange, 123);
                });
                it('should not commit already committed value', async () => {
                    const onChange = jest.fn();
                    const driver = await renderWithProps({onChange, useKeyboard: true});
                    const numberInput = await driver.getNativeInput();

                    await driver.typeIn('123');
                    await driver.keyDown('enter');
                    await driver.keyDown('enter');
                    assertCommit(numberInput, onChange, 123);
                });
            });

            describe('focus', () => {
                it('should commit on blur', async () => {
                    const onChange = jest.fn();
                    const driver = await renderWithProps({onChange});
                    const numberInput = await driver.getNativeInput();

                    await driver.typeIn('123');
                    Simulate.blur(numberInput);
                    assertCommit(numberInput, onChange, 123);
                });
            });

            describe('esc', () => {
                it('should discard uncommitted changes', async () => {
                    const initialValue = 3;
                    const onChange = jest.fn();
                    const driver = await renderWithProps({onChange, value: initialValue, useKeyboard: true});
                    const numberInput = await driver.getNativeInput();

                    await driver.typeIn('123');
                    await driver.keyDown('esc');
                    expect(numberInput).toHaveProperty('value', String(initialValue));
                    expect(onChange).not.toBeCalled();
                });
            });
        });
    });

    describe('children', () => {
        it('should render an elements provided by prefix suffix props', async () => {
            const driver = await renderWithProps({
                prefix: <span data-slot="prefix" data-automation-id="PREFIX">prefix</span>,
                suffix: <span data-slot="suffix" data-automation-id="SUFFIX">suffix</span>
            });
            const prefix = await driver.getPrefix();
            const suffix = await driver.getSuffix();

            expect(prefix).toBeDefined();
            expect(suffix).toBeDefined();
        });
    });

    describe('uncontrolled input', () => {

        describe('defaultValue prop', () => {

            it('should set the value of input', async () => {
                const value = 11;
                const driver = await renderWithProps({defaultValue: value});
                const nativeInput = await driver.getNativeInput();

                expect(nativeInput).toHaveProperty('value', String(value));
            });
        });

        describe('treating DOM as the source of truth', () => {

            it('should allow the user to enter values', async () => {
                const value = 1;
                const driver = await renderWithProps({defaultValue: value});
                const nativeInput = await driver.getNativeInput();

                await driver.typeIn('23');
                expect(nativeInput).toHaveProperty('value', String(123));
            });

            it('should be controlled by stepper correctly', async () => {
                const initialValue = 1;
                const newValue = 3;
                const driver = await renderWithProps({defaultValue: initialValue});
                const nativeInput = await driver.getNativeInput();
                const increment = await driver.getIncrement();

                nativeInput.value = String(newValue);
                Simulate.click(increment);

                expect(nativeInput).toHaveProperty('value', String(newValue + 1));
            });

        });

    });
});
