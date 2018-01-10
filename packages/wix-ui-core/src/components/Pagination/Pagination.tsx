import * as React from 'react';
import {createHOC} from '../../createHOC';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import {PageStrip} from './PageStrip';

enum ButtonType {
  Prev = 'previous',
  Next = 'next',
  First = 'first',
  Last = 'last'
}

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
  showFirstPage?: boolean;
  showLastPage?: boolean;
  showInputModeTotalPages?: boolean;
  responsive?: boolean;
  maxPagesToShow?: number;
  classes?: PaginationClasses;
  id?: string;
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
    showFirstPage: PropTypes.bool,
    /** Whether the page numbers always show the last page  */
    showLastPage: PropTypes.bool,
    /** Whether the to show the total amount of pages next to the input field in "input" paginationMode */
    showInputModeTotalPages: PropTypes.bool,
    /** In 'pages' mode automatically limits the number of pages such that they don't overflow the container */
    responsive: PropTypes.bool,
    /** In 'pages' mode defines the maximum number of pages to show */
    maxPagesToShow: PropTypes.number,
    /** Classes object */
    classes: PropTypes.object,
    /** Component ID */
    id: PropTypes.string
  };

  public static defaultProps: Partial<PaginationProps> = {
    currentPage: 1,
    showFirstLastNavButtons: false,
    replaceArrowsWithText: false,
    showFirstPage: false,
    showLastPage: false,
    responsive: false,
    paginationMode: 'pages',
    showInputModeTotalPages: false,
    firstText: 'First',
    lastText: 'Last',
    previousText: 'Previous',
    nextText: 'Next'
  };

  private getId(elementName: string = ''): string | null {
    return this.props.id ? this.props.id + elementName : null;
  }

  private get maxPagesToShow(): number {
    if (this.props.maxPagesToShow) {
      return this.props.maxPagesToShow;
    } else if (this.props.responsive) {
      return 20;
    } else {
      return 7;
    }
  }

  public state = {
    pageInputValue: String(this.props.currentPage)
  };

  private onChange(page: number | string): void {
    this.props.onChange({page: String(page)});
  }

  private handlePageClick = (e: React.SyntheticEvent<Element>, page: number | string): void => {
    e.preventDefault();
    this.onChange(page);
  }

  private renderPageStrip(): JSX.Element {
    return (
      <PageStrip
        totalPages={this.props.totalPages}
        currentPage={this.props.currentPage}
        maxPagesToShow={this.maxPagesToShow}
        showFirstPage={this.props.showFirstPage}
        showLastPage={this.props.showLastPage}
        responsive={this.props.responsive}
        classes={this.props.classes}
        onPageSelect={this.handlePageClick}
      />
    );
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
    if (page && page !== this.props.currentPage) {
      if (1 <= page && page <= this.props.totalPages) {
        this.onChange(page);
      } else {
        // Error state not implemented.
      }
    }
  }

  private renderPageForm(): JSX.Element {
    const {classes} = this.props;
    const inputSize = this.props.totalPages.toString().length + 2;

    return (
      <div data-hook="page-form" id={this.getId('pageForm')} className={classes.pageForm} style={{order: 3}}>
        <input
          data-hook="page-input"
          type="text"
          size={inputSize}
          className={this.props.classes.pageInput}
          value={this.state.pageInputValue}
          onChange={this.handlePageInputChange}
          onKeyDown={this.handlePageInputKeyDown}
          aria-label={'Page Number, select number between 1 to ' + this.props.totalPages}
        />
        {this.props.showInputModeTotalPages && (
          <span data-hook="total-pages" className={this.props.classes.totalPages}>
            {`\u00A0/\u00A0${this.props.totalPages}`}
          </span>
        )}
      </div>
    );
  }

  private renderNavButton(type: ButtonType): JSX.Element {
    const {classes, rtl} = this.props;

    const disabled = (
      ((type === ButtonType.First || type === ButtonType.Prev) && this.props.currentPage === 1) ||
      ((type === ButtonType.Last  || type === ButtonType.Next) && this.props.currentPage === this.props.totalPages)
    );

    const [order, text, symbol] = {
      [ButtonType.Prev]:  [2, this.props.previousText, rtl ? '>'  :  '<'],
      [ButtonType.Next]:  [4, this.props.nextText,     rtl ? '<'  :  '>'],
      [ButtonType.First]: [1, this.props.firstText,    rtl ? '>>' : '<<'],
      [ButtonType.Last]:  [5, this.props.lastText,     rtl ? '<<' : '>>']
    }[type] as [number, string, string];

    return (
      <a
        data-hook={type}
        id={this.getId(type + 'Page')}
        className={classNames(classes.navButton, {[classes.disabled]: disabled})}
        onClick={disabled ? null : e => this.handlePageClick(e, type)}
        aria-label={type[0].toUpperCase() + type.slice(1) + ' Page'}
        style={{order}}
        tabIndex={disabled ? null : 0}
      >
        {this.props.replaceArrowsWithText ? text : symbol}
      </a>
    );
  }

  public componentWillReceiveProps(nextProps) {
    this.setState({
      pageInputValue: String(nextProps.currentPage)
    });
  }

  public render() {
    const {showFirstLastNavButtons, paginationMode, classes, width} = this.props;

    return (
      <nav
        data-hook="pagination"
        id={this.getId('root')}
        role="navigation"
        aria-label="Pagination Navigation"
        className={classNames(classes.root, {[classes.rtl]: this.props.rtl})}
        style={width ? {width} : null}
      >
        {this.renderNavButton(ButtonType.Next)}
        {this.renderNavButton(ButtonType.Prev)}
        {paginationMode === 'input' ? this.renderPageForm() : this.renderPageStrip()}
        {showFirstLastNavButtons && this.renderNavButton(ButtonType.First)}
        {showFirstLastNavButtons && this.renderNavButton(ButtonType.Last)}
      </nav>
    );
  }
}

export default createHOC(Pagination);
