import { Simulate } from 'react-dom/test-utils';
import { UniDriver } from 'wix-ui-test-utils/unidriver';

/**
 *Temporary workaround for implementing missing Unidriver methods in React/DOM only.
 *
 * @param {UniDriver} base
 */
export function ReactBase(base: UniDriver) {
  if (base.type !== 'react') {
    throw new Error('Supported only in React/DOM.');
  }

  const getNative = (): Promise<HTMLElement> => base.getNative();

  return {
    pressKey: async (key: string) =>
      Simulate.keyDown(await getNative(), { key }),
    mouseLeave: async () => Simulate.mouseLeave(await getNative()),
    hasAttribute: async (name: string) =>
      (await getNative()).hasAttribute(name),
    getAttribute: async (name: string) =>
      (await getNative()).getAttribute(name),
    focus: async () => (await getNative()).focus(),
  };
}
