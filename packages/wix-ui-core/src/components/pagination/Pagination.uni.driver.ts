import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { PaginationDataHooks as dataHooks } from './DataHooks';
import { byDataHook } from '../../../test/utils/unidriver';

export interface PaginationDriver extends BaseUniDriver {
  /** Check if element is rendered */
  exists(): Promise<boolean>;
  /** Returns currently selected page */
  getCurrentPage(): Promise<number>;
  /** Returns a total amount of pages available */
  getTotalPages(): Promise<number>;
  /** Clicks on gives page number */
  clickOnPage(page: number): Promise<void>;
  /** Clicks on next button */
  clickNextButton(): Promise<void>;
  /** Clicks on previous button */
  clickPreviousButton(): Promise<void>;
}

export const paginationDriverFactory = (base: UniDriver): PaginationDriver => {
  return {
    ...baseUniDriverFactory(base),
    exists: async () => base.$(byDataHook(dataHooks.pageStrip)).exists(),
    getCurrentPage: async () =>
      parseInt(
        await base.$(`[data-hook~=${dataHooks.currentPage}]`).text(),
        10,
      ),
    getTotalPages: async () =>
      parseInt(await base.$(byDataHook(dataHooks.totalPages)).text(), 10),
    clickOnPage: async (n: number) => base.$(byDataHook(`page-${n}`)).click(),
    clickNextButton: async () => base.$(byDataHook(dataHooks.next)).click(),
    clickPreviousButton: async () =>
      base.$(byDataHook(dataHooks.previous)).click(),
  };
};
