import { Simulate } from 'react-dom/test-utils';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import {byDataHook} from './Utils';
import {DataHook} from '../../../src/components/file-picker-button/FilePickerButton.helpers';

/**
 *Temporary workaround for implementing missing Unidriver methods in React/DOM only.
 *
 * @param {UniDriver} base
 */
export function ReactBase(base: UniDriver, body?: UniDriver) {
  if (base.type !== 'react') {
    throw new Error('Supported only in React/DOM.')
  }

  const getNative = (): Promise<HTMLElement> => base.getNative()

  return {
    pressKey: async (key: string) => Simulate.keyDown(await getNative(), {key}),
    mouseLeave: async () => Simulate.mouseLeave(await getNative()),
    hasAttribute: async (name: string) => (await getNative()).hasAttribute(name),
    focus: async () => (await getNative()).focus(),
  }
}
