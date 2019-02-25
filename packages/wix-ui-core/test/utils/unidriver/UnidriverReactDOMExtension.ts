import { Simulate } from 'react-dom/test-utils';
import { UniDriver } from 'unidriver';

/**
 *Temporary workaround for implementing missing Unidriver methods in React/DOM only.
 *
 * @export
 * @param {UniDriver} base
 */
export function UnidriverReactDOMExtension(base: UniDriver) {
  if (base.type !== 'react') {
    throw new Error('Supported only in React/DOM.')
  } 
  return {
    pressKey: async key => Simulate.keyDown(await base.getNative(), {key}),
  }
}