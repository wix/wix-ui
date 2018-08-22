import * as React from 'react';
import { ReactDOMTestContainer } from "../../../test/dom-test-container";
import {Stepper} from "./Stepper";

describe('Stepper', () => {
    const container = new ReactDOMTestContainer().unmountAfterEachTest();

    const render = jsx =>
        container.render(jsx)
        .then(() => container.componentNode);

    it('should mark a step as active', async () => {
        const root = await render(
            <Stepper activeStep={0}>
                {
                    ({getStepProps}) =>  <div>{getStepProps(0).active ? 'active' : 'inactive'}</div>
                }
            </Stepper>
        );

        expect(root.textContent).toEqual('active');
    });

    it('should mark steps as inactive', async () => {
        const root = await render(
            <Stepper activeStep={1}>
                {
                    ({getStepProps}) => <div>
                        <div>{getStepProps(0).active ? 'active' : 'inactive'}</div>
                        <div>{getStepProps(2).active ? 'active' : 'inactive'}</div>
                    </div>
                }
            </Stepper>
        );
        const [first, second] = Array.from(root.getElementsByTagName('div'));
        expect(first.textContent).toEqual('inactive');
        expect(second.textContent).toEqual('inactive');
    });

    it('should mark all previous steps as visited', async () => {
        const root = await render(
            <Stepper activeStep={2}>
                {
                    ({getStepProps}) => <div>
                        <div>{getStepProps(0).visited ? 'visited' : 'not visited'}</div>
                        <div>{getStepProps(1).visited ? 'visited' : 'not visited'}</div>
                    </div>
                }
            </Stepper>
        );

        const [first, second] = Array.from(root.getElementsByTagName('div'));
        expect(first.textContent).toEqual('visited');
        expect(second.textContent).toEqual('visited');
    });

    it('should mark all next steps as not visited', async () => {
        const root = await render(
            <Stepper activeStep={0}>
                {
                    ({getStepProps}) =>  <div>
                        <div>{getStepProps(1).visited ? 'visited' : 'not visited'}</div>
                        <div>{getStepProps(2).visited ? 'visited' : 'not visited'}</div>
                    </div>
                }
            </Stepper>
        );

        const [first, second] = Array.from(root.getElementsByTagName('div'));
        expect(first.textContent).toEqual('not visited');
        expect(second.textContent).toEqual('not visited');
    });

    it('should accecpt overrides for step props', async() => {
        const root = await render(
            <Stepper activeStep={0}>
                {
                    ({getStepProps}) =>  {
                        const stepProps = getStepProps(0, {className: 'custom-step', active: false});
                        return (<div className={stepProps.className}>{stepProps.active ? 'active' : 'inactive'}</div>)
                    }
                }
            </Stepper>
        );

        expect(root.className).toBe('custom-step');
        expect(root.textContent).toBe('inactive');
    })
});