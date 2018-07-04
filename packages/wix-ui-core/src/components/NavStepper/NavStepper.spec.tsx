import * as React from 'react';
import { ReactDOMTestContainer } from "../../../test/dom-test-container";
import {NavStepperDriverFactory} from "./NavStepper.driver";
import {NavStepper} from "./NavStepper";

describe('NavStepper', () => {
    const container = new ReactDOMTestContainer().unmountAfterEachTest();
    
    const render = jsx =>
      container.render(jsx)
      .then(() => new NavStepperDriverFactory(container.componentNode));

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
});