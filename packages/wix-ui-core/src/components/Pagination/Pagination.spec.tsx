import * as React from 'react';
import {paginationDriverFactory, NavButtonName} from './Pagination.driver';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {sleep} from 'wix-ui-test-utils/react-helpers';
import {Pagination} from './';
import {paginationTestkitFactory} from '../../testkit';
import {paginationTestkitFactory as enzymePaginationTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

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
      const pageStrip = pagination.getPageStrip();

      expect(nextBtn.compareDocumentPosition(prevBtn)).toEqual(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(prevBtn.compareDocumentPosition(pageStrip)).toEqual(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(pageStrip.compareDocumentPosition(firstBtn)).toEqual(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(firstBtn.compareDocumentPosition(lastBtn)).toEqual(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });

  describe('Page numbers mode', () => {
    it('displays all pages for a small number of pages', () => {
      const pagination = createDriver(<Pagination totalPages={3}/>);
      expect(pagination.getPageLabels()).toEqual(['1', '2', '3']);
    });

    it('marks page 1 as selected by default', () => {
      const pagination = createDriver(<Pagination totalPages={3}/>);
      expect(pagination.getCurrentPage().textContent).toBe('1');
    });

    it('marks currentPage prop as selected', () => {
      const pagination = createDriver(<Pagination totalPages={3} currentPage={2}/>);
      expect(pagination.getCurrentPage().textContent).toBe('2');
    });

    it('pages send onChange with page number', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={10} maxPagesToShow={10} onChange={onChange}/>);

      pagination.clickPage(3);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({page: 3}));
      onChange.mockClear();

      pagination.clickPage(9);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({page: 9}));
    });

    it('does not call onChange on clicking the current page', async () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={15}  maxPagesToShow={15} currentPage={8} onChange={onChange}/>);

      pagination.clickPage(8);
      await sleep(10);
      expect(onChange).not.toBeCalled();
    });

    describe('Page numbers mode accessibility', () => {
      it('has aria-label attribute on pages', () => {
        const pagination = createDriver(<Pagination totalPages={3} currentPage={1}/>);
        expect(pagination.getPageByNumber(1).getAttribute('aria-label')).toEqual('Page 1');
        expect(pagination.getPageByNumber(2).getAttribute('aria-label')).toEqual('Page 2');
        expect(pagination.getPageByNumber(3).getAttribute('aria-label')).toEqual('Page 3');
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
      expect(pagination.getTotalPagesField().textContent).toMatch(/\b15\b/);
    });

    it('accepts numbers in page input', () => {
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15}/>);
      pagination.changeInput('6');
      expect(pagination.getPageInput().value).toEqual('6');
    });

    it('calls onChange with new numeric value after pressing ENTER', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15} onChange={onChange}/>);
      pagination.changeInput('5');
      pagination.commitInput();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({page: 5}));
    });

    it('does not call onChange with empty value after pressing ENTER', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15} currentPage={8} onChange={onChange}/>);
      pagination.changeInput('');
      pagination.commitInput();

      return sleep(10).then(() => {
        expect(onChange).not.toBeCalled();
      });
    });

    it('cannot leave empty value in the input field when blurring out', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15} currentPage={4} onChange={onChange}/>);
      pagination.changeInput('');
      pagination.blurInput();

      expect(pagination.getPageInput().value).toEqual('4');
    });

    it('does not call onChange with an invalid numeric value after pressing ENTER', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15} onChange={onChange}/>);
      pagination.changeInput('16');
      pagination.commitInput();
      return sleep(10).then(() => {
        expect(onChange).not.toBeCalled();
      });
    });

    it('does not call onChange if the input value is the same as the current page', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={15} currentPage={8} onChange={onChange}/>);
      pagination.changeInput('8');
      pagination.commitInput();

      return sleep(10).then(() => {
        expect(onChange).not.toBeCalled();
      });
    });

    it('adds error state to the input with an invalid numeric value after pressing ENTER and removes it on change', () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination paginationMode="input" totalPages={3} onChange={onChange} />);
      pagination.changeInput('4');
      pagination.commitInput();
      expect(pagination.inputHasError()).toBe(true);
      pagination.changeInput('5');
      expect(pagination.inputHasError()).toBe(false);
      pagination.changeInput('');
      pagination.commitInput();
      expect(pagination.inputHasError()).toBe(true);
    });

    describe('Input mode accessibility',  () => {
      it('has aria-label for the input field', () => {
        const pagination = createDriver(<Pagination paginationMode={'input'} totalPages={42}/>);
        expect(pagination.getPageInput().getAttribute('aria-label')).toEqual('Page number, select a number between 1 and 42');
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
      const pagination = createDriver(<Pagination totalPages={5} currentPage={3} showFirstLastNavButtons onChange={onChange}/>);

      for (const [button, page] of [['first', 1], ['previous', 2], ['next', 4], ['last', 5]]) {
        pagination.clickNavButton(button as NavButtonName);
        expect(onChange).toBeCalledWith(expect.objectContaining({page}));
        onChange.mockClear();
      }
    });

    it('disables "first" & "prevoius" buttons when current page is the first', async () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={3} currentPage={1} showFirstLastNavButtons onChange={onChange}/>);

      pagination.clickNavButton('first');
      await sleep(10);
      expect(onChange).not.toBeCalled();
      onChange.mockClear();

      pagination.clickNavButton('previous');
      await sleep(10);
      expect(onChange).not.toBeCalled();
    });

    it('disables "last" & "next" button when current page is the last', async () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={3} currentPage={3} showFirstLastNavButtons onChange={onChange}/>);

      pagination.clickNavButton('last');
      await sleep(10);
      expect(onChange).not.toBeCalled();
      onChange.mockClear();

      pagination.clickNavButton('next');
      await sleep(10);
      expect(onChange).not.toBeCalled();
    });

    it('allows to customize button text', () => {
      const pagination = createDriver(
        <Pagination
          totalPages={3}
          showFirstLastNavButtons
          firstLabel="oh"
          previousLabel="my"
          nextLabel="god"
          lastLabel="!!!"
        />
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

  describe('Keyboard and mouse interaction', () => {
    it('calls onChange when Enter or Space is pressed on a button', async () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={3} currentPage={2} onChange={onChange} />);

      pagination.simulate.keyDown(pagination.getNavButton('previous'), {keyCode: 13});
      expect(onChange).toBeCalled();
      onChange.mockClear();

      pagination.simulate.keyDown(pagination.getNavButton('previous'), {keyCode: 32});
      expect(onChange).toBeCalled();
      onChange.mockClear();

      pagination.simulate.keyDown(pagination.getNavButton('previous'), {});
      await sleep(10);
      expect(onChange).not.toBeCalled();
      onChange.mockClear();

      pagination.simulate.keyDown(pagination.getPageByNumber(1), {keyCode: 13});
      expect(onChange).toBeCalled();
      onChange.mockClear();

      pagination.simulate.keyDown(pagination.getPageByNumber(1), {keyCode: 32});
      expect(onChange).toBeCalled();
      onChange.mockClear();

      pagination.simulate.keyDown(pagination.getPageByNumber(1), {});
      await sleep(10);
      expect(onChange).not.toBeCalled();
      onChange.mockClear();
    });

    it('calls onChange when the left mouse button is pressed', async () => {
      const onChange = jest.fn();
      const pagination = createDriver(<Pagination totalPages={3} currentPage={2} onChange={onChange} />);

      pagination.simulate.click(pagination.getNavButton('previous'));
      expect(onChange).toBeCalled();
      onChange.mockClear();

      pagination.simulate.click(pagination.getPageByNumber(1));
      expect(onChange).toBeCalled();
      onChange.mockClear();
    });
  });

  it('adds IDs to the elements if ID prefix is provided', () => {
    const pagination = createDriver(<Pagination id="$" totalPages={3} showFirstLastNavButtons />);
    expect(pagination.getNavButton('first').getAttribute('id')).toBe('$navButtonFirst');
    expect(pagination.getNavButton('previous').getAttribute('id')).toBe('$navButtonPrevious');
    expect(pagination.getNavButton('next').getAttribute('id')).toBe('$navButtonNext');
    expect(pagination.getNavButton('last').getAttribute('id')).toBe('$navButtonLast');
    expect(pagination.getPageStrip().getAttribute('id')).toBe('$pageStrip');
  });

  it('does not add ID to the root if ID prefix is not provided', () => {
    const pagination = createDriver(<Pagination totalPages={3} />);
    expect(pagination.root.getAttribute('id')).toBe(null);
  });

  it('allows to customize gap text', () => {
    const pagination = createDriver(
      <Pagination totalPages={5} maxPagesToShow={4} showLastPage gapLabel={<em>*</em>} />
    );
    expect(pagination.getPageLabels()).toEqual(['1', '2', '*', '5']);
  });

  it('adds URLs to the pages according to desired format', () => {
    const pagination = createDriver(
      <Pagination
        totalPages={3}
        currentPage={1}
        pageUrl={n => `https://example.com/${n}/`}
        showFirstLastNavButtons
      />
    );

    expect(pagination.getNavButton('first').getAttribute('href')).toBe(null);
    expect(pagination.getNavButton('previous').getAttribute('href')).toBe(null);
    expect(pagination.getNavButton('next').getAttribute('href')).toEqual('https://example.com/2/');
    expect(pagination.getNavButton('last').getAttribute('href')).toEqual('https://example.com/3/');
    expect(pagination.getPageByNumber(1).getAttribute('href')).toEqual(null);
    expect(pagination.getPageByNumber(2).getAttribute('href')).toEqual('https://example.com/2/');
    expect(pagination.getPageByNumber(3).getAttribute('href')).toEqual('https://example.com/3/');
  });

  describe('Numbering logic', () => {
    it('Renders up to 5 pages during SSR in responsive mode', () => {
      const pagination = createDriver(
        <Pagination
          responsive
          totalPages={9}
          currentPage={5}
          showFirstPage
          showLastPage
          // Hack against Haste trying to mock browser environment, e.g. triggering componentDidMount on the server.
          updateResponsiveLayout={() => null}
        />
      );
      expect(pagination.getPageLabels()).toEqual(['1', '...', '5', '...', '9']);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Pagination totalPages={3} />, paginationTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Pagination totalPages={3} />, enzymePaginationTestkitFactory, mount)).toBe(true);
    });
  });
});
