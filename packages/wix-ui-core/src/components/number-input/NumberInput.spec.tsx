import * as React from 'react';
import * as sinon from 'sinon';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {numberInputDriverFactory} from './NumberInput.driver';
import {NumberInput, NumberInputProps} from './NumberInput';
import {Simulate} from 'react-dom/test-utils';

function assertCommit(
    input: Element | null,
    onChange: sinon.SinonSpy,
    expectedValue: number | undefined
): void {
    // expect(onChange).to.have.been.calledOnce;
    // expect(onChange.lastCall.args[0]).to.deep.eq({value: expectedValue});
    // expect(input).to.have.value(String(expectedValue));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.lastCall.args[0]).toEqual({value: expectedValue});
    expect(input).toHaveProperty('value', String(expectedValue));
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
                const onChange = sinon.spy();
                const driver = await renderWithProps({value, step, onChange});
                const numberInput = await driver.getNativeInput();
                const increment = await driver.getIncrement();

                Simulate.click(increment);
                assertCommit(numberInput, onChange, value + step);
            });
            it('should increase the value by a large step when shift key is held', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const driver = await renderWithProps({value, step, onChange});
                const numberInput = await driver.getNativeInput();
                const increment = await driver.getIncrement();

                Simulate.click(increment);
                assertCommit(numberInput, onChange, value + 10 * step);
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
                const onChange = sinon.spy();
                const driver = await renderWithProps({value, min, onChange});
                const numberInput = await driver.getNativeInput();
                const increment = await driver.getIncrement();

                Simulate.click(increment);
                assertCommit(numberInput, onChange, min);
            });
        });
        


        describe('decrement', () => {
            it('should decrease the value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const driver = await renderWithProps({value, step, onChange});
                const numberInput = await driver.getNativeInput();
                const decrement = await driver.getDecrement();

                Simulate.click(decrement);
                assertCommit(numberInput, onChange, value - step);
            });

            it('should decrease the value by a large step when shift key is held', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const driver = await renderWithProps({value, step, onChange});
                const numberInput = await driver.getNativeInput();
                const decrement = await driver.getDecrement();

                Simulate.click(decrement);
                assertCommit(numberInput, onChange, value - 10 * step);
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
                const onChange = sinon.spy();
                const driver = await renderWithProps({value, max, onChange});
                const numberInput = await driver.getNativeInput();
                const decrement = await driver.getDecrement();

                Simulate.click(decrement);
                assertCommit(numberInput, onChange, max);
            });

        });
    });

    /*
    describe('keyboard interactions', () => {
        describe('up key', () => {
            it('should increase value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressUpKey();

                    assertCommit(driver.nativeInput, onChange, value + step);
                });
            });

            it('should increase value by 10*step with shift key', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressUpKey({shiftKey: true});

                    assertCommit(driver.nativeInput, onChange, value + 10 * step);
                });
            });

            it('should set value to max when value > max', async () => {
                const value = 1;
                const max = 0;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressUpKey();

                    assertCommit(driver.nativeInput, onChange, max);
                });
            });

            it('should set value to min when value < min', async () => {
                const value = 0;
                const min = 1;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressUpKey();
                    assertCommit(driver.nativeInput, onChange, min);
                });
            });

            it('should not call onChange when value = max', async () => {
                const value = 0;
                const max = 0;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressUpKey();

                    expect(onChange).not.to.have.been.called;
                    expect(driver.nativeInput).to.have.value(String(value));
                });
            });

        });

        describe('down key', () => {
            it('should decrease value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressDownKey();
                    assertCommit(driver.nativeInput, onChange, value - step);
                });
            });

            it('should decrease value by 10*step with shift key', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressDownKey({shiftKey: true});
                    assertCommit(driver.nativeInput, onChange, value - 10 * step);
                });
            });

            it('should set value to max when value > max', async () => {
                const value = 1;
                const max = 0;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressDownKey();
                    assertCommit(driver.nativeInput, onChange, max);
                });
            });

            it('should set value to min when value < min', async () => {
                const value = 0;
                const min = 1;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressDownKey();
                    assertCommit(driver.nativeInput, onChange, min);
                });
            });

            it('should not call onChange when value = min', async () => {
                const value = 0;
                const min = 0;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressDownKey();
                    expect(onChange).not.to.have.been.called;
                    expect(driver.nativeInput).to.have.value(String(value));
                });
            });

        });

        describe('value being typed', () => {

            it('should call onInput on every keystroke', async () => {
                const onInput = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput onInput={onInput} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.typeIn('1');
                    driver.typeIn('2');
                    driver.typeIn('3');
                    expect(onInput).to.have.been.calledThrice;
                    expect(onInput).to.have.been.calledWith({value: '123'});
                    expect(driver.nativeInput).to.have.value('123');
                });
            });

            it('should not commit and validate the value', async () => {
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput max={10} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.typeIn('123');
                    expect(onChange).not.to.have.been.called;
                    expect(driver.nativeInput).to.have.value('123');
                });
            });

            describe('enter', () => {
                it('should commit the entered value', async () => {
                    const onChange = sinon.spy();
                    const {driver, waitForDom} = clientRenderer.render(
                        <NumberInput onChange={onChange} />
                    ).withDriver(NumberInputDriver);

                    await waitForDom(() => {
                        driver.typeIn('123');

                        driver.pressEnter();

                        assertCommit(driver.nativeInput, onChange, 123);
                    });
                });
                it('should not commit already committed value', async () => {
                    const onChange = sinon.spy();
                    const {driver, waitForDom} = clientRenderer.render(
                        <NumberInput onChange={onChange} />
                    ).withDriver(NumberInputDriver);

                    await waitForDom(() => {
                        driver.typeIn('123');

                        driver.pressEnter();
                        driver.pressEnter();

                        assertCommit(driver.nativeInput, onChange, 123);
                    });
                });
            });

            describe('focus', () => {
                it('should commit on blur', async () => {
                    const onChange = sinon.spy();
                    const {driver, waitForDom} = clientRenderer.render(
                        <NumberInput onChange={onChange} />
                    ).withDriver(NumberInputDriver);

                    await waitForDom(() => {
                        driver.typeIn('123');

                        driver.blur();

                        assertCommit(driver.nativeInput, onChange, 123);
                    });
                });
            });

            describe('esc', () => {
                it('should discard uncommitted changes', async () => {
                    const initialValue = 3;
                    const onChange = sinon.spy();
                    const {driver, waitForDom} = clientRenderer.render(
                        <NumberInput value={initialValue} onChange={onChange} />
                    ).withDriver(NumberInputDriver);

                    await waitForDom(() => {
                        driver.typeIn('123');

                        driver.pressEsc();

                        expect(onChange).not.to.have.been.called;
                        expect(driver.nativeInput).to.have.value(String(initialValue));
                    });
                });
            });
        });
    });

    describe('children', () => {
        it('should render an elements provided by prefix suffix props', async () => {
            const {driver, waitForDom} = clientRenderer.render(
                <NumberInput
                    prefix={<span data-slot="prefix" data-automation-id="PREFIX">prefix</span>}
                    suffix={<span data-slot="suffix" data-automation-id="SUFFIX">suffix</span>}
                />
            ).withDriver(NumberInputDriver);

            await waitForDom(() => {
                expect(driver.prefix).to.be.present();
                expect(driver.suffix).to.be.present();
            });
        });
    });

    describe('uncontrolled input', () => {

        describe('defaultValue prop', () => {

            it('should set the value of input', async () => {
                const value = 11;
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput defaultValue={value} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() =>
                    expect(driver.nativeInput).to.have.value(String(value))
                );
            });

            it('should only set the value of the input once', async () => {
                const initialValue = 11;

                const {driver, waitForDom} = clientRenderer.render(
                    <StatefulUncontrolledNumberInput initialValue={initialValue} />
                ).withDriver(StatefulUnctontrolledNumberInputDriver);

                await waitForDom(() => {
                    const numberInput = driver.input;

                    driver.click();
                    driver.click();
                    driver.click();

                    expect(numberInput).to.have.value(String(initialValue));
                });
            });

        });

        describe('treating DOM as the source of truth', () => {

            it('should allow the user to enter values', async () => {
                const initialValue = 1;
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput defaultValue={initialValue} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.typeIn('23');
                    expect(driver.nativeInput).to.have.value(String(123));
                });
            });

            it('should be controlled by stepper correctly', async () => {
                const initialValue = 1;
                const newValue = 3;
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput defaultValue={initialValue} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    (driver.nativeInput as HTMLInputElement).value = String(newValue);

                    driver.clickIncrement();

                    expect(driver.nativeInput).to.have.value(String(newValue + 1));
                });
            });

        });

    });
    */
});
