import * as React from 'react';
import {createHOC} from '../../createHOC';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';

// TODO: should be automatically derived from styles somehow.
export interface PaginationClasses {
  root: string;
  navButton: string;
  // Mode: pages
  pageStrip: string;
  pageButton: string;
  currentPage: string;
  ellipsis: string;
  // Mode: input
  pageForm: string;
  pageInput: string;
  totalPages: string;
  // Modifiers
  rtl: string;
  disabled: string;
}

export interface PaginationProps {
  // data
  totalPages: number;
  currentPage?: number;
  // props
  onChange?: (event: {page: string}) => void;
  paginationMode?: 'pages' | 'input';
  showFirstLastNavButtons?: boolean;
  replaceArrowsWithText?: boolean;
  firstText?: string;
  previousText?: string;
  nextText?: string;
  lastText?: string;
  rtl?: boolean;
  width?: number;
  alwaysShowFirstPage?: boolean;
  alwaysShowLastPage?: boolean;
  showInputModeTotalPages?: boolean;
  classes: PaginationClasses;
}

interface PaginationState {
  pageInputValue: string;
}

class Pagination extends React.Component<PaginationProps, PaginationState> {
  // this is a techincal debt - remove once we have support for typescript props in autodocs
  static propTypes = {
    /** The number of pages available to paginate */
    totalPages: PropTypes.number.isRequired,
    /** Current page to be shown as current. defaults to 1 */
    currentPage: PropTypes.number,
    /** Callback to be called when pagination happens - structure ({page: string}) => () */
    onChange: PropTypes.func,
    /** Changes page selection mode between page selection and input field. defaults to 'pages'*/
    paginationMode: PropTypes.oneOf(['pages' , 'input']),
    /** Shows the 'first' and 'last' navigation buttons. defaults to false */
    showFirstLastNavButtons: PropTypes.bool,
    /** Allows replacing navigation arrows with textual buttons */
    replaceArrowsWithText: PropTypes.bool,
    /** Text to appear for the 'first' navigation button when prop 'replaceArrowsWithText' is true */
    firstText: PropTypes.string,
    /** Text to appear for the 'previous' navigation button when prop 'replaceArrowsWithText' is true */
    previousText: PropTypes.string,
    /** Text to appear for the 'next' navigation button when prop 'replaceArrowsWithText' is true */
    nextText: PropTypes.string,
    /** Text to appear for the 'last' navigation button when prop 'replaceArrowsWithText' is true */
    lastText: PropTypes.string,
    /**  Whether the component layout is right to left */
    rtl: PropTypes.bool,
    /** The pixel width the component will render in  */
    width: PropTypes.number,
    /** Whether the page numbers always show the first page  */
    alwaysShowFirstPage: PropTypes.bool,
    /** Whether the page numbers always show the last page  */
    alwaysShowLastPage: PropTypes.bool,
    /** Whether the to show the total amount of pages next to the input field in "input" paginationMode  */
    showInputModeTotalPages: PropTypes.bool,
    /** Classes object */
    classes: PropTypes.object.isRequired
  };

  public static defaultProps: Partial<PaginationProps> = {
    currentPage: 1,
    showFirstLastNavButtons: false,
    replaceArrowsWithText: false,
    paginationMode: 'pages',
    showInputModeTotalPages: false,
    firstText: 'First',
    lastText: 'Last',
    previousText: 'Previous',
    nextText: 'Next'
  };

  private get currentPage() {
    return this.makePageNumberValid(this.props.currentPage, this.props.totalPages);
  }

  public state = {
    pageInputValue: String(this.currentPage)
  };

  private makePageNumberValid(pageNumber: number, totalPages: number): number {
    pageNumber = Math.floor(pageNumber);
    return isNaN(pageNumber) ? 1 : Math.max(Math.min(pageNumber, totalPages), 1);
  }

  private onChange(page: number | string): void {
    this.props.onChange({page: String(page)});
  }

  private handlePageClick = (page: number | string): void => {
    this.onChange(page);
  }

