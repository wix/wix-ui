import {
    BaseUniDriver,
    baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { UniDriver, StylableUnidriverUtil } from 'wix-ui-test-utils/unidriver';
import styles from './ToggleSwitch.st.css';
import { ReactBase } from '../../../test/utils/unidriver/ReactBase';
import { dataHooks } from "./constants";

export interface ToggleSwitchUniDriver extends BaseUniDriver {
    // /** Checks if element exists */
    // exists(): null,
    // /** Triggers change */
    // click(): null,
    /** Returns a boolean indicating if the toggleSwitch is checked */
    isChecked(): Promise<boolean>,
    /** Returns a boolean indicating if the toggleSwitch is disabled */
    isDisabled(): Promise<boolean>,
    // /** Returns the toggle icon inside the knob */
    // getKnobIcon(): Promise<object>,
    // /** Returns whether the toggle has an icon */
    // hasKnobIcon(): Promise<boolean>,
    /** Returns the id of the input */
    getId(): Promise<string>,
    /** Returns the tab index */
    getTabIndex(): Promise<number>,
    // /** Returns the computed styles object of the root component */
    // getRootStyles(): Promise<object>,
    // /** Returns the computed styles object of the track */
    // getTrackStyles(): Promise<object>,
    // /** Returns the computed styles object of the knob */
    // getKnobStyles(): Promise<object>,
    // /** Returns the computed styles object of the knob icon */
    // getKnobIconStyles(): Promise<object>,
}

export const toggleSwitchUniDriverFactory = (
    base: UniDriver,
): ToggleSwitchUniDriver => {
    const byDataHook = dataHook => `[data-hook="${dataHook}"]`;
    const stylableUnidriverUtil = new StylableUnidriverUtil(styles);

    const knob = base.$(byDataHook(dataHooks.knob));
    const knobIcon = base.$(byDataHook(dataHooks.knobIcon));
    const input = base.$(byDataHook(dataHooks.toggleSwitchInput));
    const track = base.$(byDataHook(dataHooks.track));


    return {
        ...baseUniDriverFactory(base),
        click: () => base.click(),
        isChecked: () => stylableUnidriverUtil.hasStyleState(base, 'checked'),
        isDisabled: () => stylableUnidriverUtil.hasStyleState(base, 'disabled'),
        //getKnobIcon: async () => console.log(await knobIcon.attr('children')) ,
        // hasKnobIcon: () => null,
        getId: async () => await input.attr('id'),
        getTabIndex: async () => Number(await input.attr('tabindex')),
        // getRootStyles: () => null,
        // getTrackStyles: () => null,
        // getKnobStyles: () => null,
        // getKnobIconStyles: () => null,
    };
};
