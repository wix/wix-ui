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

    const prevLoc = await pagination.getElementLocation('PREVIOUS');
    const nextLoc = await pagination.getElementLocation('NEXT');
    const pageSelectionLoc = await pagination.getElementLocation('PAGES_SELECTION');
    const pageSelectionSize = await pagination.getElementSize('PAGES_SELECTION');

    expect(prevLoc.x).toBeLessThan(pageSelectionLoc.x);
    expect(nextLoc.x).toBeGreaterThan(pageSelectionLoc.x + pageSelectionSize.width);
  });

  eyes.it('responds to rtl prop', async () => {
    const pagination = paginationTestkitFactory({dataHook: 'story-pagination-rtl'});

    await waitForVisibilityOf(pagination.element(), 'Cannot find Pagination');

    const prevLoc = await pagination.getElementLocation('PREVIOUS');
    const nextLoc = await pagination.getElementLocation('NEXT');
    const pageSelectionLoc = await pagination.getElementLocation('PAGES_SELECTION');
    const pageSelectionSize = await pagination.getElementSize('PAGES_SELECTION');

    expect(prevLoc.x).toBeGreaterThan(pageSelectionLoc.x + pageSelectionSize.width);
    expect(nextLoc.x).toBeLessThan(pageSelectionLoc.x);
  });
});
