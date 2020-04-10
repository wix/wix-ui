import * as React from 'react';
import {
  PageStripLayout,
  createStaticLayout,
  createResponsiveLayout,
  createResponsiveLayoutTemplate,
} from './page-strip-layout';
import { classes } from './Pagination.st.css';
import { PaginationDataHooks } from './DataHooks';

export interface PageStripProps {
  id?: string;
  totalPages: number;
  currentPage: number;
  maxPagesToShow: number;
  showFirstPage: boolean;
  showLastPage: boolean;
  responsive: boolean;
  pageUrl?(pageNumber: number): string;
  gapLabel: React.ReactNode;
  onPageClick(event: React.MouseEvent, page: number): void;
  onPageKeyDown(event: React.KeyboardEvent, page: number): void;
  updateResponsiveLayout(callback: () => void): void;
  disabled: boolean;
}

export interface PageStripState {
  responsiveLayout: PageStripLayout | null;
}

export class PageStrip extends React.Component<PageStripProps, PageStripState> {
  private responsiveLayoutIsFresh: boolean = false;
  private unmounted: boolean = false;
  private rootNode: HTMLElement;

  state = { responsiveLayout: null };

  public componentDidMount() {
    if (this.props.updateResponsiveLayout) {
      // We can't do this in componentWillMount because the caller might need to access DOM here,
      // and SSR wouldn't work.
      this.props.updateResponsiveLayout(() => {
        this.responsiveLayoutIsFresh = false;

        // Even though we register a noop callback for `this.props.updateResponsiveLayout`
        // in `componentWillUnmount`, we cannot guarantee that the user will not hold onto
        // the old callback and invoke it after unmount, which is the reason for checking
        // `this.unmounted`.
        if (!this.unmounted) {
          this.updateLayoutIfNeeded();
        }
      });
    } else {
      this.updateLayoutIfNeeded();
    }
  }

  public UNSAFE_componentWillReceiveProps() {
    this.responsiveLayoutIsFresh = false;
  }

  public componentDidUpdate() {
    if (!this.props.updateResponsiveLayout) {
      this.updateLayoutIfNeeded();
    }

    this.forceRepaintInMsEdge();
  }

  public componentWillUnmount() {
    this.unmounted = true;
    if (this.props.updateResponsiveLayout) {
      this.props.updateResponsiveLayout(() => null);
    }
  }

  public render() {
    return (
      <div
        ref={el => (this.rootNode = el)}
        data-hook={PaginationDataHooks.pageStrip}
        id={this.props.id ? this.props.id + 'pageStrip' : null}
        className={classes.pageStrip}
        data-aid="qa-page-strip"
      >
        <div className={classes.pageStripInner}>
          {this.renderLayout(this.getLayout(), false)}
        </div>

        {this.isResponsive() && (
          <div
            className={classes.pageStripInner + ' ' + classes.pageStripTemplate}
          >
            {this.renderLayout(
              createResponsiveLayoutTemplate(this.props),
              true,
            )}
          </div>
        )}
      </div>
    );
  }

  private forceRepaintInMsEdge() {
    // MS Edge has a glitch that makes page numbers invisible when switching to the preview
    // mode in Santa editor. As a workaround we need to force text re-rendering.
    // Changing font-variant to small-caps should do the trick without actually affecting
    // the appearance of digits.

    const inlineStyle = this.rootNode.style;
    inlineStyle.fontVariant = inlineStyle.fontVariant ? '' : 'small-caps';
  }

  // We can't use page numbers as keys, because we might need to render the same page twice
  // for responsive layout. We also can't use index as a key, because React might reuse the
  // node for another page, and keep keyboard focus on it, which we don't want.
  private renderLayout(
    layout: PageStripLayout,
    isDummy: boolean,
  ): JSX.Element[] {
    const { currentPage, pageUrl, disabled } = this.props;

    return layout.map((pageNumber, index) => {
      if (!pageNumber) {
        return (
          <span key={index} className={classes.gap}>
            {this.props.gapLabel}
          </span>
        );
      }

      if (pageNumber === currentPage) {
        return (
          <span
            key={pageNumber + '-' + index}
            data-hook={`${PaginationDataHooks.page}-${pageNumber} ${PaginationDataHooks.currentPage}`}
            aria-label={`Page ${pageNumber}`}
            className={classes.currentPage}
          >
            {pageNumber}
          </span>
        );
      }

      if (isDummy) {
        return (
          <a key={pageNumber + '-' + index} className={classes.pageButton}>
            {pageNumber}
          </a>
        );
      }

      return (
        <a
          key={pageNumber + '-' + index}
          data-hook={`${PaginationDataHooks.page}-${pageNumber}`}
          aria-label={`Page ${pageNumber}`}
          className={classes.pageButton}
          tabIndex={disabled || pageUrl ? null : 0}
          onClick={disabled ? null : e => this.props.onPageClick(e, pageNumber)}
          onKeyDown={
            disabled ? null : e => this.props.onPageKeyDown(e, pageNumber)
          }
          href={!disabled && pageUrl ? pageUrl(pageNumber) : null}
        >
          {pageNumber}
        </a>
      );
    });
  }

  private isResponsive() {
    return (
      this.props.responsive &&
      this.props.totalPages > 0 &&
      this.props.maxPagesToShow > 1
    );
  }

  private getLayout(): PageStripLayout {
    if (!this.isResponsive()) {
      return createStaticLayout(this.props);
    }

    if (this.state.responsiveLayout) {
      return this.state.responsiveLayout;
    }

    return createStaticLayout({
      totalPages: this.props.totalPages,
      currentPage: this.props.currentPage,
      showFirstPage: this.props.showFirstPage,
      showLastPage: this.props.showLastPage,
      // This is pretty arbitrary. 5 is the minimum space required to show the first, current, and last page.
      maxPagesToShow: 5,
    });
  }

  private updateLayoutIfNeeded(): void {
    if (!this.isResponsive() || this.responsiveLayoutIsFresh) {
      return;
    }

    this.responsiveLayoutIsFresh = true;
    this.setState({
      responsiveLayout: createResponsiveLayout({
        container: this.rootNode.children[1],
        totalPages: this.props.totalPages,
        currentPage: this.props.currentPage,
        maxPagesToShow: this.props.maxPagesToShow,
        showFirstPage: this.props.showFirstPage,
        showLastPage: this.props.showLastPage,
      }),
    });
  }
}
