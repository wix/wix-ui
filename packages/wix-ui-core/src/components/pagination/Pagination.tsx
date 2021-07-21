import * as React from 'react';
import { PageStrip } from './PageStrip';
import { st, classes } from './Pagination.st.css';
import { measureAndSetRootMinWidth } from './root-min-width';
import { PaginationDataHooks } from './DataHooks';
import { filterDataProps } from '../../utils/filter-data-props';

const upperCaseFirst = (str: string): string =>
  str[0].toUpperCase() + str.slice(1);

export const getId = (idPrefix: string = '', name: string = '') =>
  idPrefix ? idPrefix + name : null;
export const calculateWidth = (totalPages: number) =>
  `${totalPages.toString().length}em`;

const enum ButtonType {
  Prev = 'previous',
  Next = 'next',
  First = 'first',
  Last = 'last',
}

export const enum PaginationMode {
  Pages = 'pages',
  Compact = 'compact',
  Input = 'input',
}

export interface PaginationProps {
  /** hook for testing purposes */
  'data-hook'?: string;
  // data
  totalPages: number;
  currentPage?: number;
  // props
  pageUrl?(pageNumber: number): string;
  onChange?(event: { event: React.SyntheticEvent; page: number }): void;
  onClick?(event: React.SyntheticEvent): void;
  onDoubleClick?(event: React.SyntheticEvent): void;
  onMouseEnter?(event: React.SyntheticEvent): void;
  onMouseLeave?(event: React.SyntheticEvent): void;
  paginationMode?: 'pages' | 'input' | 'compact' | PaginationMode;
  showFirstLastNavButtons?: boolean;
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
  showNextLabel?: boolean;
  showPreviousLabel?: boolean;
  showInputModeTotalPages?: boolean;
  responsive?: boolean;
  maxPagesToShow?: number;
  className?: string;
  id?: string;
  updateResponsiveLayout?(callback: () => void): void;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export interface PaginationState {
  pageInputValue: string;
  pageInputHasError: boolean;
}

export class Pagination extends React.Component<
  PaginationProps,
  PaginationState
> {
  static displayName = 'Pagination';
  public static defaultProps: Partial<PaginationProps> = {
    currentPage: 1,
    showFirstLastNavButtons: false,
    showFirstPage: false,
    showLastPage: false,
    showNextLabel: true,
    showPreviousLabel: true,
    responsive: false,
    paginationMode: 'pages',
    showInputModeTotalPages: false,
    disabled: false,

    // dir="rtl" automatically flips the direction of less-than and more-than signs.
    // If we decide to use different labels we need to add conditional logic.
    firstLabel: '<<',
    lastLabel: '>>',
    previousLabel: '<',
    nextLabel: '>',
    gapLabel: '...',
    slashLabel: '\u00A0/\u00A0',
  };

  private rootNode: HTMLElement;

  private updateRootMinWidth() {
    measureAndSetRootMinWidth(
      this.rootNode,
      this.props.paginationMode,
      this.props.id,
    );
  }

  public componentDidMount() {
    this.props.updateResponsiveLayout && this.updateRootMinWidth();
  }

  public componentDidUpdate() {
    this.props.updateResponsiveLayout && this.updateRootMinWidth();
  }

  private getId(elementName: string = ''): string | null {
    return getId(this.props.id, elementName);
  }

  private readonly getMaxPagesToShow = (): number => {
    if (this.props.maxPagesToShow) {
      return this.props.maxPagesToShow;
    }
    if (this.props.responsive) {
      return 20;
    }
    return 7;
  };

  public state = {
    pageInputValue: String(this.props.currentPage),
    pageInputHasError: false,
  };

  private renderPageStrip(): JSX.Element {
    return (
      <PageStrip
        id={this.props.id}
        totalPages={this.props.totalPages}
        currentPage={this.props.currentPage}
        maxPagesToShow={this.getMaxPagesToShow()}
        showFirstPage={this.props.showFirstPage}
        showLastPage={this.props.showLastPage}
        responsive={this.props.responsive}
        pageUrl={this.props.pageUrl}
        gapLabel={this.props.gapLabel}
        onPageClick={this.handlePageClick}
        onPageKeyDown={this.handlePageKeyDown}
        updateResponsiveLayout={this.props.updateResponsiveLayout}
        disabled={this.props.disabled}
      />
    );
  }

  private readonly handlePageInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    this.setState({
      pageInputValue: e.target.value,
      pageInputHasError: false,
    });
  };

