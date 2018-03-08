import {sliderTestkitFactory} from '../../testkit/protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {browser} from 'protractor';
import * as eyes from 'eyes.it';

describe('Slider', () => {
  const storyUrl = getStoryUrl('Components', 'Slider');

  beforeEach(() => browser.get(storyUrl));

  function createDriver() {
    return sliderTestkitFactory({dataHook: 'wixui-slider'});
  }

  it('should change the slider value by clicking the track', async () => {
    const driver = createDriver();
    driver.clickTrack({x: 200});
    expect(await driver.getTooltipValue()).toEqual('15.9');
  });

  it('should move the thumb by dragging it', async () => {
    const driver = createDriver();
    driver.dragThumb({x: 200});
    expect(await driver.getTooltipValue()).toEqual('17.2');
  });

  it('should move the thumb by dragging it', async () => {
    const driver = createDriver();
    driver.dragThumb({x: 200});
    expect(await driver.getTooltipValue()).toEqual('17.2');
  });

  it('should not move the thumb when the mouse moves, given the thumb was dropped', async () => {
    //Given
    const driver = createDriver();
    await driver.dragAndDropThumb({x: 200});
    const valueAfterDrop = await driver.getSliderValue();

    //When
    browser.driver.actions().mouseMove({x: 400, y: 0}).perform();

    //Then
    const valueAfterDropAndMove = await driver.getSliderValue();
    expect(valueAfterDropAndMove).toEqual(valueAfterDrop);
  });
});
