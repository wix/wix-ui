import * as React from 'react';
import { ReactDOMTestContainer } from "../../../test/dom-test-container";
import {NavStepperDriver} from "./NavStepper.driver";
import {NavStepper} from "./NavStepper";

describe('NavStepper', () => {
    const container = new ReactDOMTestContainer().unmountAfterEachTest();
    
    const render = jsx =>
      container.render(jsx)
      .then(() => new NavStepperDriver(container.componentNode));

    it('should render a <nav> with an ordered list of items', async () => {
        const driver = await render(
            <NavStepper activeStep={0}>
                <NavStepper.Step>First Step</NavStepper.Step>
            </NavStepper>
        );

        expect(driver.root.tagName).toBe('NAV');
        expect(driver.root.firstElementChild.tagName).toBe('OL');
        expect(driver.stepContentAt(0)).toBe('First Step');
    });

    it('should pass active state to active step child', async () => {
        const driver = await render(
            <NavStepper activeStep={0}>
                <NavStepper.Step>First Step</NavStepper.Step>
                <NavStepper.Step>Second Step</NavStepper.Step>
            </NavStepper>
        );
        expect(driver.isStepActive(0)).toBe(true);
        expect(driver.isStepActive(1)).toBe(false);
    });
    
    it('should set aria-current attribute to active step child', async () => {
        const driver = await render(
            <NavStepper activeStep={0}>
                <NavStepper.Step>First Step</NavStepper.Step>
            </NavStepper>
        );
        expect(driver.activeStep.attributes['aria-current'].value).toBe('page');
    });

    it('should pass disabled state to disabled children', async () => {
        const driver = await render(
            <NavStepper activeStep={0}>
                <NavStepper.Step>First Step</NavStepper.Step>
                <NavStepper.Step disabled>Second Step</NavStepper.Step>
            </NavStepper>
        );
        expect(driver.isStepDisabled(0)).toBe(false);
        expect(driver.isStepDisabled(1)).toBe(true);
    });
    
    it('should pass visited state to children', async () => {
        const driver = await render(
            <NavStepper activeStep={1}>
                <NavStepper.Step>First Step</NavStepper.Step>
                <NavStepper.Step>Second Step</NavStepper.Step>
            </NavStepper>
        );
        expect(driver.isStepVisited(0)).toBe(true);
        expect(driver.isStepVisited(1)).toBe(false);
    });

    it('should allow child to override its own state', async () => {
        const driver = await render(
            <NavStepper activeStep={1}>
                <NavStepper.Step visited={false}>First Step</NavStepper.Step>
                <NavStepper.Step>Second Step</NavStepper.Step>
            </NavStepper>
        );
        expect(driver.isStepVisited(0)).toBe(false);
    });
    
    it('should allow child to pass props to the dom element', async () => {
        const driver = await render(
            <NavStepper activeStep={0}>
                <NavStepper.Step value={5}>First Step</NavStepper.Step>
            </NavStepper>
        );
        expect(driver.activeStep.value).toBe(5);
    });

    it('notifies on step click', async () => {
        const spy = jest.fn();
        const driver = await render(
            <NavStepper activeStep={0} onStepClick={spy}>
                <NavStepper.Step>First Step</NavStepper.Step>
                <NavStepper.Step>Second Step</NavStepper.Step>
            </NavStepper>
        );
        expect(spy).not.toHaveBeenCalled();
        driver.clickOnStep(1)
        expect(spy.mock.calls[0]).toEqual(expect.arrayContaining([1]));
    });
    
    it('should not notify when clicking on the active step', async () => {
        const spy = jest.fn();
        const driver = await render(
            <NavStepper activeStep={0} onStepClick={spy}>
                <NavStepper.Step>First Step</NavStepper.Step>
                <NavStepper.Step>Second Step</NavStepper.Step>
            </NavStepper>
        );
        driver.clickOnStep(0)
        expect(spy).not.toHaveBeenCalled();
    });
    
    it('should not notify when clicking on a disabled step', async () => {
        const spy = jest.fn();
        const driver = await render(
            <NavStepper activeStep={0} onStepClick={spy}>
                <NavStepper.Step>First Step</NavStepper.Step>
                <NavStepper.Step disabled>Second Step</NavStepper.Step>
            </NavStepper>
        );
        driver.clickOnStep(1)
        expect(spy).not.toHaveBeenCalled();
    });
});
