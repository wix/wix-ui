import * as React from 'react';
import {paginationDriverFactory} from './Pagination.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import Pagination from './index';
import {sleep} from 'wix-ui-test-utils';
import {paginationTestkitFactory} from '../../testkit';
import {paginationTestkitFactory as enzymePaginationTestkitFactory} from '../../testkit/enzyme';

describe('Pagination', () => {
  const createDriver = createDriverFactory(paginationDriverFactory);

  describe('default view', () => {
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

      pagination.clickOnPage(2);
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toEqual({page: '3'});

      onChange.mockClear();

      pagination.clickOnPage(8);
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toEqual({page: '9'});
    });

    it('does not call onChange on clicking the current page', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={15} currentPage={8} roomForXPages={3} onChange={onChange}/>);

      expect(pagination.getPage(1).textContent).toEqual('8');

      pagination.clickOnPage(1);
      return sleep(10).then(() => {
          expect(onChange.mock.calls.length).toBe(0);
      });
    });
  });

  describe('input view', () => {
    it('displays input field showing current page and displays the last page', () => {
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15} currentPage={4}/>);
      expect(pagination.getPageInput()).toBeTruthy();
      expect(pagination.getPageInput().value).toEqual('4');
      expect(pagination.getLastPageField().textContent).toEqual('/ 15');
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
  });

  describe('First, Last, Next, Previous Buttons', () => {

    it('shows next & previous buttons (as arrows icon) inline by default', () => {
      const pagination = createDriver(<Pagination totalPages={3}/>);
      expect(pagination.getNavButton('previous').element).toBeTruthy();
      expect(pagination.getNavButton('previous').element.textContent).toEqual('<');
      expect(pagination.getNavButton('previous').placement).toEqual('inline');
      expect(pagination.getNavButton('next').element).toBeTruthy();
      expect(pagination.getNavButton('next').element.textContent).toEqual('>');
      expect(pagination.getNavButton('next').placement).toEqual('inline');
    });

    it('does not show first & last buttons by default', () => {
      const pagination = createDriver(<Pagination totalPages={3}/>);
      expect(pagination.getNavButton('first').element).not.toBeTruthy();
      expect(pagination.getNavButton('last').element).not.toBeTruthy();

    });
    it('shows first & last buttons (as arrows icons) with showFirstLastButtons prop', () => {
      const pagination = createDriver(<Pagination totalPages={3} showFirstLastButtons/>);
      expect(pagination.getNavButton('first').element).toBeTruthy();
      expect(pagination.getNavButton('first').element.textContent).toEqual('<<');
      expect(pagination.getNavButton('last').element).toBeTruthy();
      expect(pagination.getNavButton('last').element.textContent).toEqual('>>');
    });

    it('calls onChange on previous, next, first, last buttons', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={3} currentPage={2} showFirstLastButtons onChange={onChange}/>);

      ['first', 'last', 'previous', 'next'].forEach(btnName => {
        pagination.clickOnNavButton(btnName);
        expect(onChange.mock.calls[0][0]).toEqual({page: btnName});
        onChange.mockClear();
      });
    });

    it('disables "first" & "prevoius" buttons when current page is the first', async () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={3} currentPage={1} showFirstLastButtons onChange={onChange}/>);

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
      const pagination = createDriver(<Pagination totalPages={3} currentPage={3} showFirstLastButtons onChange={onChange}/>);

      pagination.clickOnNavButton('last');

      await sleep(10);
      expect(onChange.mock.calls.length).toBe(0);
      onChange.mockClear();
      pagination.clickOnNavButton('next');

      await sleep(10);
      expect(onChange.mock.calls.length).toBe(0);
    });

    it('shows button text with replaceArrowsWithText prop', () => {
      const pagination = createDriver(<Pagination totalPages={3} showFirstLastButtons replaceArrowsWithText/>);
      expect(pagination.getNavButton('first').element.textContent).toEqual('First');
      expect(pagination.getNavButton('last').element.textContent).toEqual('Last');
      expect(pagination.getNavButton('previous').element.textContent).toEqual('Previous');
      expect(pagination.getNavButton('next').element.textContent).toEqual('Next');
    });

    it('replaces buttons text if provided along with replaceArrowsWithText prop', () => {
      const pagination = createDriver(
        <Pagination
          totalPages={3}
          showFirstLastButtons
          replaceArrowsWithText
          firstText="oh"
          previousText="my"
          nextText="god"
          lastText="!!!"/>
      );
      expect(pagination.getNavButton('first').element.textContent).toEqual('oh');
      expect(pagination.getNavButton('previous').element.textContent).toEqual('my');
      expect(pagination.getNavButton('next').element.textContent).toEqual('god');
      expect(pagination.getNavButton('last').element.textContent).toEqual('!!!');
    });

    it('places navigagtion buttons on top if navButtonPlacement prop is set to "top"', () => {
      const pagination = createDriver(<Pagination totalPages={3} showFirstLastButtons navButtonPlacement="top"/>);
      expect(pagination.getNavButton('first').placement).toEqual('top');
      expect(pagination.getNavButton('previous').placement).toEqual('top');
      expect(pagination.getNavButton('next').placement).toEqual('top');
      expect(pagination.getNavButton('last').placement).toEqual('top');
    });

    it('places navigagtion buttons on bottom if navButtonPlacement prop is set to "bottom"', () => {
      const pagination = createDriver(<Pagination totalPages={3} showFirstLastButtons navButtonPlacement="bottom"/>);
      expect(pagination.getNavButton('first').placement).toEqual('bottom');
      expect(pagination.getNavButton('previous').placement).toEqual('bottom');
      expect(pagination.getNavButton('next').placement).toEqual('bottom');
      expect(pagination.getNavButton('last').placement).toEqual('bottom');
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
