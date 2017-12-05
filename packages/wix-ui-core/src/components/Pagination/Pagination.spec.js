import React from 'react';
import paginationDriverFactory from './Pagination.driver';
// import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils/dist/src';
import {createDriverFactory} from 'wix-ui-test-utils/dist/src';
import Pagination from './index';
import {sleep} from "../../testkit/utils/sleep";
// import {toggleSwitchTestkitFactory} from '../../testkit';
// import {toggleSwitchTestkitFactory as enzymeToggleSwitchTestkitFactory} from '../../testkit/enzyme';

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
    
    it('shows previous, next, first, last buttons', () => {
      const pagination = createDriver(<Pagination numOfPages={3}/>);
      ['first', 'last', 'previous', 'next'].forEach(btnName => {
        expect(pagination.getButton(btnName)).toBeTruthy();
      })
    });
    
    it('shows the amount of pages it has room for (shows sibling)', () => {
      const pagination = createDriver(<Pagination numOfPages={33} roomForXPages={7}/>);
      expect(pagination.getPages().length).toBe(7);
      expect(pagination.getPages(0).textContent).toBe('1');
      expect(pagination.getPages(1).textContent).toBe('2');
      expect(pagination.getPages(2).textContent).toBe('3');
      expect(pagination.getPages(3).textContent).toBe('4');
      expect(pagination.getPages(4).textContent).toBe('...');
      expect(pagination.getPages(5).textContent).toBe('32');
      expect(pagination.getPages(6).textContent).toBe('33');
    });
    
    it('disables "first" button when current page is the first', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination numOfPages={3} currentPage={1} onChange={onChange}/>);
      expect(pagination.getButton('first').getAttribute('data-disabled')).toEqual('true');
      
      pagination.clickOnButton('first');
      return sleep(10).then(() => {
        expect(onChange.mock.calls.length).toBe(0)
      });
    });
  
    it('disables "last" button when current page is the last', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination numOfPages={3} currentPage={3} onChange={onChange}/>);
      expect(pagination.getButton('last').getAttribute('data-disabled')).toEqual('true');
    
      pagination.clickOnButton('last');
      return sleep(10).then(() => {
        expect(onChange.mock.calls.length).toBe(0)
      });
    });
    
    describe('onChange behavior', () => {
      it('pages send onChange with page number', () => {
        const onChange = jest.fn();
        const pagination = createDriver(<Pagination numOfPages={58} roomForXPages={10} onChange={onChange}/>);
        
        pagination.clickOnPage(2);
        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.calls[0][0]).toEqual({page: '3'});
        
        onChange.mockClear();
  
        pagination.clickOnPage(8);
        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.calls[0][0]).toEqual({page: '57'})
  
      });
  
      it('does not invoke onChange on sibling page click', () => {
        const onChange = jest.fn();
        const pagination = createDriver(<Pagination numOfPages={58} roomForXPages={10} onChange={onChange}/>);
        
        expect(pagination.getPages(7).textContent).toBe('...');
        pagination.clickOnPage(7);
        
        return sleep(10).then(() => {
          expect(onChange.mock.calls.length).toBe(0);
        });
      });
      
      it('calls onChange on previous, next, first, last buttons', () => {
        const onChange = jest.fn();
        const pagination = createDriver(<Pagination numOfPages={3} currentPage={2} onChange={onChange}/>);
        
        ['first', 'last', 'previous', 'next'].forEach(btnName => {
          pagination.clickOnButton(btnName);
          expect(onChange.mock.calls[0][0]).toEqual({page: btnName});
          onChange.mockClear();
        });
      });
    });
  });
  
  describe('input view', () => {
    it('displays input field showing current page and displays the last page', () => {
      const pagination = createDriver(<Pagination layout={'INPUT'} numOfPages={15} currentPage={4}/>);
      expect(pagination.getPageInput()).toBeTruthy();
      expect(pagination.getPageInput().value).toEqual('4');
      expect(pagination.getLastPageField().textContent).toEqual('/ 15');
    });
  })
});
