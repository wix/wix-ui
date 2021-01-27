import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { dataHooks } from './constants';

export interface RadioUniDriver extends BaseUniDriver {
  keyDown(key): Promise<void>;
  value(): Promise<string>;
  name(): Promise<string>;
  isInputFocused(): Promise<boolean>;
  isRequired(): Promise<boolean>;
  iconExists(): Promise<boolean>;
  labelExists(): Promise<boolean>;
  isChecked(): Promise<boolean>;
  isFocused(): Promise<boolean>;
  isDisabled(): Promise<boolean>;
  isFocusVisible(): Promise<boolean>;
}

export const radioButtonUniDriverFactory = (
  base: UniDriver
): RadioUniDriver => {
  const byHook = (hook: string) => base.$(`[data-hook="${hook}"]`);

  const getInput = () => byHook(dataHooks.hiddenRadio);
  const getIcon = () => byHook(dataHooks.icon);
  const getLabel = () => byHook(dataHooks.label);

  return {
    ...baseUniDriverFactory(base),

    keyDown: key => getInput().pressKey(key),
    value: async () => getInput().attr('value'),
    name: async () => getInput().attr('name'),
    isInputFocused: async () =>
      document.activeElement === (await getInput().getNative()),
    isRequired: async () => (await base.attr('data-required')) === 'true',
    iconExists: async () => getIcon().exists(),
    labelExists: async () => getLabel().exists(),
    isChecked: async () => (await base.attr('data-checked')) === 'true',
    isDisabled: async () => (await base.attr('data-disabled')) === 'true',
    isFocused: async () => (await base.attr('data-focused')) === 'true',
    isFocusVisible: async () =>
      (await base.attr('data-focus-visible')) === 'true',
  };
};
