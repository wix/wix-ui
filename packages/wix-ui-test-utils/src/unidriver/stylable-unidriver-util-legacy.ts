import {UniDriver} from '@unidriver/core';
import {
  StateValue,
  LegacyStylesheet,
  CompatStylesheet
} from './legacy-stylable-types';
/**
 * LEGACY SUPPORT
 */
export class StylableUnidriverUtilLegacy {
  constructor(private style: LegacyStylesheet) {}
  public async hasStyleState(
    base: UniDriver,
    stateName: string,
    param: StateValue = true
  ): Promise<boolean> {
    const {stateKey, styleState} = this.getStateDataAttrKey(stateName, param);
    const actual = await base.attr(stateKey);
    return String(styleState[stateKey]) === actual;
  }
  /**
   * Get style state value
   *
   * @returns state or null if not found
   */
  public async getStyleState(base: UniDriver, stateName: string) {
    const {stateKey} = this.getStateDataAttrKey(stateName);
    return base.attr(stateKey);
  }
  private getStateDataAttrKey(state: string, param: StateValue = true) {
    const styleState = this.style.$cssStates({[state]: param});
    return {stateKey: Object.keys(styleState)[0], styleState};
  }
}

const stateMiddleDelimiter = '-';

export class StylableUnidriverUtilCompat {
  constructor(private style: CompatStylesheet) {}
  public async hasStyleState(
    base: UniDriver,
    stateName: string,
    param: StateValue = true
  ): Promise<boolean> {
    const stateClass = this.style.$cssStates({[stateName]: param}).className;
    return base.hasClass(stateClass);
  }
  /**
   * Get style state value
   *
   * @returns state or null if not found
   */
  public async getStyleState(base: UniDriver, stateName: string) {
    const className: string = (await base.attr('class')) || '';
    if (!className.includes(stateName)) {
      return null;
    }
    const classList = className.trim().split(/\s+/);

    const booleanState = this.style.$cssStates({[stateName]: true}).className;
    if (classList.includes(booleanState)) {
      return true;
    }

    const baseState = this.getBaseStateWithParam(stateName);

    let paramValue = '';
    classList.forEach(cls => {
      if (!paramValue) {
        paramValue = this.getStateValueFromClassName(cls, baseState);
      }
    });

    return paramValue ? paramValue : null;
  }

  public getStateValueFromClassName(cls: string, baseState: string) {
    if (cls.startsWith(baseState)) {
      const param = cls.slice(baseState.length);
      const paramIndex = param.indexOf(stateMiddleDelimiter);

      if (paramIndex !== -1) {
        return param.slice(paramIndex + 1);
      }
    }
    return '';
  }
  private getBaseStateWithParam(stateName: string) {
    const singleCharState = 'x';
    return this.style
      .$cssStates({[stateName]: singleCharState})
      .className.slice(0, -3);
  }
}
