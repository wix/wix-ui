import * as ReactTestUtils from 'react-dom/test-utils';

export const buttonDriverFactory = ({element}) => ({
  exists: () => !!element,
  click: () => ReactTestUtils.Simulate.click(element),
  mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(element),
  mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(element),
  getType: () => element.getAttribute('type'),
  getTextContent: () => element.textContent,
  isDisabled: () => element.getAttribute('disabled') === ''
});
