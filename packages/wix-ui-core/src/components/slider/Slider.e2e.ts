import { sliderTestkitFactory } from '../../testkit/protractor';
import { createStoryUrl } from 'wix-ui-test-utils/protractor';
import { browser } from 'protractor';

describe('Slider', () => {
  let driver;

  const storyUrl = createStoryUrl({ kind: 'Components', story: 'Slider' });

  beforeEach(() => browser.get(storyUrl));

  function createDriver() {
    driver = sliderTestkitFactory({ dataHook: 'storybook-slider' });
  }

  xit('should change the slider value by clicking the track', async () => {
    createDriver();
    driver.clickTrack({ x: 200 });
    await assertTooltipValueApproximately(4);
  });

  xit('should move the thumb by dragging it', async () => {
    createDriver();
    driver.dragThumb({ x: 200 });
    await assertTooltipValueApproximately(6);
  });

  xit('should move the thumb by dragging it', async () => {
    createDriver();
    driver.dragThumb({ x: 200 });
    await assertTooltipValueApproximately(6);
  });

  it('should not move the thumb when the mouse moves, given the thumb was dropped', async () => {
    //Given
    createDriver();
    await driver.dragAndDropThumb({ x: 200 });
    const valueAfterDrop = await driver.getSliderValue();

    //When
    await browser.driver
      .actions()
      .mouseMove({ x: 400, y: 0 })
      .perform();

    //Then
    const valueAfterDropAndMove = await driver.getSliderValue();
    expect(valueAfterDropAndMove).toEqual(valueAfterDrop);
  });

  async function assertTooltipValueApproximately(approxValue: number) {
    const value = parseInt(await driver.getTooltipValue(), 10);
    expect(value).toBeGreaterThanOrEqual(approxValue - 1);
    expect(value).toBeLessThanOrEqual(approxValue + 1);
  }
});
