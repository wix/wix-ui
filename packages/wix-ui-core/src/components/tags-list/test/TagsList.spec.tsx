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
        </TagsList>
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
        </TagsList>
      );

      await driver.clickOnTagByIndex();

      expect(onChangeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          target: { value: 'value', checked: true },
        })
      );
    });

    it('should use default noop onChange callback', async () => {
      const runTest = async () => {
        const driver = await createDriver(
          <TagsList>
            <Tag label="name" value="value">
              Some tag
            </Tag>
          </TagsList>
        );

        await driver.clickOnTagByIndex();
      };

      await expect(runTest()).resolves.not.toThrow();
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
        </Tag>
      );

      const text = await driver.getText();

      expect(text).toBe(tagText);
    });
  });
});
