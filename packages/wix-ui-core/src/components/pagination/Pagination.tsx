import * as React from 'react';
import { PageStrip } from './PageStrip';
import pStyle from './Pagination.st.css';
import { measureAndSetRootMinWidth } from './root-min-width';

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
  Plane = 'plane',
  Input = 'input',
}

export interface PaginationProps {
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
  paginationMode?: 'pages' | 'input' | 'plane' | PaginationMode;
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

  private get maxPagesToShow(): number {
    if (this.props.maxPagesToShow) {
      return this.props.maxPagesToShow;
    }
    if (this.props.responsive) {
      return 20;
    }
    return 7;
  }

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
        maxPagesToShow={this.maxPagesToShow}
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
    if (event.keyCode === 13) {
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
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.props.onChange({ event, page });
    }
  };

  private renderPages() {
    switch (this.props.paginationMode) {
      case 'input':
        return this.renderPageForm();
      case 'plane':
        return this.renderPagePlane();
      case 'pages':
      default:
        return this.renderPageStrip();
    }
  }

  private renderPagePlane() {
    return (
      <div
        data-hook="page-plane"
        id={this.getId('pagePlane')}
        className={pStyle.plane}
        dir="ltr"
      >
        <span
          key="current-page"
          id={this.getId('currentPage')}
          data-hook="current-page"
        >
          {this.props.currentPage}
        </span>
        <span key="slash" id={this.getId('slash')} className={pStyle.slash}>
          {this.props.slashLabel}
        </span>
        <span
          key="total-pages"
          id={this.getId('totalPages')}
          data-hook="total-pages"
        >
          {this.props.totalPages}
        </span>
      </div>
    );
  }

  private renderPageForm(): JSX.Element {
    return (
      <div
        data-hook="page-form"
        id={this.getId('pageForm')}
        className={pStyle.pageForm}
        dir="ltr"
      >
        <input
          id={this.getId('pageInput')}
          data-hook="page-input"
          type="number"
          className={pStyle.pageInput}
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
          <span key="slash" id={this.getId('slash')} className={pStyle.slash}>
            {this.props.slashLabel}
          </span>,
          <span
            key="total-pages"
            id={this.getId('totalPages')}
            data-hook="total-pages"
            className={pStyle.totalPages}
          >
            {this.props.totalPages}
          </span>,
        ]}
      </div>
    );
  }

  private renderNavButton(type: ButtonType): JSX.Element {
    const { currentPage, totalPages, pageUrl } = this.props;

    const disabled =
      this.props.disabled ||
      (((type === ButtonType.First || type === ButtonType.Prev) &&
        currentPage <= 1) ||
        ((type === ButtonType.Last || type === ButtonType.Next) &&
          currentPage >= totalPages));

    const [btnClass, label, page] = {
      [ButtonType.Prev]: [
        pStyle.navButtonPrevious,
        this.props.previousLabel,
        currentPage - 1,
      ],
      [ButtonType.Next]: [
        pStyle.navButtonNext,
        this.props.nextLabel,
        currentPage + 1,
      ],
      [ButtonType.First]: [pStyle.navButtonFirst, this.props.firstLabel, 1],
      [ButtonType.Last]: [
        pStyle.navButtonLast,
        this.props.lastLabel,
        totalPages,
      ],
    }[type] as [string, string, number];

    return (
      <a
        data-hook={type}
        id={this.getId('navButton' + upperCaseFirst(type))}
        {...pStyle('navButton ' + btnClass, { disabled })}
        aria-label={upperCaseFirst(type) + ' Page'}
        tabIndex={disabled || pageUrl ? null : 0}
        onClick={disabled ? null : event => this.handlePageClick(event, page)}
        onKeyDown={
          disabled ? null : event => this.handlePageKeyDown(event, page)
        }
        href={!disabled && pageUrl ? pageUrl(page) : null}
      >
        {label}
      </a>
    );
  }

  public componentWillReceiveProps(nextProps) {
    this.setState({
      pageInputValue: String(nextProps.currentPage),
      pageInputHasError: false,
    });
  }

  public render() {
    const { showFirstLastNavButtons, width, style } = this.props;

    const styleStates = {
      disabled: this.props.disabled,
      error: this.state.pageInputHasError,
    };

    return (
      <nav
        ref={el => (this.rootNode = el)}
        id={this.getId('')}
        aria-label="Pagination Navigation"
        dir={this.props.rtl ? 'rtl' : null}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        style={style || { width }}
        {...pStyle('root', styleStates, this.props)}
      >
        {this.renderNavButton(ButtonType.Next)}
        {this.renderNavButton(ButtonType.Prev)}
        {this.renderPages()}
        {showFirstLastNavButtons && this.renderNavButton(ButtonType.First)}
        {showFirstLastNavButtons && this.renderNavButton(ButtonType.Last)}
      </nav>
    );
  }
}
