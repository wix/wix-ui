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

  const getNative = (): Promise<HTMLElement> => {
    if (base.type !== 'react') {
      throw new Error('Supported only in React/DOM.');
    }
    return base.getNative()
  };

  return {
    mouseLeave: async () => Simulate.mouseLeave(await getNative()),
    hasAttribute: async (name: string) =>
      (await getNative()).hasAttribute(name),
    getAttribute: async (name: string) =>
      (await getNative()).getAttribute(name),
    focus: async () => (await getNative()).focus(),
    getStyle: async () =>
      (await getNative()).style,
  };
}
