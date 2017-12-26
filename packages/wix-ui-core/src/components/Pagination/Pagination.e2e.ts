import {paginationTestkitFactory} from '../../testkit/protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils';
import {browser, $} from 'protractor';
import * as eyes from 'eyes.it';

const dataHook = 'story-pagination';

describe('Pagination', () => {
  const storyUrl = getStoryUrl('Components', 'Pagination');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('has correct inline layout', async () => {
    const pagination = paginationTestkitFactory({dataHook});

    await waitForVisibilityOf(pagination.element(), 'Cannot find Pagination');

    const prevLoc = await pagination.getNavButtonLocation('previous');
    const nextLoc = await pagination.getNavButtonLocation('next');
    const pageSelectionLoc = await $('[data-hook="PAGES_SELECTION"]').getLocation();
    const pageSelectionSize = await $('[data-hook="PAGES_SELECTION"]').getSize();

    expect(prevLoc.x).toBeLessThan(pageSelectionLoc.x);
    expect(nextLoc.x).toBeGreaterThan(pageSelectionLoc.x + pageSelectionSize.width);
  });
});
