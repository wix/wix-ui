import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import {UniDriver} from 'wix-ui-test-utils/unidriver';
import {byDataHook} from '../../../test/utils/unidriver';
import {DataHooks, DataKeys} from './DataHooks';

export interface SignatureInputUniDriver extends BaseUniDriver {
  /** Returns data-hook prop */
  getDataHook: () => Promise<string | null>;
  /** Returns true in case component's label is rendered */
  hasLabel: () => Promise<boolean>;
  /** Returns field's label */
  getLabel: () => Promise<string | null>;
  /** Returns true in case component's canvas in rendered */
  isCanvasRendered: () => Promise<boolean>;
  /** Returns true in case signature field doesn't contain data */
  isSignatureEmpty: () => Promise<boolean>;
  clickOnCanvas: () => Promise<void>;
}

export const signatureInputUniDriverFactory = (
  base: UniDriver
): SignatureInputUniDriver => {
  return {
    ...baseUniDriverFactory(base),
    getDataHook: () => base.attr('data-hook'),
    getLabel: () => base.$(byDataHook(DataHooks.Label)).text(),
    hasLabel: () => base.$(byDataHook(DataHooks.Label)).exists(),
    isCanvasRendered: () => base.$(byDataHook(DataHooks.Canvas)).exists(),
    isSignatureEmpty: async () => {
      return !JSON.parse(await base.attr(DataKeys.HasData));
    },
    clickOnCanvas: async () => base.$(byDataHook(DataHooks.Canvas)).click(),
  };
};
