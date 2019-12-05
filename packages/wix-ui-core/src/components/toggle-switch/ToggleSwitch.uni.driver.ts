import {
    BaseUniDriver,
    baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { UniDriver, StylableUnidriverUtil } from 'wix-ui-test-utils/unidriver';
import styles from './ToggleSwitch.st.css';
import { dataHooks } from "./constants";

export interface ToggleSwitchUniDriver extends BaseUniDriver {
    /** Triggers change */
    click(): Promise<void>,
    /** Returns a boolean indicating if the toggleSwitch is checked */
    isChecked(): Promise<boolean>,
    /** Returns a boolean indicating if the toggleSwitch is disabled */
    isDisabled(): Promise<boolean>,
    // /** Returns the toggle icon inside the knob */
    getKnobIcon(): Promise<object>,
    /** Returns whether the toggle has an icon */
    hasKnobIcon(): Promise<boolean>,
    /** Returns the id of the input */
    getId(): Promise<string>,
    /** Returns the tab index */
    getTabIndex(): Promise<number>,
    /** Returns the computed styles object of the root component */
    getRootStyles(): Promise<object>,
    /** Returns the computed styles object of the track */
    getTrackStyles(): Promise<object>,
    /** Returns the computed styles object of the knob */
    getKnobStyles(): Promise<object>,
    /** Returns the computed styles object of the knob icon */
    getKnobIconStyles(): Promise<object>,
}

export const toggleSwitchUniDriverFactory = (
    base: UniDriver,
): ToggleSwitchUniDriver => {
    const byDataHook = dataHook => `[data-hook="${dataHook}"]`;

    const knob = base.$(byDataHook(dataHooks.knob));
    const knobIcon = base.$(byDataHook(dataHooks.knobIcon));
    const checkbox = base.$(byDataHook(dataHooks.toggleSwitchInput));
    const track = base.$(byDataHook(dataHooks.track));

    const isDisabled = async () => await checkbox._prop('disabled');
    const getKnobIcon = async() => await knobIcon.getNative();

    return {
        ...baseUniDriverFactory(base),
        click: async () => !(await isDisabled()) && await checkbox.click(),
        isDisabled,
        isChecked: async () => await checkbox._prop('checked'),
        getKnobIcon,
        hasKnobIcon: async () => !!(await getKnobIcon()).innerHTML,
        getId: async () => await checkbox._prop('id'),
        getTabIndex: async () => await checkbox._prop('tabIndex'),
        getRootStyles: async () => await base._prop('style'),
        getTrackStyles: async () => track._prop('style'),
        getKnobStyles: async () =>  knob._prop('style'),
        getKnobIconStyles: async () => knobIcon._prop('style'),
    };
};
