import * as React from 'react';
import {paginationDriverFactory} from './Pagination.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils/dist/src';
import Pagination from './index';
import {sleep} from "../../testkit/utils/sleep";
import {paginationTestkitFactory} from '../../testkit';
import {paginationTestkitFactory as enzymePaginationTestkitFactory} from '../../testkit/enzyme';

describe('Pagination', () => {
  const createDriver = createDriverFactory(paginationDriverFactory);
  
  it('exists', () => {
    const pagination = createDriver(<Pagination numOfPages={3}/>);
    expect(pagination.exists()).toBe(true);
  });
  
  describe('default view', () => {
    it('displays all pages for a small number of pages', () => {
      const pagination = createDriver(<Pagination numOfPages={3}/>);
      expect(pagination.getPages().length).toBe(3);
      expect(pagination.getPages(0).textContent).toBe('1');
      expect(pagination.getPages(1).textContent).toBe('2');
      expect(pagination.getPages(2).textContent).toBe('3');
    });
    
    it('marks page 1 as selected by default', () => {
      const pagination = createDriver(<Pagination numOfPages={3}/>);
      expect(pagination.getCurrentPage().textContent).toBe('1');
    });
    
    it('marks currentPage prop as selected', () => {
      const pagination = createDriver(<Pagination numOfPages={3} currentPage={2}/>);
      expect(pagination.getCurrentPage().textContent).toBe('2');
    });

    it('if currentPage is higher than the number of pages - current page is the last one', () => {
      const pagination = createDriver(<Pagination numOfPages={34} currentPage={56}/>);
      expect(pagination.getCurrentPage().textContent).toBe('34');
    });

    it('pages send onChange with page number', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination numOfPages={10} onChange={onChange}/>);
      
      pagination.clickOnPage(2);
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toEqual({page: '3'});
      
      onChange.mockClear();
      
      pagination.clickOnPage(8);
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toEqual({page: '9'})
    });

    it('does not call onChange on clicking the current page', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination numOfPages={15} currentPage={8} roomForXPages={3} onChange={onChange}/>);

      expect(pagination.getPages(1).textContent).toEqual('8');

      pagination.clickOnPage(1);
      return sleep(10).then(() => {
          expect(onChange.mock.calls.length).toBe(0);
      });
    });

    describe('page numbers logic', () => {
      it('shows all pages when possible', () => {
        const pagination = createDriver(<Pagination numOfPages={7} roomForXPages={8}/>);
        expect(pagination.getPages().length).toEqual(7);
        ['1', '2', '3', '4', '5', '6', '7'].forEach((num, idx) => {
            expect(pagination.getPages(idx).textContent).toEqual(num);
        });
      });

      it('centers on current page for odd number of pages', () => {
        const pagination = createDriver(<Pagination numOfPages={10} roomForXPages={3} currentPage={5}/>);
        expect(pagination.getPages().length).toEqual(3);
        ['4', '5', '6'].forEach((num, idx) => {
            expect(pagination.getPages(idx).textContent).toEqual(num);
        });
      });

      it('centers on current page for even number of pages', () => {
        const pagination = createDriver(<Pagination numOfPages={10} roomForXPages={4} currentPage={5}/>);
        expect(pagination.getPages().length).toEqual(3);
        ['4', '5', '6'].forEach((num, idx) => {
            expect(pagination.getPages(idx).textContent).toEqual(num);
        });
      });
    });
  });
  
  describe('input view', () => {
    it('displays input field showing current page and displays the last page', () => {
      const pagination = createDriver(<Pagination paginationMode={'input'} numOfPages={15} currentPage={4}/>);
      expect(pagination.getPageInput()).toBeTruthy();
      expect(pagination.getPageInput().value).toEqual('4');
      expect(pagination.getLastPageField().textContent).toEqual('/ 15');
    });
    
    it('accepts numbers in page input', () => {
      const pagination = createDriver(<Pagination paginationMode={'input'} numOfPages={15}/>);
      pagination.changeInput('6');
      expect(pagination.getPageInput().value).toEqual('6');
    });
    
    it('does not accept non natural numbers in page input', () => {
      const pagination = createDriver(<Pagination paginationMode={'input'} numOfPages={15}/>);
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
      const pagination = createDriver(<Pagination paginationMode={'input'} numOfPages={15} onChange={onChange}/>);
      pagination.changeInput('5');
      pagination.inputKeyCode(13);
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toEqual({page: '5'});
    });
    
    it('does not call onChange with empty value after pressing ENTER', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} numOfPages={15} currentPage={8} onChange={onChange}/>);
      pagination.changeInput('');
      pagination.inputKeyCode(13);
      
      return sleep(10).then(() => {
        expect(onChange.mock.calls.length).toBe(0);
      });
    });
    
    it('does not call onChange if the input value is the same as the current page', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} numOfPages={15} currentPage={8} onChange={onChange}/>);
      pagination.changeInput('8');
      pagination.inputKeyCode(13);
      
      return sleep(10).then(() => {
        expect(onChange.mock.calls.length).toBe(0);
      });
    });

    it('calls onChange with the last page if input value is higher than the last page', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} numOfPages={15} currentPage={8} onChange={onChange}/>);
      pagination.changeInput('34');
      pagination.inputKeyCode(13);

      return sleep(10).then(() => {
          expect(onChange.mock.calls.length).toBe(1);
          expect(onChange.mock.calls[0][0]).toEqual({page: '15'});
      });
    });

    it('calls onChange with new numeric value after BLUR', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} numOfPages={15} onChange={onChange}/>);
      pagination.changeInput('5');
      pagination.inputBlur();
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toEqual({page: '5'});
    });
  });
  
  describe('First, Last, Next, Previous Buttons', () => {
    
    it('shows next & previous buttons (as arrows icon) inline by default', () => {
      const pagination = createDriver(<Pagination numOfPages={3}/>);
      expect(pagination.getButton('previous').element).toBeTruthy();
      expect(pagination.getButton('previous').element.textContent).toEqual('<');
      expect(pagination.getButton('previous').placement).toEqual('inline');
      expect(pagination.getButton('next').element).toBeTruthy();
      expect(pagination.getButton('next').element.textContent).toEqual('>');
      expect(pagination.getButton('next').placement).toEqual('inline');
    });
    
    it('does not show first & last buttons by default', () => {
      const pagination = createDriver(<Pagination numOfPages={3}/>);
      expect(pagination.getButton('first').element).not.toBeTruthy();
      expect(pagination.getButton('last').element).not.toBeTruthy();
      
    });
    it('shows first & last buttons (as arrows icons) with showFirstLastButtons prop', () => {
      const pagination = createDriver(<Pagination numOfPages={3} showFirstLastButtons/>);
      expect(pagination.getButton('first').element).toBeTruthy();
      expect(pagination.getButton('first').element.textContent).toEqual('<<');
      expect(pagination.getButton('last').element).toBeTruthy();
      expect(pagination.getButton('last').element.textContent).toEqual('>>');
    });
    
    
    it('calls onChange on previous, next, first, last buttons', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination numOfPages={3} currentPage={2} showFirstLastButtons onChange={onChange}/>);
      
      ['first', 'last', 'previous', 'next'].forEach(btnName => {
        pagination.clickOnButton(btnName);
        expect(onChange.mock.calls[0][0]).toEqual({page: btnName});
        onChange.mockClear();
      });
    });
    
    it('disables "first" & "prevoius" buttons when current page is the first', async () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination numOfPages={3} currentPage={1} showFirstLastButtons onChange={onChange}/>);
      
      pagination.clickOnButton('first');

      await sleep(10);
      expect(onChange.mock.calls.length).toBe(0);
      onChange.mockClear();
      pagination.clickOnButton('previous');

      await sleep(10);
      expect(onChange.mock.calls.length).toBe(0);
    });
    
    it('disables "last" & "next" button when current page is the last', async () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination numOfPages={3} currentPage={3} showFirstLastButtons onChange={onChange}/>);
      
      pagination.clickOnButton('last');

      await sleep(10);
      expect(onChange.mock.calls.length).toBe(0);
      onChange.mockClear();
      pagination.clickOnButton('next');

      await sleep(10);
      expect(onChange.mock.calls.length).toBe(0);
    });
    
    it('shows button text with replaceArrowsWithText prop', () => {
      const pagination = createDriver(<Pagination numOfPages={3} showFirstLastButtons replaceArrowsWithText/>);
      expect(pagination.getButton('first').element.textContent).toEqual('First');
      expect(pagination.getButton('last').element.textContent).toEqual('Last');
      expect(pagination.getButton('previous').element.textContent).toEqual('Previous');
      expect(pagination.getButton('next').element.textContent).toEqual('Next');
    });

    it('places navigagtion buttons on top if navButtonPlacement prop is set to "top"', () => {
      const pagination = createDriver(<Pagination numOfPages={3} showFirstLastButtons navButtonPlacement="top"/>);
      expect(pagination.getButton('first').placement).toEqual('top');
      expect(pagination.getButton('previous').placement).toEqual('top');
      expect(pagination.getButton('next').placement).toEqual('top');
      expect(pagination.getButton('last').placement).toEqual('top');
    });

    it('places navigagtion buttons on bottom if navButtonPlacement prop is set to "bottom"', () => {
      const pagination = createDriver(<Pagination numOfPages={3} showFirstLastButtons navButtonPlacement="bottom"/>);
      expect(pagination.getButton('first').placement).toEqual('bottom');
      expect(pagination.getButton('previous').placement).toEqual('bottom');
      expect(pagination.getButton('next').placement).toEqual('bottom');
      expect(pagination.getButton('last').placement).toEqual('bottom');
    });
  });
  
  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Pagination numOfPages={3} />, paginationTestkitFactory)).toBe(true);
    });
  });
  
  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Pagination numOfPages={3} />, enzymePaginationTestkitFactory)).toBe(true);
    });
  });
});
