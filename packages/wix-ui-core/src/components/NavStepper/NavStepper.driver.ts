import { BaseDriver, ComponentFactory, DriverFactory } from 'wix-ui-test-utils/driver-factory';
import {Simulate} from 'react-dom/test-utils';
import {StylableDOMUtil} from 'stylable/test-utils';
import stepStyle from './NavStep.st.css';

export class NavStepperDriver implements BaseDriver {
    private styleUtil = new StylableDOMUtil(stepStyle);
    private hasStyleState = (step: HTMLLIElement, state: 'active' | 'disabled' | 'visited') => this.styleUtil.hasStyleState(step, state)
    private stepAt = (index: number) => this.element.getElementsByTagName('li')[index];
    
    constructor(private readonly element: Element) {
    }
    
    /**  returns the root element */
    get root() {
        return this.element;
    }

    /** checks if the stepper exists */
    exists() {
        return !!this.element;
    }

    /** checks if a step is active */
    isStepActive = (index: number) => this.hasStyleState(this.stepAt(index), 'active')

    /** checks if a step is disabled */
    isStepDisabled = (index: number) => this.hasStyleState(this.stepAt(index), 'disabled')

    /** checks if a step is visited */
    isStepVisited = (index: number) => this.hasStyleState(this.stepAt(index), 'visited')

    /** returns text content of a step */
    stepContentAt = (index: number) => this.stepAt(index).textContent

    clickOnStep = (index: number) => Simulate.click(this.stepAt(index));

    /** returns the active step element */
    get activeStep() { 
        return Array.from<HTMLLIElement>(this.element.getElementsByTagName('li')).find(step => this.hasStyleState(step, 'active')) 
    }
};

export const navStepperDriverFactory: DriverFactory<NavStepperDriver> = 
                ({element}: ComponentFactory): NavStepperDriver => new NavStepperDriver(element);
