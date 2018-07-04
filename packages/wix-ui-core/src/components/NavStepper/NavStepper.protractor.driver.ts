import {ElementFinder} from "protractor";
import {DriverFactory, BaseDriver} from "../../common/BaseDriver.protractor";

export class NavStepperDriver implements BaseDriver {
    constructor(private component: ElementFinder) {
    }
    
    element() {
        return this.component;
    }
}

export const navStepperDriverFactory: DriverFactory<NavStepperDriver> = component => new NavStepperDriver(component);