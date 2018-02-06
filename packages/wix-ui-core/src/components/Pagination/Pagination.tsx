import * as React from 'react';
import * as classNames from 'classnames';
import {createHOC} from '../../createHOC';
import {number, func, oneOf, bool, string, object, node} from 'prop-types';
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
  pageStripInner: string;
  pageStripTemplate: string;
  pageButton: string;
  currentPage: string;
  gap: string;

  // Mode: input
  pageForm: string;
  pageInput: string;
  totalPages: string;

  // Modifiers
  disabled: string;
  error: string;
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
  firstLabel?: React.ReactNode;
  previousLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
  lastLabel?: React.ReactNode;
  gapLabel?: React.ReactNode;
  slashLabel?: React.ReactNode;
  rtl?: boolean;
  width?: number;
  showFirstPage?: boolean;
  showLastPage?: boolean;
  showInputModeTotalPages?: boolean;
  responsive?: boolean;
  maxPagesToShow?: number;
  classes?: PaginationClasses;
  id?: string;
  updateResponsiveLayout?: (callback: () => void) => void;
}

interface PaginationState {
  pageInputValue: string;
  pageInputHasError: boolean;
}

class Pagination extends React.Component<PaginationProps, PaginationState> {
  // this is a technical debt - remove once we have support for typescript props in autodocs
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
    firstLabel: node,
    /** Text to appear for the 'previous' navigation button when prop 'replaceArrowsWithText' is true */
    previousLabel: node,
    /** Text to appear for the 'next' navigation button when prop 'replaceArrowsWithText' is true */
    nextLabel: node,
    /** Text to appear for the 'last' navigation button when prop 'replaceArrowsWithText' is true */
    lastLabel: node,
    /** Text to appear in the gap between page numbers */
    gapLabel: node,
    /** Text to appear between the input and the total number of pages in paginationMode="input" */
    slashLabel: node,
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
    id: string,
    /** Allows to trigger responsive layout update on window dimensions change, font load, etc. */
    updateResponsiveLayout: func
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
    firstLabel: 'First',
    lastLabel: 'Last',
    previousLabel: 'Previous',
    nextLabel: 'Next',
    gapLabel: '...',
    slashLabel: '\u00A0/\u00A0'
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
    pageInputValue: String(this.props.currentPage),
    pageInputHasError: false
  };

  private renderPageStrip(): JSX.Element {
    return (
      <PageStrip
        id={this.props.id}
        classes={this.props.classes}
        totalPages={this.props.totalPages}
        currentPage={this.props.currentPage}
        maxPagesToShow={this.maxPagesToShow}
        showFirstPage={this.props.showFirstPage}
        showLastPage={this.props.showLastPage}
        responsive={this.props.responsive}
        pageUrl={this.props.pageUrl}
        gapLabel={this.props.gapLabel}
        onPageClick={this.handlePageClick}
        onPageKeyDown={this.handlePageKeyDown}
        updateResponsiveLayout={this.props.updateResponsiveLayout}
      />
    );
  }

  private handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      pageInputValue: e.target.value,
      pageInputHasError: false
    });
  }

  private handlePageInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // Enter
    if (event.keyCode === 13) {
      const page = Number(this.state.pageInputValue);
      if (page !== this.props.currentPage) {
        if (1 <= page && page <= this.props.totalPages) {
          this.props.onChange({event, page});
        } else {
          this.setState({pageInputHasError: true});
        }
      }
    }
  }

  private handlePageClick = (event: React.MouseEvent<Element>, page: number): void => {
    this.props.onChange({event, page});
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
      <div data-hook="page-form" id={this.getId('pageForm')} className={classes.pageForm} dir="ltr">
        <input
          data-hook="page-input"
          type="number"
          className={classNames(classes.pageInput, {[classes.error]: this.state.pageInputHasError})}
          min={1}
          max={this.props.totalPages}
          value={this.state.pageInputValue}
          onChange={this.handlePageInputChange}
          onKeyDown={this.handlePageInputKeyDown}
          aria-label={'Page number, select a number between 1 and ' + this.props.totalPages}
        />
        {this.props.showInputModeTotalPages &&
          <span data-hook="total-pages" className={classes.totalPages}>
            {this.props.slashLabel}
            {this.props.totalPages}
          </span>
        }
      </div>
    );
  }

  private renderNavButton(type: ButtonType): JSX.Element {
    const {classes, currentPage, totalPages, pageUrl} = this.props;

    const disabled = (
      ((type === ButtonType.First || type === ButtonType.Prev) && currentPage <= 1) ||
      ((type === ButtonType.Last  || type === ButtonType.Next) && currentPage >= totalPages)
    );

    // dir="rtl" automatically flips the direction of less-than and more-than signs.
    // If we decide to use different characters we need to add conditional logic here.

    const [btnClass, label, symbol, page] = {
      [ButtonType.Prev]:  [classes.navButtonPrevious, this.props.previousLabel, '<',  currentPage - 1],
      [ButtonType.Next]:  [classes.navButtonNext,     this.props.nextLabel,     '>',  currentPage + 1],
      [ButtonType.First]: [classes.navButtonFirst,    this.props.firstLabel,    '<<', 1],
      [ButtonType.Last]:  [classes.navButtonLast,     this.props.lastLabel,     '>>', totalPages]
    }[type] as [string, string, string, number];

    return (
      <a
        data-hook={type}
        id={this.getId('navButton' + upperCaseFirst(type))}
        className={classNames(classes.navButton, btnClass, {[classes.disabled]: disabled})}
        aria-label={upperCaseFirst(type) + ' Page'}
        tabIndex={disabled || pageUrl ? null : 0}
        onClick={disabled ? null : event => this.handlePageClick(event, page)}
        onKeyDown={disabled ? null : event => this.handlePageKeyDown(event, page)}
        href={!disabled && pageUrl ? pageUrl(page) : null}
      >
        {this.props.replaceArrowsWithText ? label : symbol}
      </a>
    );
  }

  public componentWillReceiveProps(nextProps) {
    this.setState({
      pageInputValue: String(nextProps.currentPage),
      pageInputHasError: false
    });
  }

  public render() {
    const {showFirstLastNavButtons, paginationMode, classes, width} = this.props;

    return (
      <nav
        id={this.getId('root')}
        role="navigation"
        aria-label="Pagination Navigation"
        className={classes.root}
        dir={this.props.rtl ? 'rtl' : null}
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
