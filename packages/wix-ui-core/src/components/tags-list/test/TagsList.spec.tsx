import * as React from 'react';

import { TagsList, Tag } from '..';
import { makeTagsListUniDriver } from '../TagsList.uni.driver';
import { makeTagUniDriver } from '../Tag.uni.driver';

import { ReactDOMTestContainer } from '../../../../test/dom-test-container';

describe('TagsList', () => {
  const reactDOMTestContainer = new ReactDOMTestContainer();

  describe('List', () => {
    const createDriver = reactDOMTestContainer
      .unmountAfterEachTest()
      .createUniRendererAsync(makeTagsListUniDriver);

    it('should render the passed children', async () => {
      const driver = await createDriver(
        <TagsList>
          <Tag label="name" value="value">
            Some tag
          </Tag>
          <Tag label="name" value="value">
            Some tag
          </Tag>
          <Tag label="name" value="value">
            Some tag
          </Tag>
          <Tag label="name" value="value">
            Some tag
          </Tag>
        </TagsList>,
      );

      const tagsCount = await driver.getTagCount();

      expect(tagsCount).toBe(4);
    });

    it('should handle onChange event', async () => {
      const onChangeSpy = jest.fn();

      const driver = await createDriver(
        <TagsList onChange={onChangeSpy}>
          <Tag label="name" value="value">
            Some tag
          </Tag>
        </TagsList>,
      );

      await driver.clickOnTagByIndex();
      expect(onChangeSpy).toHaveBeenCalled();
    });

    it('should use default noop onChange callback', async () => {
      const runTest = async () => {
        const driver = await createDriver(
          <TagsList>
            <Tag label="name" value="value">
              Some tag
            </Tag>
          </TagsList>,
        );

        await driver.clickOnTagByIndex();
      };

      await expect(runTest()).resolves.not.toThrow();
    });

    describe('single selection', () => {
        let driver, onChangeSpy;

        beforeEach(async () => {
            onChangeSpy = jest.fn();
            driver = await createDriver(
                <TagsList onChange={onChangeSpy} singleSelection>
                    {
                        [0, 1, 2].map(idx => (
                            <Tag key={`tag-${idx}`} label={`label-${idx}`} value={`value-${idx}`}>Tag {idx}</Tag>
                        ))
                    }
                </TagsList>
            );
        });

        it('should render radio buttons instead of checkboxes', async () => {
            await driver.clickOnTagByIndex(0);
            expect(onChangeSpy.mock.calls[0][0].target.tagName.toLowerCase()).toBe('input');
            expect(onChangeSpy.mock.calls[0][0].target.getAttribute('type')).toBe('radio');
        });
    });

    describe('Keyboard interaction', () => {
        let driver, onChangeSpy;

        async function setupDriver(singleSelection = false) {
            driver = await createDriver(
                <TagsList onChange={onChangeSpy} singleSelection={singleSelection}>
                    {
                        [0, 1, 2].map(idx => (
                            <Tag key={`tag-${idx}`} label={`label-${idx}`} value={`value-${idx}`}>Tag {idx}</Tag>
                        ))
                    }
                </TagsList>
            );
        }

        beforeEach(() => {
            onChangeSpy = jest.fn();
        });

        afterEach(() => {
            onChangeSpy.mockReset();
        });

        describe('multiple selection', () => {
            it('should iterate over tags using "tab" button', async () => {
                await setupDriver();
                const tagDriver = await driver.focusTag(0);
                await driver.focusNextTag();
                expect(onChangeSpy).not.toHaveBeenCalled();
                await tagDriver.simulatePressSpace();
                expect(onChangeSpy).toHaveBeenCalled();
            });
        });

        describe('single selection', () => {
            it('should iterate over tags using arrow keys', async () => {
                await setupDriver(true);
                await driver.focusTag(0);
                await driver.focusNextTag();
                expect(onChangeSpy).toHaveBeenCalled();
            });
        });
    });
  });

  describe('Tag', () => {
    const createDriver = reactDOMTestContainer
      .unmountAfterEachTest()
      .createUniRendererAsync(makeTagUniDriver);

    it('should render children', async () => {
      const tagText = 'Some tag';

      const driver = await createDriver(
        <Tag label="name" value="value">
          {tagText}
        </Tag>,
      );

      const text = await driver.getText();

      expect(text).toBe(tagText);
    });
  });
});
