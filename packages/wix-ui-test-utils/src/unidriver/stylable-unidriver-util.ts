import { UniDriver } from 'unidriver';
import { RuntimeStylesheet, StateValue } from '@stylable/runtime';

/**
 * This is an implementation of StylableDOMUtil for Unidriver.
 * 
 * Work-In-Progress: Not all methods are implemented yet !
 */
export class StylableUnidriverUtil {
  constructor(private style: RuntimeStylesheet) { }

  public async hasStyleState(base: UniDriver, stateName: string, param: StateValue = true): Promise<boolean> {
    const { stateKey, styleState } = this.getStateDataAttrKey(stateName, param);
    const actual = await base.attr(stateKey);
    return String(styleState[stateKey]) === actual;
  }

  /**
   * Get style state value
   *
   * @returns state or null if not found
   */
  public async getStyleState(base: UniDriver, stateName: string) {
    const { stateKey } = this.getStateDataAttrKey(stateName);
    return base.attr(stateKey);
  }
  
  private getStateDataAttrKey(state: string, param: StateValue = true) {
    const styleState = this.style.$cssStates({ [state]: param });
    return { stateKey: Object.keys(styleState)[0], styleState };
  }
}
