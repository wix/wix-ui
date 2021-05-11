import * as React from 'react';
import { render } from 'react-testing-library';
import { Simulate } from 'react-dom/test-utils';
import { reactUniDriver } from 'wix-ui-test-utils/vanilla';

const getElement = ({ rendered, dataHook }) => {
  return dataHook
    ? rendered.container.querySelector(`[data-hook="${dataHook}"]`)
    : rendered.container.firstChild;
};

interface rendererTypes {
  jsx: React.ReactNode;
  dataHook?: string;
}
/**
 * Creates a `render` function that returns the same object as `react-testing-library`'s render, but
 * with and extra `driver` property.
 *
 * The returned render function arguments:
 * @param [React.Element] jsx a jsx element to render
 * @param [string] dataHook if provided then the driver would be created with the element which is found by the dataHook. If not provided then it assumes that the rendered root element is the component's root element and it will be used for the driver.
 */
export const createRendererWithDriver =
  (driverFactory) => (jsx: React.ReactElement, dataHook?: string) => {
    const rendered = render(jsx);

    const element = getElement({ rendered, dataHook });
    const driver = driverFactory({
      element,
      wrapper: rendered.container,
      eventTrigger: Simulate,
    });
    return {
      ...rendered,
      driver,
    };
  };

/**
 * Creates a `render` function that returns the same object as `react-testing-library`'s render, but
 * with and extra `driver` property which is a Unidriver.
 *
 * The returned render function arguments:
 * @param [React.Element] jsx a jsx element to render
 * @param [string] dataHook if provided then the driver would be created with the element which is found by the dataHook. If not provided then it assumes that the rendered root element is the component's root element and it will be used for the driver.
 */
export const createRendererWithUniDriver =
  (driverFactory) => (jsx: React.ReactElement, dataHook?: string) => {
    const rendered = render(jsx);

    const element = getElement({ rendered, dataHook });
    const driver = driverFactory(
      reactUniDriver(element),
      reactUniDriver(document.body),
    );
    return {
      ...rendered,
      driver,
    };
  };

export * from 'react-testing-library';
