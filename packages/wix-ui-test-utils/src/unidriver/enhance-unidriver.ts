/**  
 * Enhance UniDriver with data-hook query methods.
*/
import {MapFn, PredicateFn, UniDriver, UniDriverList} from 'unidriver';

export interface EnhancedUniDriverList<T=any> {
  get: (idx: number) => EnhancedUniDriver<T>;
  text: () => Promise<string[]>;
  count: () => Promise<number>;
  map: <T>(mapFn: MapFn<T>) => Promise<T[]>;
  filter: (predicate: PredicateFn) => EnhancedUniDriverList;
}

export interface EnhancedUniDriver<T=any> extends UniDriver<T> {
  queryHook: (dataHook:string)=> EnhancedUniDriver<T>;
  queryHookAll: (dataHook:string)=> EnhancedUniDriverList<T>;
}


export function enhance(driver:UniDriver) : EnhancedUniDriver {
  return {
    ...driver,
    queryHook: dataHook=> enhance(driver.$(`[data-hook=${dataHook}]`)),
    queryHookAll: dataHook=> enhanceList(driver.$$(`[data-hook=${dataHook}]`))
  }
}

function enhanceList<T>(driver:UniDriverList<T>): EnhancedUniDriverList<T> {
  return {
    get: (idx: number) => enhance(driver.get(idx)),
    text: driver.text,
    count: driver.count,
    map: driver.map,
    filter: (predicate: PredicateFn) => enhanceList(driver.filter(predicate)),
  }
}
