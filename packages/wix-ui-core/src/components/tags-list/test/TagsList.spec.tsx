import * as React from 'react';

import { TagsList, Tag } from '../TagsList';
import { tagsListUniDriver } from './TagsList.uni.driver';

import { ReactDOMTestContainer } from '../../../../test/dom-test-container';

describe('TagsList', () => {
  const reactDOMTestContainer = new ReactDOMTestContainer();
  const createDriver = reactDOMTestContainer
    .unmountAfterEachTest()
    .createUniRendererAsync(tagsListUniDriver);

  describe('List', () => {
    describe(`'children' prop`, () => {
      it('should render the passed children', async () => {
        const driver = await createDriver(
          <TagsList>
            <Tag value="value">Some tag</Tag>
            <Tag value="value">Some tag</Tag>
            <Tag value="value">Some tag</Tag>
            <Tag value="value">Some tag</Tag>
          </TagsList>
        );

        const tags = await driver.getContent();
        expect(tags.length).toBe(4);
      });
    });

    describe('Tag', () => {
      it('should handle onChange event', async () => {
        let isChecked;

        const onChangeSpy = jest.fn();

        const driver = await createDriver(
          <TagsList>
            <Tag value="value" onChange={onChangeSpy}>
              Some tag
            </Tag>
          </TagsList>
        );

        isChecked = await driver.getIsChecked();

        expect(isChecked).toBe(false);

        await driver.clickOnTagInput();

        expect(onChangeSpy).toHaveBeenCalled();

        isChecked = await driver.getIsChecked();

        expect(isChecked).toBe(true);
      });
    });
  });
});
