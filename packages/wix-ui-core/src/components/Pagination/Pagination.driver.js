import ReactTestUtils from 'react-dom/test-utils';

const paginationDriverFactory = ({element}) => {
  const pages = element.querySelectorAll('[data-hook^="PAGE_"]');
  const selectedPage = parseInt(element.getAttribute('data-selected'), 10);
  
  const getButton = (btnName) => element.querySelector('[data-hook="' + btnName.toUpperCase() + '"]');
  
  return {
    exists: () => !!element,
    getPages: (idx) => (typeof idx !== 'undefined') ? pages[idx] : pages,
    getCurrentPage: () => pages[selectedPage - 1],
    getButton: getButton,
    clickOnPage: (idx) => ReactTestUtils.Simulate.click(pages[idx]),
    clickOnButton: (btnName) => ReactTestUtils.Simulate.click(getButton(btnName)),
    getPageInput: () => element.querySelector('[data-hook="PAGE_INPUT"]'),
    getLastPageField: () => element.querySelector('[data-hook="PAGES_TOTAL"]')
    // hasPage: (idx) => !!element.querySelector('[data-hook="PAGE_' + idx + '"]' )
    // click: () => ReactTestUtils.Simulate.change(pagination),
    // isChecked: () => pagination.checked,
    // isDisabled: () => pagination.disabled
  };
};

export default paginationDriverFactory;
