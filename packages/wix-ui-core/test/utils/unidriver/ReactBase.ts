import { Simulate } from 'react-dom/test-utils';
import { UniDriver } from 'unidriver';

/**
 *Temporary workaround for implementing missing Unidriver methods in React/DOM only.
 *
 * @param {UniDriver} base
 */
export function ReactBase(base: UniDriver, body: UniDriver) {
  if (base.type !== 'react') {
    throw new Error('Supported only in React/DOM.')
  } 
  return {
    pressKey: async (key: string) => Simulate.keyDown(await base.getNative(), {key}),
    mouseLeave: async () => Simulate.mouseLeave(await base.getNative()),
  }
}