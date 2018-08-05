import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {timePickerTestkitFactory} from '../../testkit/protractor';

describe('TimePicker', () => {
  const storyUrl = getStoryUrl('Components', 'TimePicker');
  const dataHook = 'storybook-timepicker';

  beforeEach(async () => await browser.get(storyUrl));

  eyes.it('should exist', async () => {
    const driver = timePickerTestkitFactory({dataHook});
    await waitForVisibilityOf(await driver.element(), 'Cannot find TimePicker');
  });

  describe('tickers', () => {
    afterEach(async () => await new Promise(rs => setTimeout(rs, 3000)))

    describe('ticker up', () => {
      eyes.it('should increment minutes [before being focused]', async () => {
        const driver = timePickerTestkitFactory({dataHook});
        await waitForVisibilityOf(await driver.element(), 'Cannot find TimePicker');
        await driver.clickTickerUp();
        const result = await driver.getValue()
        expect(result).toEqual('--:01');
      });

      eyes.it('should increment minutes [after focusing on minutes]', async () => {
        const driver = timePickerTestkitFactory({dataHook});
        await waitForVisibilityOf(await driver.element(), 'Cannot find TimePicker');
        await driver.focus();
        await driver.pressKeyArrowRight();
        await driver.clickTickerUp();
        const result = await driver.getValue()
        expect(result).toEqual('--:01');
      });

      eyes.it('should increment hours [after focusing on hours]', async () => {
        const driver = timePickerTestkitFactory({dataHook});
        await waitForVisibilityOf(await driver.element(), 'Cannot find TimePicker');
        await driver.focus();
        await driver.pressKeyArrowLeft();
        await driver.clickTickerUp();
        const result = await driver.getValue()
        expect(result).toEqual('01:--');
      });

      eyes.it('should increment minutes [after focusing on minutes and then blurring]', async () => {
        const driver = timePickerTestkitFactory({dataHook});
        await waitForVisibilityOf(await driver.element(), 'Cannot find TimePicker');
        await driver.focus();
        await driver.pressKeyArrowRight();
        await driver.blur();
        await driver.clickTickerUp();
        const result = await driver.getValue()
        expect(result).toEqual('--:01');
      });

      eyes.it('should increment hours [after focusing on hours and then blurring]', async () => {
        const driver = timePickerTestkitFactory({dataHook});
        await waitForVisibilityOf(await driver.element(), 'Cannot find TimePicker');
        await driver.focus();
        await driver.pressKeyArrowLeft();
        await driver.blur();
        await driver.clickTickerUp();
        const result = await driver.getValue()
        expect(result).toEqual('01:--');
      });
    });

    describe('ticker down', () => {
      eyes.it('should decrement minutes [before being focused]', async () => {
        const driver = timePickerTestkitFactory({ dataHook });
        await waitForVisibilityOf(await driver.element(), 'Cannot find TimePicker');
        await driver.clickTickerDown();
        const result = await driver.getValue()
        expect(result).toEqual('--:59');
      });

      eyes.it('should decrement minutes [after focusing on minutes]', async () => {
        const driver = timePickerTestkitFactory({ dataHook });
        await waitForVisibilityOf(await driver.element(), 'Cannot find TimePicker');
        await driver.focus();
        await driver.pressKeyArrowRight();
        await driver.clickTickerDown();
        const result = await driver.getValue()
        expect(result).toEqual('--:59');
      });

      eyes.it('should decrement hours [after focusing on hours]', async () => {
        const driver = timePickerTestkitFactory({ dataHook });
        await waitForVisibilityOf(await driver.element(), 'Cannot find TimePicker');
        await driver.focus();
        await driver.pressKeyArrowLeft();
        await driver.clickTickerDown();
        const result = await driver.getValue()
        expect(result).toEqual('23:--');
      });

      eyes.it('should decrement minutes [after focusing on minutes and then blurring]', async () => {
        const driver = timePickerTestkitFactory({ dataHook });
        await waitForVisibilityOf(await driver.element(), 'Cannot find TimePicker');
        await driver.focus();
        await driver.pressKeyArrowRight();
        await driver.blur();
        await driver.clickTickerDown();
        const result = await driver.getValue()
        expect(result).toEqual('--:59');
      });

      eyes.it('should decrement hours [after focusing on hours and then blurring]', async () => {
        const driver = timePickerTestkitFactory({ dataHook });
        await waitForVisibilityOf(await driver.element(), 'Cannot find TimePicker');
        await driver.focus();
        await driver.pressKeyArrowLeft();
        await driver.blur();
        await driver.clickTickerDown();
        const result = await driver.getValue()
        expect(result).toEqual('23:--');
      });
    });
  });
});