  private renderPageStrip(): JSX.Element {
    const {classes} = this.props;
    const pages = this.getPages();
    const currentPage = this.currentPage;

    return (
      <div
        data-hook="PAGES_SELECTION"
        className={classNames(classes.root, {[classes.rtl]: this.props.rtl})}
        style={{order: 3}}
      >
        {pages.map(page =>
          <a
            data-hook={'PAGE_' + page + (page === currentPage ? ' PAGE_CURRENT' : '')}
            key={page}
            aria-label={`Page ${page}`}
            className={
              page === currentPage ?
                this.props.classes.currentPage :
                this.props.classes.pageButton
            }
            onClick={page === currentPage ? null : () => this.handlePageClick(page)}
          >
            {page}
          </a>
        )}
      </div>
    );
  }

  private getPages(): number[] {
    let result: number[] = [];
    for (let i = 1; i <= this.props.totalPages; i++ ) {
        result.push(i);
    }

    return result;
  }

  private handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newInput = e.target.value;
    if ((newInput === parseInt(newInput, 10).toString() && parseInt(newInput, 10) > 0) || newInput === '') {
      this.setState({pageInputValue: e.target.value});
    }
  }

  private handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const keyCode = e.keyCode;
    if (keyCode === 13) { // pressing enter
      this.pageInputCommit();
    }
  }

  private pageInputCommit = (): void => {
    const page = Number(this.state.pageInputValue);
    if (page && page !== this.currentPage) {
      this.onChange(this.makePageNumberValid(page, this.props.totalPages));
    }
  }

  private renderPageForm(): JSX.Element {
    const {classes} = this.props;
    const inputSize = this.props.totalPages.toString().length + 2;

    return (
      <div data-hook="PAGES_SELECTION" className={classes.pageForm} style={{order: 3}}>
        <input
          data-hook="PAGE_INPUT"
          name="pagenumber"
          type="text"
          size={inputSize}
          className={this.props.classes.pageInput}
          value={this.state.pageInputValue}
          onChange={this.handlePageInputChange}
          onKeyDown={this.handlePageInputKeyDown}
          onBlur={this.pageInputCommit}
          aria-label={'Page Number, select number between 1 to ' + this.props.totalPages}
        />
        {this.props.showInputModeTotalPages && (
          <span data-hook="PAGES_TOTAL" className={this.props.classes.totalPages}>
            {`\u00A0/\u00A0${this.props.totalPages}`}
          </span>
        )}
      </div>
    );
  }

  private renderNavButton(type: 'previous' | 'next' | 'first' | 'last'): JSX.Element {
    const {classes, rtl} = this.props;

    const disabled = (
      ((type === 'first' || type === 'previous') && this.currentPage === 1) ||
      ((type === 'last'  || type === 'next') && this.currentPage === this.props.totalPages)
    );

    const [order, text, symbol] = {
      previous: [2, this.props.previousText, rtl ? '>'  :  '<'],
      next:     [4, this.props.nextText,     rtl ? '<'  :  '>'],
      first:    [1, this.props.firstText,    rtl ? '>>' : '<<'],
      last:     [5, this.props.lastText,     rtl ? '<<' : '>>']
    }[type] as [number, string, string];

    return (
      <a
        data-hook={type.toUpperCase()}
        className={classNames(classes.navButton, {[classes.disabled]: disabled})}
        onClick={disabled ? null : () => this.handlePageClick(type)}
        aria-label={type[0].toUpperCase() + type.slice(1) + ' Page'}
        style={{order}}
      >
        {this.props.replaceArrowsWithText ? text : symbol}
      </a>
    );
  }

  public componentWillReceiveProps(nextProps) {
    this.setState({
      pageInputValue: String(this.makePageNumberValid(nextProps.currentPage, nextProps.totalPages))
    });
  }

  public render() {
    const {showFirstLastNavButtons, paginationMode, classes} = this.props;

    return (
      <nav
        data-hook="PAGINATION"
        className={classNames(classes.root, {[classes.rtl]: this.props.rtl})}
        role="navigation"
        aria-label="Pagination Navigation"
      >
        {this.renderNavButton('next')}
        {this.renderNavButton('previous')}
        {paginationMode === 'input' ? this.renderPageForm() : this.renderPageStrip()}
        {showFirstLastNavButtons && this.renderNavButton('first')}
        {showFirstLastNavButtons && this.renderNavButton('last')}
      </nav>
    );
  }
}

export default createHOC(Pagination);
