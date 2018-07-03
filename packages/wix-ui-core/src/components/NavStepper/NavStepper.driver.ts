import {StylableDOMUtil} from 'stylable/test-utils';
import stepStyle from './NavStep.st.css';

export class NavStepperDriverFactory {
    private styleUtil = new StylableDOMUtil(stepStyle);
    private hasStyleState = (step: HTMLLIElement, state: 'active' | 'disabled' | 'visited') => this.styleUtil.hasStyleState(step, state)
    private stepAt = (index: number) => this.element.getElementsByTagName('li')[index];
    
    constructor(private readonly element: HTMLElement) {
    }
    
    /**  returns the root element */
    get root() {
        return this.element;
    }

    /** checks if the stepper exists */
    get exists() {
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

    /** returns the active step element */
    get activeStep() { 
        return Array.from<HTMLLIElement>(this.element.getElementsByTagName('li')).find(step => this.hasStyleState(step, 'active')) 
    }
};