  private readonly handlePageInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    // Enter
    if (event.key === 'Enter') {
      const page = Number(this.state.pageInputValue);
      if (page !== this.props.currentPage) {
        if (1 <= page && page <= this.props.totalPages) {
          this.props.onChange({ event, page });
        } else {
          this.setState({ pageInputHasError: true });
        }
      }
    }
  };

  private readonly handlePageInputBlur = (
    event: React.FocusEvent<HTMLInputElement>,
  ): void => {
    this.setState({
      pageInputValue: String(this.props.currentPage),
      pageInputHasError: false,
    });
  };

  private readonly handlePageClick = (
    event: React.MouseEvent,
    page: number,
  ): void => {
    this.props.onChange({ event, page });
  };

  private readonly handlePageKeyDown = (
    event: React.KeyboardEvent,
    page: number,
  ): void => {
    // Enter or Space
    if (event.key === 'Enter' || event.key === 'Space') {
      this.props.onChange({ event, page });
    }
  };

  private renderPages(): JSX.Element {
    switch (this.props.paginationMode) {
      case PaginationMode.Input:
        return this.renderPageForm();
      case PaginationMode.Compact:
        return this.renderPageCompact();
      case PaginationMode.Pages:
      default:
        return this.renderPageStrip();
    }
  }

  private renderPageCompact(): JSX.Element {
    return (
      <div
        data-hook={PaginationDataHooks.pageCompact}
        id={this.getId('pageCompact')}
        className={classes.compact}
      >
        <span
          id={this.getId('currentPage')}
          data-hook={PaginationDataHooks.currentPage}
        >
          {this.props.currentPage}
        </span>
        <span
          id={this.getId('slash')}
          className={classes.slash}
          data-hook={PaginationDataHooks.slashLabel}
        >
          {this.props.slashLabel}
        </span>
        <span
          id={this.getId('totalPages')}
          data-hook={PaginationDataHooks.totalPages}
        >
          {this.props.totalPages}
        </span>
      </div>
    );
  }

  private renderPageForm(): JSX.Element {
    return (
      <div
        data-hook={PaginationDataHooks.pageForm}
        id={this.getId('pageForm')}
        className={classes.pageForm}
        dir="ltr"
      >
        <input
          id={this.getId('pageInput')}
          data-hook={PaginationDataHooks.pageInput}
          type="number"
          className={classes.pageInput}
          min={1}
          max={this.props.totalPages}
          value={this.state.pageInputValue}
          disabled={this.props.disabled}
          onChange={this.handlePageInputChange}
          onKeyDown={this.handlePageInputKeyDown}
          aria-label={
            'Page number, select a number between 1 and ' +
            this.props.totalPages
          }
          onBlur={this.handlePageInputBlur}
          style={{ width: calculateWidth(this.props.totalPages) }}
        />
        {this.props.showInputModeTotalPages && [
          <span key="slash" id={this.getId('slash')} className={classes.slash}>
            {this.props.slashLabel}
          </span>,
          <span
            key="total-pages"
            id={this.getId('totalPages')}
            data-hook={PaginationDataHooks.totalPages}
            className={classes.totalPages}
          >
            {this.props.totalPages}
          </span>,
        ]}
      </div>
    );
  }

  private renderEmptyButton(type: ButtonType): JSX.Element {
    const btnClass = {
      [ButtonType.Prev]: [classes.emptyButtonPrevious],
      [ButtonType.Next]: [classes.emptyButtonNext],
    }[type] as [string];

    return (
      <div
        data-hook={PaginationDataHooks[type]}
        className={st(classes.emptyButton, ...btnClass)}
      />
    );
  }

  private renderNavButton(type: ButtonType): JSX.Element {
    const { currentPage, totalPages, pageUrl } = this.props;

    const disabled =
      this.props.disabled ||
      ((type === ButtonType.First || type === ButtonType.Prev) &&
        currentPage <= 1) ||
      ((type === ButtonType.Last || type === ButtonType.Next) &&
        currentPage >= totalPages);

    const [btnClass, label, page] = {
      [ButtonType.Prev]: [
        classes.navButtonPrevious,
        this.props.previousLabel,
        currentPage - 1,
      ],
      [ButtonType.Next]: [
        classes.navButtonNext,
        this.props.nextLabel,
        currentPage + 1,
      ],
      [ButtonType.First]: [classes.navButtonFirst, this.props.firstLabel, 1],
      [ButtonType.Last]: [
        classes.navButtonLast,
        this.props.lastLabel,
        totalPages,
      ],
    }[type] as [string, string, number];

    return (
      <a
        data-hook={PaginationDataHooks[type]}
        id={this.getId('navButton' + upperCaseFirst(type))}
        className={st(classes.navButton, { disabled }, btnClass)}
        aria-label={upperCaseFirst(type) + ' Page'}
        aria-disabled={disabled}
        tabIndex={disabled || pageUrl ? null : 0}
        onClick={disabled ? null : (event) => this.handlePageClick(event, page)}
        onKeyDown={
          disabled ? null : (event) => this.handlePageKeyDown(event, page)
        }
        href={!disabled && pageUrl ? pageUrl(page) : null}
      >
        {label}
      </a>
    );
  }

  public UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      pageInputValue: String(nextProps.currentPage),
      pageInputHasError: false,
    });
  }

  public render() {
    const {
      disabled,
      showFirstLastNavButtons,
      showNextLabel,
      showPreviousLabel,
      width,
      style: inlineStyle,
    } = this.props;

    const styleStates = {
      disabled,
      error: this.state.pageInputHasError,
    };

    return (
      <nav
        ref={(el) => (this.rootNode = el)}
        id={this.getId('')}
        aria-label="Pagination Navigation"
        aria-disabled={disabled}
        dir={this.props.rtl ? 'rtl' : null}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        style={inlineStyle || { width }}
        className={st(classes.root, styleStates, this.props.className)}
        {...filterDataProps(this.props)}
      >
        {showFirstLastNavButtons && this.renderNavButton(ButtonType.First)}
        {showPreviousLabel
          ? this.renderNavButton(ButtonType.Prev)
          : this.renderEmptyButton(ButtonType.Prev)}
        {this.renderPages()}
        {showNextLabel
          ? this.renderNavButton(ButtonType.Next)
          : this.renderEmptyButton(ButtonType.Next)}
        {showFirstLastNavButtons && this.renderNavButton(ButtonType.Last)}
      </nav>
    );
  }
}
