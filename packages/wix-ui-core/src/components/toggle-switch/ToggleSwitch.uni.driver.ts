import {
    BaseUniDriver,
    baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { UniDriver, StylableUnidriverUtil } from 'wix-ui-test-utils/unidriver';
import styles from './ToggleSwitch.st.css';


export interface ToggleSwitchUniDriver extends BaseUniDriver {
    /** Get the width of the foreground bar (the progress) */
    getWidth(): Promise<string>;
}

export const toggleSwitchUniDriverFactory = (
    base: UniDriver,
): ToggleSwitchUniDriver => {
    const byDataHook = dataHook => `[data-hook="${dataHook}"]`;
    const stylableUnidriverUtil = new StylableUnidriverUtil(styles);


    return {
        ...baseUniDriverFactory(base),
        /** Checks if element exists */
        exists: () => null,
        /** Triggers change */
        click: () => null,
        /** Returns a boolean indicating if the toggleSwitch is checked */
        isChecked: () => null,
        /** Returns a boolean indicating if the toggleSwitch is disabled */
        isDisabled: () => null,
        /** Returns the toggle icon inside the knob */
        getKnobIcon: () => null,
        /** Returns whether the toggle has an icon */
        hasKnobIcon: () => null,
        /** Returns the id of the input */
        getId: () => null,
        /** Returns the tab index */
        getTabIndex: () => null,
        /** Returns the computed styles object of the root component */
        getRootStyles: () => null,
        /** Returns the computed styles object of the track */
        getTrackStyles: () => null,
        /** Returns the computed styles object of the knob */
        getKnobStyles: () => null,
        /** Returns the computed styles object of the knob icon */
        getKnobIconStyles: () => null,
    }
};