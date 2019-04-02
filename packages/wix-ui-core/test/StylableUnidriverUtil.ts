import { UniDriver } from '@unidriver/core';
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
  
  private getStateDataAttrKey(state: string, param: StateValue = true) {
    const styleState = this.style.$cssStates({ [state]: param });
    return { stateKey: Object.keys(styleState)[0], styleState };
  }
}
