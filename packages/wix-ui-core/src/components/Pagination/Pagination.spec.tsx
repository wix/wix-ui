import * as React from 'react';
import {paginationDriverFactory} from './Pagination.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import Pagination from './index';
import {sleep} from 'wix-ui-test-utils';
import {paginationTestkitFactory} from '../../testkit';
import {paginationTestkitFactory as enzymePaginationTestkitFactory} from '../../testkit/enzyme';

describe('Pagination', () => {
  const createDriver = createDriverFactory(paginationDriverFactory);

  describe('General accessibility', () => {
    it('has NAV as root node', () => {
      const pagination = createDriver(<Pagination totalPages={5}/>);
      expect(pagination.root.tagName).toEqual('NAV');
    });

    it('has role in the root node', () => {
      const pagination = createDriver(<Pagination totalPages={5}/>);
      expect(pagination.root.getAttribute('role')).toEqual('navigation');
    });

    it('has aria-label in the root node', () => {
      const pagination = createDriver(<Pagination totalPages={5}/>);
      expect(pagination.root.getAttribute('aria-label')).toEqual('Pagination Navigation');
    });

    it('has correct DOM elements order for screen reader', () => {
      // this test is used to lock down the order of "elements of interest" for screen reader flow. This also determines native tab focus
      // note - the actual visual order of the elements could be different (using css ordering)
      const pagination = createDriver(<Pagination totalPages={5} showFirstLastNavButtons/>);
      const nextBtn = pagination.getNavButton('next');
      const prevBtn = pagination.getNavButton('previous');
      const firstBtn = pagination.getNavButton('first');
      const lastBtn = pagination.getNavButton('last');
      const pageSelection = pagination.getPage(0).parentElement;

      expect(nextBtn.compareDocumentPosition(prevBtn)).toEqual(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(prevBtn.compareDocumentPosition(pageSelection)).toEqual(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(pageSelection.compareDocumentPosition(firstBtn)).toEqual(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(firstBtn.compareDocumentPosition(lastBtn)).toEqual(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });

  describe('Page numbers mode', () => {
    it('displays all pages for a small number of pages', () => {
      const pagination = createDriver(<Pagination totalPages={3}/>);
      expect(pagination.amountOfPages).toBe(3);
      expect(pagination.getPagesList()).toEqual(['1', '2', '3']);
    });

    it('marks page 1 as selected by default', () => {
      const pagination = createDriver(<Pagination totalPages={3}/>);
      expect(pagination.getCurrentPage().textContent).toBe('1');
    });

    it('marks currentPage prop as selected', () => {
      const pagination = createDriver(<Pagination totalPages={3} currentPage={2}/>);
      expect(pagination.getCurrentPage().textContent).toBe('2');
    });

    it('if currentPage is higher than the number of pages - current page is the last one', () => {
      const pagination = createDriver(<Pagination totalPages={34} currentPage={56}/>);
      expect(pagination.getCurrentPage().textContent).toBe('34');
    });

    it('if currentPage is lower than 1 - current page is set to 1', () => {
      const pagination = createDriver(<Pagination totalPages={34} currentPage={0}/>);
      expect(pagination.getCurrentPage().textContent).toBe('1');
    });

    it('pages send onChange with page number', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={10} onChange={onChange}/>);

      pagination.click(pagination.getPage(2));
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toEqual({page: '3'});

      onChange.mockClear();

      pagination.click(pagination.getPage(8));
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toEqual({page: '9'});
    });

    it('does not call onChange on clicking the current page', async () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={15} currentPage={8} onChange={onChange}/>);

      pagination.click(pagination.getCurrentPage());

      await sleep(10);
      expect(onChange.mock.calls.length).toBe(0);
    });

    describe('Page numbers mode accessibility', () => {
      it('has aria-label attribute on pages', () => {
        const pagination = createDriver(<Pagination totalPages={8} currentPage={4}/>);
        Array.from(Array(pagination.amountOfPages)).forEach((n, idx) => {
          const page = pagination.getPage(idx);
          expect(page.getAttribute('aria-label')).toEqual('Page ' + page.textContent);
        });
      });
    });
  });

  describe('Input field mode', () => {
    it('displays input field showing current page (does not show the total amount of pages by default)', () => {
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15} currentPage={4}/>);
      expect(pagination.getPageInput()).toBeTruthy();
      expect(pagination.getPageInput().value).toEqual('4');
      expect(pagination.getTotalPagesField()).not.toBeTruthy();
    });

    it('shows the total amount of pages if showInputModeTotalPages is true', () => {
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15} currentPage={4} showInputModeTotalPages/>);
      expect(pagination.getTotalPagesField()).toBeTruthy();
      expect(pagination.getTotalPagesField().textContent).toEqual('/ 15');
    });

    it('accepts numbers in page input', () => {
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15}/>);
      pagination.changeInput('6');
      expect(pagination.getPageInput().value).toEqual('6');
    });

    it('does not accept non natural numbers in page input', () => {
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15}/>);
      expect(pagination.getPageInput().value).toEqual('1');
      pagination.changeInput('ko');
      expect(pagination.getPageInput().value).toEqual('1');
      pagination.changeInput('3.4');
      expect(pagination.getPageInput().value).toEqual('1');
      pagination.changeInput('-2');
      expect(pagination.getPageInput().value).toEqual('1');
    });

    it('calls onChange with new numeric value after pressing ENTER', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15} onChange={onChange}/>);
      pagination.changeInput('5');
      pagination.inputKeyDown(13);
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toEqual({page: '5'});
    });

    it('does not call onChange with empty value after pressing ENTER', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15} currentPage={8} onChange={onChange}/>);
      pagination.changeInput('');
      pagination.inputKeyDown(13);

      return sleep(10).then(() => {
        expect(onChange.mock.calls.length).toBe(0);
      });
    });

    it('does not call onChange if the input value is the same as the current page', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15} currentPage={8} onChange={onChange}/>);
      pagination.changeInput('8');
      pagination.inputKeyDown(13);

      return sleep(10).then(() => {
        expect(onChange.mock.calls.length).toBe(0);
      });
    });

    it('calls onChange with the last page if input value is higher than the last page', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15} currentPage={8} onChange={onChange}/>);
      pagination.changeInput('34');
      pagination.inputKeyDown(13);

      return sleep(10).then(() => {
          expect(onChange.mock.calls.length).toBe(1);
          expect(onChange.mock.calls[0][0]).toEqual({page: '15'});
      });
    });

    it('calls onChange with new numeric value after BLUR', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15} onChange={onChange}/>);
      pagination.changeInput('5');
      pagination.inputBlur();
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toEqual({page: '5'});
    });

    describe('Input mode accessibility',  () => {
      it('has aria-label for the input field', () => {
        const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={42}/>);
        expect(pagination.getPageInput().getAttribute('aria-label')).toEqual('Page Number, select number between 1 to 42');
      });
    });
  });

  describe('First, Last, Next, Previous Buttons', () => {

    it('shows next & previous buttons (as arrows icon) inline by default', () => {
      const pagination = createDriver(<Pagination totalPages={3}/>);
      expect(pagination.getNavButton('previous')).toBeTruthy();
      expect(pagination.getNavButton('previous').textContent).toEqual('<');
      expect(pagination.getNavButton('next')).toBeTruthy();
      expect(pagination.getNavButton('next').textContent).toEqual('>');
    });

    it('does not show first & last buttons by default', () => {
      const pagination = createDriver(<Pagination totalPages={3}/>);
      expect(pagination.getNavButton('first')).not.toBeTruthy();
      expect(pagination.getNavButton('last')).not.toBeTruthy();

    });
    it('shows first & last buttons (as arrows icons) with showFirstLastNavButtons prop', () => {
      const pagination = createDriver(<Pagination totalPages={3} showFirstLastNavButtons/>);
      expect(pagination.getNavButton('first')).toBeTruthy();
      expect(pagination.getNavButton('first').textContent).toEqual('<<');
      expect(pagination.getNavButton('last')).toBeTruthy();
      expect(pagination.getNavButton('last').textContent).toEqual('>>');
    });

    it('calls onChange on previous, next, first, last buttons', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={3} currentPage={2} showFirstLastNavButtons onChange={onChange}/>);

      ['first', 'last', 'previous', 'next'].forEach(btnName => {
        pagination.clickOnNavButton(btnName);
        expect(onChange.mock.calls[0][0]).toEqual({page: btnName});
        onChange.mockClear();
      });
    });

    it('disables "first" & "prevoius" buttons when current page is the first', async () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={3} currentPage={1} showFirstLastNavButtons onChange={onChange}/>);

      pagination.clickOnNavButton('first');

      await sleep(10);
      expect(onChange.mock.calls.length).toBe(0);
      onChange.mockClear();
      pagination.clickOnNavButton('previous');

      await sleep(10);
      expect(onChange.mock.calls.length).toBe(0);
    });

    it('disables "last" & "next" button when current page is the last', async () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={3} currentPage={3} showFirstLastNavButtons onChange={onChange}/>);

      pagination.clickOnNavButton('last');

      await sleep(10);
      expect(onChange.mock.calls.length).toBe(0);
      onChange.mockClear();
      pagination.clickOnNavButton('next');

      await sleep(10);
      expect(onChange.mock.calls.length).toBe(0);
    });

    it('shows button text with replaceArrowsWithText prop', () => {
      const pagination = createDriver(<Pagination totalPages={3} showFirstLastNavButtons replaceArrowsWithText/>);
      expect(pagination.getNavButton('first').textContent).toEqual('First');
      expect(pagination.getNavButton('last').textContent).toEqual('Last');
      expect(pagination.getNavButton('previous').textContent).toEqual('Previous');
      expect(pagination.getNavButton('next').textContent).toEqual('Next');
    });

    it('replaces buttons text if provided along with replaceArrowsWithText prop', () => {
      const pagination = createDriver(
        <Pagination
          totalPages={3}
          showFirstLastNavButtons
          replaceArrowsWithText
          firstText="oh"
          previousText="my"
          nextText="god"
          lastText="!!!"/>
      );
      expect(pagination.getNavButton('first').textContent).toEqual('oh');
      expect(pagination.getNavButton('previous').textContent).toEqual('my');
      expect(pagination.getNavButton('next').textContent).toEqual('god');
      expect(pagination.getNavButton('last').textContent).toEqual('!!!');
    });

    describe('Navigation Button Accessibility', () => {
      it('has aria-label on the navigation buttons', () => {
        const pagination = createDriver(<Pagination totalPages={3} showFirstLastNavButtons/>);
        expect(pagination.getNavButton('first').getAttribute('aria-label')).toEqual('First Page');
        expect(pagination.getNavButton('last').getAttribute('aria-label')).toEqual('Last Page');
        expect(pagination.getNavButton('previous').getAttribute('aria-label')).toEqual('Previous Page');
        expect(pagination.getNavButton('next').getAttribute('aria-label')).toEqual('Next Page');
      });
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Pagination totalPages={3} />, paginationTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Pagination totalPages={3} />, enzymePaginationTestkitFactory)).toBe(true);
    });
  });
});
