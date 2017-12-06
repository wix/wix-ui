import ReactTestUtils from 'react-dom/test-utils';

const paginationDriverFactory = ({element}) => {
  const pages = element.querySelectorAll('[data-hook^="PAGE_"]');
  const selectedPage = parseInt(element.getAttribute('data-selected'), 10);
  
  const getButton = (btnName) => element.querySelector('[data-hook="' + btnName.toUpperCase() + '"]');
  const getInput = () => element.querySelector('[data-hook="PAGE_INPUT"]');
  return {
    exists: () => !!element,
    getPages: (idx) => (typeof idx !== 'undefined') ? pages[idx] : pages,
    getCurrentPage: () => pages[selectedPage - 1],
    getButton: getButton,
    clickOnPage: (idx) => ReactTestUtils.Simulate.click(pages[idx]),
    clickOnButton: (btnName) => ReactTestUtils.Simulate.click(getButton(btnName)),
    getPageInput: getInput,
    getLastPageField: () => element.querySelector('[data-hook="PAGES_TOTAL"]'),
    changeInput: (newValue) => ReactTestUtils.Simulate.change(getInput(), {target : {value : newValue}}),
    inputKeyCode: (keyCode) => ReactTestUtils.Simulate.keyDown(getInput(), {keyCode}),
    inputBlur: () => ReactTestUtils.Simulate.blur(getInput())
  };
};

export default paginationDriverFactory;
