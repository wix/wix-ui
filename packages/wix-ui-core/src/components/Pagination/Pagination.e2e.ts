import {paginationTestkitFactory} from '../../testkit/protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils';
import {browser} from 'protractor';
import * as eyes from 'eyes.it';

describe('Pagination', () => {
  const storyUrl = getStoryUrl('Components', 'Pagination');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('has correct inline layout', async () => {
    const pagination = paginationTestkitFactory({dataHook: 'story-pagination'});

    await waitForVisibilityOf(pagination.element(), 'Cannot find Pagination');

    const prevLoc = await pagination.getElementLocation('previous');
    const nextLoc = await pagination.getElementLocation('next');
    const pageSelectionLoc = await pagination.getElementLocation('page-strip');
    const pageSelectionSize = await pagination.getElementSize('page-strip');

    expect(prevLoc.x).toBeLessThan(pageSelectionLoc.x);
    expect(nextLoc.x).toBeGreaterThan(pageSelectionLoc.x + pageSelectionSize.width);
  });

  eyes.it('supports showFirstPage and showLastPage', () => {
    const pagination = paginationTestkitFactory({dataHook: 'story-pagination-show-first-and-last'});
    waitForVisibilityOf(pagination.element());
    expect(pagination.getPageList()).toEqual(['1', '...', '4', '5', '6', '...', '9']);
  });

  eyes.it('responds to rtl prop', async () => {
    const pagination = paginationTestkitFactory({dataHook: 'story-pagination-rtl'});

    await waitForVisibilityOf(pagination.element(), 'Cannot find Pagination');

    const prevLoc = await pagination.getElementLocation('previous');
    const nextLoc = await pagination.getElementLocation('next');
    const pageSelectionLoc = await pagination.getElementLocation('page-strip');
    const pageSelectionSize = await pagination.getElementSize('page-strip');

    expect(prevLoc.x).toBeGreaterThan(pageSelectionLoc.x + pageSelectionSize.width);
    expect(nextLoc.x).toBeLessThan(pageSelectionLoc.x);
  });

  describe('Responsiveness', () => {
    eyes.it(`shows all pages if there's enough room`, () => {
      const pagination = paginationTestkitFactory({dataHook: 'responsive-full-range'});
      waitForVisibilityOf(pagination.element());
      expect(pagination.getPageList()).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
    });

    eyes.it(`doesn't try to include the first and the last page when not explicitly asked to`, () => {
      const pagination = paginationTestkitFactory({dataHook: 'responsive-no-ellipsis'});
      waitForVisibilityOf(pagination.element());
      expect(pagination.getPageList()).toEqual(['2', '3', '4', '5', '6', '7', '8']);
    });

    eyes.it(`show ellipsis before the last page if the current page is close to the beginning`, () => {
      const pagination = paginationTestkitFactory({dataHook: 'responsive-ellipsis-end'});
      waitForVisibilityOf(pagination.element());
      expect(pagination.getPageList()).toEqual(['1', '2', '3', '4', '5', '...', '9']);
    });

    eyes.it(`show ellipsis after the first page if the current page is close to the end`, () => {
      const pagination = paginationTestkitFactory({dataHook: 'responsive-ellipsis-beginning'});
      waitForVisibilityOf(pagination.element());
      expect(pagination.getPageList()).toEqual(['1', '...', '5', '6', '7', '8', '9']);
    });

    eyes.it(`show ellipsis on each side if the current page is somewhere in the middle`, () => {
      const pagination = paginationTestkitFactory({dataHook: 'responsive-ellipsis-beginning-end'});
      waitForVisibilityOf(pagination.element());
      expect(pagination.getPageList()).toEqual(['1', '...', '4', '5', '6', '...', '9']);
    });

    eyes.it(`gives higher priority to first and last page than to prev and next`, () => {
      const pagination = paginationTestkitFactory({dataHook: 'responsive-no-space-for-ellipsis-and-prev-next'});
      waitForVisibilityOf(pagination.element());
      expect(pagination.getPageList()).toEqual(['1', '...', '5', '...', '9']);
    });

    eyes.it(`doesn't show ellipses if there's too little space for them`, () => {
      const pagination = paginationTestkitFactory({dataHook: 'responsive-no-space-for-ellipsis'});
      waitForVisibilityOf(pagination.element());
      expect(pagination.getPageList()).toEqual(['4', '5', '6']);
    });

    eyes.it(`always shows the current page even if there's not enough space for it`, () => {
      const pagination = paginationTestkitFactory({dataHook: 'responsive-no-space-for-current'});
      waitForVisibilityOf(pagination.element());
      expect(pagination.getPageList()).toEqual(['5']);
    });
  });
});
