import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { PaginationDataHooks as dataHooks } from './DataHooks';
import { byDataHook } from '../../../test/utils/unidriver';

export interface PaginationDriver extends BaseUniDriver {
  isVisible(): Promise<boolean>;
  getCurrentPage(): Promise<number>;
  getTotalPages(): Promise<number>;
  clickOnPage(page: number): Promise<void>;
  clickNextButton(): Promise<void>;
  clickPreviousButton(): Promise<void>;
}

export const paginationDriverFactory = (base: UniDriver): PaginationDriver => {
  return {
    ...baseUniDriverFactory(base),

    /** Check if element is rendered */
    isVisible: async () => base.$(byDataHook(dataHooks.pageStrip)).exists(),

    /** Returns currently selected page */
    getCurrentPage: async () =>
      parseInt(
        await base.$(`[data-hook~=${dataHooks.currentPage}]`).text(),
        10,
      ),

    /** Returns a total amount of pages available */
    getTotalPages: async () =>
      parseInt(await base.$(byDataHook(dataHooks.totalPages)).text(), 10),

    /** Clicks on gives page number */
    clickOnPage: async (n: number) => base.$(byDataHook(`page-${n}`)).click(),

    /** Clicks on next button */
    clickNextButton: async () => base.$(byDataHook(dataHooks.next)).click(),

    /** Clicks on previous button */
    clickPreviousButton: async () =>
      base.$(byDataHook(dataHooks.previous)).click(),
  };
};
