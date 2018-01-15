import * as React from 'react';
import * as classNames from 'classnames';
import {createHOC} from '../../createHOC';
import {number, func, oneOf, bool, string, object} from 'prop-types';
import {PageStrip} from './PageStrip';

const upperCaseFirst = (str: string): string => str[0].toUpperCase() + str.slice(1);

enum ButtonType {
  Prev = 'previous',
  Next = 'next',
  First = 'first',
  Last = 'last'
}

// TODO: should be automatically derived from styles somehow.
export interface PaginationClasses {
  root: string;

  // Nav buttons
  navButton: string;
  navButtonFirst: string;
  navButtonPrevious: string;
  navButtonNext: string;
  navButtonLast: string;

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
  pageUrl?: (pageNumber: number) => string;
  onChange?: (event: {event: React.SyntheticEvent<Element>, page: number}) => void;
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
    totalPages: number.isRequired,
    /** Current page to be shown as current. defaults to 1 */
    currentPage: number,
    /** Function that generates URLs for page links. If onitted, pages don't link anywhere. */
    pageUrl: func,
    /** Callback to be called when pagination happens - structure ({event, page: number}) => void */
    onChange: func,
    /** Changes page selection mode between page selection and input field. defaults to 'pages'*/
    paginationMode: oneOf(['pages' , 'input']),
    /** Shows the 'first' and 'last' navigation buttons. defaults to false */
    showFirstLastNavButtons: bool,
    /** Allows replacing navigation arrows with textual buttons */
    replaceArrowsWithText: bool,
    /** Text to appear for the 'first' navigation button when prop 'replaceArrowsWithText' is true */
    firstText: string,
    /** Text to appear for the 'previous' navigation button when prop 'replaceArrowsWithText' is true */
    previousText: string,
    /** Text to appear for the 'next' navigation button when prop 'replaceArrowsWithText' is true */
    nextText: string,
    /** Text to appear for the 'last' navigation button when prop 'replaceArrowsWithText' is true */
    lastText: string,
    /**  Whether the component layout is right to left */
    rtl: bool,
    /** The pixel width the component will render in  */
    width: number,
    /** Whether the page numbers always show the first page  */
    showFirstPage: bool,
    /** Whether the page numbers always show the last page  */
    showLastPage: bool,
    /** Whether the to show the total amount of pages next to the input field in "input" paginationMode */
    showInputModeTotalPages: bool,
    /** In 'pages' mode automatically limits the number of pages such that they don't overflow the container */
    responsive: bool,
    /** In 'pages' mode defines the maximum number of pages to show */
    maxPagesToShow: number,
    /** Classes object */
    classes: object,
    /** Component ID */
    id: string
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

  private renderPageStrip(): JSX.Element {
    return (
      <PageStrip
        id={this.props.id}
        totalPages={this.props.totalPages}
        currentPage={this.props.currentPage}
        maxPagesToShow={this.maxPagesToShow}
        showFirstPage={this.props.showFirstPage}
        showLastPage={this.props.showLastPage}
        responsive={this.props.responsive}
        classes={this.props.classes}
        pageUrl={this.props.pageUrl}
        onPageClick={this.handlePageClick}
        onPageKeyDown={this.handlePageKeyDown}
      />
    );
  }

  private handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({pageInputValue: e.target.value});
  }

  private handlePageInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // Enter
    if (event.keyCode === 13) {
      const page = Number(this.state.pageInputValue);
      if (page && page !== this.props.currentPage) {
        if (1 <= page && page <= this.props.totalPages) {
          this.props.onChange({event, page});
        } else {
          // Error state not implemented.
        }
      }
    }
  }

  private handlePageClick = (event: React.MouseEvent<Element>, page: number): void => {
    if (event.button === 0) {
      this.props.onChange({event, page});
    }
  }

  private handlePageKeyDown = (event: React.KeyboardEvent<Element>, page: number): void => {
    // Enter or Space
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.props.onChange({event, page});
    }
  }

  private renderPageForm(): JSX.Element {
    const {classes} = this.props;

    return (
      <div data-hook="page-form" id={this.getId('pageForm')} className={classes.pageForm}>
        <input
          data-hook="page-input"
          type="number"
          className={this.props.classes.pageInput}
          min={1}
          max={this.props.totalPages}
          value={this.state.pageInputValue}
          onChange={this.handlePageInputChange}
          onKeyDown={this.handlePageInputKeyDown}
          aria-label={'Page number, select a number between 1 and ' + this.props.totalPages}
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
    const {classes, rtl, currentPage, totalPages, pageUrl} = this.props;

    const disabled = (
      ((type === ButtonType.First || type === ButtonType.Prev) && currentPage <= 1) ||
      ((type === ButtonType.Last  || type === ButtonType.Next) && currentPage >= totalPages)
    );

    const [btnClass, text, symbol, page] = {
      [ButtonType.Prev]:  [classes.navButtonPrevious, this.props.previousText, rtl ? '>'  :  '<', currentPage - 1],
      [ButtonType.Next]:  [classes.navButtonNext,     this.props.nextText,     rtl ? '<'  :  '>', currentPage + 1],
      [ButtonType.First]: [classes.navButtonFirst,    this.props.firstText,    rtl ? '>>' : '<<', 1],
      [ButtonType.Last]:  [classes.navButtonLast,     this.props.lastText,     rtl ? '<<' : '>>', totalPages]
    }[type] as [string, string, string, number];

    return (
      <a
        data-hook={type}
        id={this.getId('navButton' + upperCaseFirst(type))}
        className={classNames(classes.navButton, btnClass, {[classes.disabled]: disabled})}
        aria-label={type[0].toUpperCase() + type.slice(1) + ' Page'}
        tabIndex={disabled || pageUrl ? null : 0}
        onClick={disabled ? null : event => this.handlePageClick(event, page)}
        onKeyDown={disabled ? null : event => this.handlePageKeyDown(event, page)}
        href={!disabled && pageUrl ? pageUrl(page) : null}
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
