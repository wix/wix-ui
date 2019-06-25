import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { StylableDOMUtil } from '@stylable/dom-test-kit';
import { sleep } from 'wix-ui-test-utils/react-helpers';
import { Pagination } from './Pagination';
import { PaginationDriver } from './Pagination.private.driver';
import style from './Pagination.st.css';
import testStyle from './PaginationTest.st.css';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';

const stylableUtil = new StylableDOMUtil(style);

function spaceForPages(n) {
  // Assuming we use styles from PaginationTest.st.css
  const buttonWidth = 30;
  const buttonMargin = 5;
  return (n + 2) * (buttonWidth + 2 * buttonMargin) - 2 * buttonMargin;
}

describe('Pagination', () => {
  const container = new ReactDOMTestContainer().unmountAfterEachTest();
  const render = jsx =>
    container
      .render(jsx)
      .then(() => new PaginationDriver(container.componentNode!));

  describe('Accessibility', () => {
    it('has <nav> as the root node', async () => {
      const p = await render(<Pagination totalPages={5} />);

      expect(p.root.tagName).toEqual('NAV');
    });

    it('has aria-label', async () => {
      const p = await render(<Pagination totalPages={5} />);

      expect(p.root.getAttribute('aria-label')).toEqual(
        'Pagination Navigation',
      );
    });

    it('has correct order of elements for screen readers', async () => {
      // This test is used to lock down the order of "elements of interest" for
      // screen reader flow. This also determines native tab order. Note: the
      // visual order of the elements can be different.

      const p = await render(
        <Pagination totalPages={5} showFirstLastNavButtons />,
      );

      expect(p.nextButton.compareDocumentPosition(p.previousButton)).toEqual(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );

      expect(p.previousButton.compareDocumentPosition(p.pageStrip)).toEqual(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );

      expect(p.pageStrip.compareDocumentPosition(p.firstButton)).toEqual(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );

      expect(p.firstButton.compareDocumentPosition(p.lastButton)).toEqual(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });

    it('has aria-label attribute on pages', async () => {
      const p = await render(<Pagination totalPages={3} />);

      expect(p.getPage(1).getAttribute('aria-label')).toEqual('Page 1');
      expect(p.getPage(2).getAttribute('aria-label')).toEqual('Page 2');
      expect(p.getPage(3).getAttribute('aria-label')).toEqual('Page 3');
    });

    it('has aria-label on the input field', async () => {
      const p = await render(
        <Pagination paginationMode="input" totalPages={5} />,
      );

      expect(p.input.getAttribute('aria-label')).toEqual(
        'Page number, select a number between 1 and 5',
      );
    });

    it('has aria-label on navigation buttons', async () => {
      const p = await render(
        <Pagination totalPages={3} showFirstLastNavButtons />,
      );

      expect(p.firstButton.getAttribute('aria-label')).toEqual('First Page');
      expect(p.lastButton.getAttribute('aria-label')).toEqual('Last Page');
      expect(p.previousButton.getAttribute('aria-label')).toEqual(
        'Previous Page',
      );
      expect(p.nextButton.getAttribute('aria-label')).toEqual('Next Page');
    });
  });

  describe('Page numbers mode', () => {
    it('selects the first page by default', async () => {
      const p = await render(<Pagination totalPages={5} />);

      expect(p.currentPage.textContent).toBe('1');
    });

    it('selects given currentPage', async () => {
      const p = await render(<Pagination totalPages={5} currentPage={5} />);

      expect(p.currentPage.textContent).toBe('5');
    });

    it('calls onChange on page click', async () => {
      const onChange = jest.fn();
      const p = await render(
        <Pagination totalPages={5} currentPage={1} onChange={onChange} />,
      );

      Simulate.click(p.getPage(5));
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ page: 5 }),
      );
    });

    it('does not call onChange on current page click', async () => {
      const onChange = jest.fn();
      const p = await render(
        <Pagination totalPages={5} currentPage={1} onChange={onChange} />,
      );

      Simulate.click(p.getPage(1));
      await sleep(10);
      expect(onChange).not.toBeCalled();
    });

    it('does not call onChange when disabled', async () => {
      const onChange = jest.fn();
      const p = await render(
        <Pagination
          totalPages={5}
          currentPage={1}
          onChange={onChange}
          showFirstLastNavButtons
          disabled
        />,
      );

      Simulate.click(p.getPage(2));
      Simulate.click(p.firstButton);
      Simulate.click(p.lastButton);
      Simulate.click(p.nextButton);
      Simulate.click(p.previousButton);
      await sleep(10);
      expect(onChange).not.toBeCalled();
    });
  });

  describe('Plane mode', () => {
    it('shows the total amount of pages', async () => {
      const p = await render(
        <Pagination paginationMode="plane" totalPages={5} />,
      );

      expect(p.totalPagesLabel.textContent).toEqual('5');
    });

    it('shows the current page label', async () => {
      const p = await render(
        <Pagination paginationMode="plane" currentPage={2} totalPages={5} />,
      );

      expect(p.currentPage.textContent).toBe('2');
    });
  });

  describe('Input field mode', () => {
    it('shows the input field with the current page', async () => {
      const p = await render(
        <Pagination paginationMode="input" totalPages={5} />,
      );

      expect(p.input.value).toEqual('1');
    });

    it('does not show the total amount of pages by default', async () => {
      const { totalPagesLabel } = await render(
        <Pagination paginationMode="input" totalPages={5} />,
      );

      expect(totalPagesLabel).toBe(null);
    });

    it('shows the total amount of pages if showInputModeTotalPages=true', async () => {
      const p = await render(
        <Pagination
          paginationMode="input"
          totalPages={5}
          showInputModeTotalPages
        />,
      );

      expect(p.totalPagesLabel.textContent).toEqual('5');
    });

    it('calls onChange on Enter press', async () => {
      const onChange = jest.fn();
      const p = await render(
        <Pagination
          paginationMode="input"
          totalPages={5}
          onChange={onChange}
        />,
      );

      p.changeInput('5');
      p.commitInput();
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ page: 5 }),
      );
    });

    it('does not call onChange with an empty value', async () => {
      const onChange = jest.fn();
      const p = await render(
        <Pagination
          paginationMode="input"
          totalPages={5}
          onChange={onChange}
        />,
      );

      p.changeInput('');
      p.commitInput();
      await sleep(10);
      expect(onChange).not.toBeCalled();
    });

    it('does not call onChange with an out-of-range value', async () => {
      const onChange = jest.fn();
      const p = await render(
        <Pagination
          paginationMode="input"
          totalPages={5}
          onChange={onChange}
        />,
      );

      p.changeInput('6');
      p.commitInput();
      await sleep(10);
      expect(onChange).not.toBeCalled();
    });

    it('does not call onChange with the current page number', async () => {
      const onChange = jest.fn();
      const p = await render(
        <Pagination
          paginationMode="input"
          totalPages={5}
          currentPage={1}
          onChange={onChange}
        />,
      );

      p.changeInput('1');
      p.commitInput();
      await sleep(10);
      expect(onChange).not.toBeCalled();
    });

    it('does not call onChange with a non-numeric value', async () => {
      const onChange = jest.fn();
      const p = await render(
        <Pagination paginationMode="input" totalPages={5} currentPage={1} />,
      );

      p.changeInput('five');
      p.commitInput();
      await sleep(10);
      expect(onChange).not.toBeCalled();
    });

    it('reverts cleared input to the current page on blur', async () => {
      const p = await render(
        <Pagination paginationMode="input" totalPages={5} currentPage={1} />,
      );

      Simulate.focus(p.input);
      p.changeInput('');
      expect(p.input.value).toBe('');
      Simulate.blur(p.input);
      expect(p.input.value).toBe('1');
    });

    it('disables the input in disabled mode', async () => {
      const p = await render(
        <Pagination paginationMode="input" totalPages={5} disabled />,
      );

      expect(p.input.disabled).toBe(true);
    });

    it(
      'adds error state after pressing Enter if the input has invalid value ' +
        'and removes the error state on entry',
      async () => {
        const p = await render(
          <Pagination paginationMode="input" totalPages={5} />,
        );

        p.changeInput('6');
        p.commitInput();
        expect(stylableUtil.hasStyleState(p.root, 'error')).toBe(true);
        p.changeInput('1');
        expect(stylableUtil.hasStyleState(p.root, 'error')).toBe(false);
      },
    );
  });

  describe('Navigation buttons', () => {
    it('shows only next and previous buttons by default', async () => {
      const p = await render(<Pagination totalPages={3} />);

      expect(p.previousButton).toBeTruthy();
      expect(p.nextButton).toBeTruthy();
      expect(p.firstButton).toBe(null);
      expect(p.lastButton).toBe(null);
    });

    it('shows first and last buttons when showFirstLastNavButtons is on', async () => {
      const p = await render(
        <Pagination totalPages={3} showFirstLastNavButtons />,
      );

      expect(p.firstButton).toBeTruthy();
      expect(p.lastButton).toBeTruthy();
    });

    it('each of the buttons triggers onChange', async () => {
      const onChange = jest.fn();
      const p = await render(
        <Pagination
          totalPages={5}
          currentPage={3}
          showFirstLastNavButtons
          onChange={onChange}
        />,
      );

      Simulate.click(p.previousButton);
      expect(onChange).lastCalledWith(expect.objectContaining({ page: 2 }));
      Simulate.click(p.nextButton);
      expect(onChange).lastCalledWith(expect.objectContaining({ page: 4 }));
      Simulate.click(p.firstButton);
      expect(onChange).lastCalledWith(expect.objectContaining({ page: 1 }));
      Simulate.click(p.lastButton);
      expect(onChange).lastCalledWith(expect.objectContaining({ page: 5 }));
    });

    it('disables first and previous buttons when on the first page', async () => {
      const onChange = jest.fn();
      const p = await render(
        <Pagination totalPages={5} currentPage={1} showFirstLastNavButtons />,
      );

      Simulate.click(p.previousButton);
      Simulate.click(p.firstButton);
      await sleep(10);
      expect(onChange).not.toBeCalled();
    });

    it('disables next and last buttons when on the last page', async () => {
      const onChange = jest.fn();
      const p = await render(
        <Pagination totalPages={5} currentPage={5} showFirstLastNavButtons />,
      );

      Simulate.click(p.nextButton);
      Simulate.click(p.lastButton);
      await sleep(10);
      expect(onChange).not.toBeCalled();
    });

    it('allows to customize button text', async () => {
      const p = await render(
        <Pagination
          totalPages={5}
          showFirstLastNavButtons
          firstLabel="first-label"
          previousLabel="previous-label"
          nextLabel="next-label"
          lastLabel="last-label"
        />,
      );
      expect(p.firstButton.textContent).toEqual('first-label');
      expect(p.previousButton.textContent).toEqual('previous-label');
      expect(p.nextButton.textContent).toEqual('next-label');
      expect(p.lastButton.textContent).toEqual('last-label');
    });
  });

  describe('Keyboard and mouse interaction', () => {
    it('allows to select items using Space and Enter', async () => {
      const onChange = jest.fn();
      const p = await render(
        <Pagination totalPages={3} currentPage={1} onChange={onChange} />,
      );

      Simulate.keyDown(p.nextButton, { keyCode: 0 });
      Simulate.keyDown(p.getPage(2), { keyCode: 0 });
      expect(onChange).not.toBeCalled();

      Simulate.keyDown(p.nextButton, { keyCode: 32 });
      Simulate.keyDown(p.nextButton, { keyCode: 13 });
      Simulate.keyDown(p.getPage(2), { keyCode: 32 });
      Simulate.keyDown(p.getPage(2), { keyCode: 13 });
      expect(onChange).toHaveBeenCalledTimes(4);
    });

    it('allows to select items using mouse', async () => {
      const onChange = jest.fn();
      const p = await render(
        <Pagination totalPages={3} currentPage={1} onChange={onChange} />,
      );

      Simulate.click(p.nextButton);
      Simulate.click(p.getPage(2));
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });

  // There tests depend on layout and are for browser environment only.
  describe.skip('Responsiveness', () => {
    it(`shows all pages if there is enough room`, async () => {
      const p = await render(
        <Pagination
          className={testStyle.root}
          responsive
          width={spaceForPages(9)}
          showFirstPage
          showLastPage
          currentPage={5}
          totalPages={9}
        />,
      );

      expect(p.pageLabels).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
      ]);
    });

    it(`starts adding ellipsis if there is not enough room`, async () => {
      const p = await render(
        <Pagination
          className={testStyle.root}
          responsive
          width={spaceForPages(9) - 1}
          showFirstPage
          showLastPage
          currentPage={5}
          totalPages={9}
        />,
      );

      expect(p.pageLabels).toEqual(['1', '2', '3', '4', '5', '6', '...', '9']);
    });

    it(`doesn't try to include the first and the last page when not explicitly asked to`, async () => {
      const p = await render(
        <Pagination
          className={testStyle.root}
          responsive
          width={spaceForPages(7)}
          currentPage={5}
          totalPages={9}
        />,
      );

      expect(p.pageLabels).toEqual(['2', '3', '4', '5', '6', '7', '8']);
    });

    it(`shows ellipsis before the last page if the current page is close to the beginning`, async () => {
      const p = await render(
        <Pagination
          className={testStyle.root}
          responsive
          width={spaceForPages(7)}
          showFirstPage
          showLastPage
          currentPage={4}
          totalPages={9}
        />,
      );

      expect(p.pageLabels).toEqual(['1', '2', '3', '4', '5', '...', '9']);
    });

    it(`show ellipsis after the first page if the current page is close to the end`, async () => {
      const p = await render(
        <Pagination
          className={testStyle.root}
          responsive
          width={spaceForPages(7)}
          showFirstPage
          showLastPage
          currentPage={6}
          totalPages={9}
        />,
      );

      expect(p.pageLabels).toEqual(['1', '...', '5', '6', '7', '8', '9']);
    });

    it(`show ellipsis on each side if the current page is somewhere in the middle`, async () => {
      const p = await render(
        <Pagination
          className={testStyle.root}
          responsive
          width={spaceForPages(7)}
          showFirstPage
          showLastPage
          currentPage={5}
          totalPages={9}
        />,
      );

      expect(p.pageLabels).toEqual(['1', '...', '4', '5', '6', '...', '9']);
    });

    it(`gives higher priority to first and last page than to prev and next`, async () => {
      const p = await render(
        <Pagination
          className={testStyle.root}
          responsive
          width={spaceForPages(5)}
          showFirstPage
          showLastPage
          currentPage={5}
          totalPages={9}
        />,
      );

      expect(p.pageLabels).toEqual(['1', '...', '5', '...', '9']);
    });

    it(`doesn't show ellipses if there's too little space for them`, async () => {
      const p = await render(
        <Pagination
          className={testStyle.root}
          responsive
          width={spaceForPages(3)}
          showFirstPage
          showLastPage
          currentPage={5}
          totalPages={9}
        />,
      );

      expect(p.pageLabels).toEqual(['4', '5', '6']);
    });

    it(`always shows the current page even if there's not enough space for it`, async () => {
      const p = await render(
        <Pagination
          className={testStyle.root}
          responsive
          width={spaceForPages(0.5)}
          showFirstPage
          showLastPage
          currentPage={5}
          totalPages={9}
        />,
      );

      expect(p.pageLabels).toEqual(['5']);
    });
  });

  it('adds IDs to the elements if ID prefix is provided', async () => {
    const p = await render(
      <Pagination id="$" totalPages={3} showFirstLastNavButtons />,
    );

    expect(p.firstButton.getAttribute('id')).toBe('$navButtonFirst');
    expect(p.previousButton.getAttribute('id')).toBe('$navButtonPrevious');
    expect(p.nextButton.getAttribute('id')).toBe('$navButtonNext');
    expect(p.lastButton.getAttribute('id')).toBe('$navButtonLast');
    expect(p.pageStrip.getAttribute('id')).toBe('$pageStrip');
  });

  it('does not add ID to the root if ID prefix is not provided', async () => {
    const p = await render(<Pagination totalPages={3} />);

    expect(p.root.hasAttribute('id')).toBe(false);
  });

  it('allows to customize the gap text', async () => {
    const p = await render(
      <Pagination
        totalPages={5}
        maxPagesToShow={4}
        showLastPage
        gapLabel={<em>*</em>}
      />,
    );

    expect(p.pageLabels).toEqual(['1', '2', '*', '5']);
  });

  it('adds URLs to the pages according to desired format', async () => {
    const p = await render(
      <Pagination
        totalPages={3}
        currentPage={1}
        pageUrl={n => `https://example.com/${n}/`}
        showFirstLastNavButtons
      />,
    );

    expect(p.firstButton.getAttribute('href')).toBe(null);
    expect(p.previousButton.getAttribute('href')).toBe(null);
    expect(p.nextButton.getAttribute('href')).toEqual('https://example.com/2/');
    expect(p.lastButton.getAttribute('href')).toEqual('https://example.com/3/');
    expect(p.getPage(1).getAttribute('href')).toEqual(null);
    expect(p.getPage(2).getAttribute('href')).toEqual('https://example.com/2/');
    expect(p.getPage(3).getAttribute('href')).toEqual('https://example.com/3/');
  });

  it('calls onClick when clicking on the component', async () => {
    const onClick = jest.fn();
    const p = await render(<Pagination totalPages={3} onClick={onClick} />);

    Simulate.click(p.root);
    expect(onClick).toHaveBeenCalled();
  });

  it('calls onDoubcleClick when double clicking on the component', async () => {
    const onDoubleClick = jest.fn();
    const p = await render(
      <Pagination totalPages={3} onDoubleClick={onDoubleClick} />,
    );

    Simulate.doubleClick(p.root);
    expect(onDoubleClick).toHaveBeenCalled();
  });
});
