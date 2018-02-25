import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  PageStripLayout,
  createStaticLayout,
  createResponsiveLayout,
  createResponsiveLayoutTemplate
} from './page-strip-layout';
import style from './Pagination.st.css';

export interface PageStripProps {
  id?: string;
  totalPages: number;
  currentPage: number;
  maxPagesToShow: number;
  showFirstPage: boolean;
  showLastPage: boolean;
  responsive: boolean;
  pageUrl?: (pageNumber: number) => string;
  gapLabel: React.ReactNode;
  onPageClick: (event: React.MouseEvent<Element>, page: number) => void;
  onPageKeyDown: (event: React.KeyboardEvent<Element>, page: number) => void;
  updateResponsiveLayout: (callback: () => void) => void;
}

export interface PageStripState {
  responsiveLayout: PageStripLayout | null;
}

export class PageStrip extends React.Component<PageStripProps, PageStripState> {
  private responsiveLayoutIsFresh: boolean = false;

  public constructor() {
    super();
    this.state = {responsiveLayout: null};
  }

  public componentDidMount() {
    if (this.props.updateResponsiveLayout) {
      // We can't do this in componentWillMount because the caller might need to access DOM here,
      // and SSR wouldn't work.
      this.props.updateResponsiveLayout(() => {
        this.responsiveLayoutIsFresh = false;
        this.updateLayoutIfNeeded();
      });
    } else  {
      this.updateLayoutIfNeeded();
    }
  }

  public componentWillReceiveProps() {
    this.responsiveLayoutIsFresh = false;
  }

  public componentDidUpdate() {
    if (!this.props.updateResponsiveLayout) {
      this.updateLayoutIfNeeded();
    }
  }

  public componentWillUnmount() {
    if (this.props.updateResponsiveLayout) {
      this.props.updateResponsiveLayout(() => null);
    }
  }

  public render() {
    return (
      <div
        data-hook="page-strip"
        id={this.props.id ? this.props.id + 'pageStrip' : null}
        className={style.pageStrip}
      >
        <div className={style.pageStripInner}>
          {this.renderLayout(this.getLayout(), false)}
        </div>

        {this.isResponsive() &&
          <div className={style.pageStripInner + ' ' + style.pageStripTemplate}>
            {this.renderLayout(createResponsiveLayoutTemplate(this.props), true)}
          </div>
        }
      </div>
    );
  }

  // We can't use page numbers as keys, because we might need to render the same page twice
  // for responsive layout. We also can't use index as a key, because React might reuse the
  // node for another page, and keep keyboard focus on it, which we don't want.
  private renderLayout(layout: PageStripLayout, isDummy: boolean): JSX.Element[] {
    const {currentPage, pageUrl} = this.props;

    return layout.map((pageNumber, index) => {
      if (!pageNumber) {
        return (
          <span key={index} className={style.gap}>
            {this.props.gapLabel}
          </span>
        );
      }

      if (pageNumber === currentPage) {
        return (
          <span
            key={pageNumber + '-' + index}
            data-hook={`page-${pageNumber} current-page`}
            aria-label={`Page ${pageNumber}`}
            className={style.currentPage}
          >
            {pageNumber}
          </span>
        );
      }

      if (isDummy) {
        return <a key={pageNumber + '-' + index} className={style.pageButton}>{pageNumber}</a>;
      }

      return (
        <a
          key={pageNumber + '-' + index}
          data-hook={`page-${pageNumber}`}
          aria-label={`Page ${pageNumber}`}
          className={style.pageButton}
          tabIndex={pageUrl ? null : 0}
          onClick={e => this.props.onPageClick(e, pageNumber)}
          onKeyDown={e => this.props.onPageKeyDown(e, pageNumber)}
          href={pageUrl ? pageUrl(pageNumber) : null}
        >
          {pageNumber}
        </a>
      );
    });
  }

  private isResponsive() {
    return this.props.responsive && this.props.totalPages > 0 && this.props.maxPagesToShow > 1;
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
      maxPagesToShow: 5
    });
  }

  private updateLayoutIfNeeded(): void {
    if (!this.isResponsive() || this.responsiveLayoutIsFresh) {
      return;
    }

    this.responsiveLayoutIsFresh = true;
    this.setState({
      responsiveLayout: createResponsiveLayout({
        container: ReactDOM.findDOMNode(this).children[1],
        totalPages: this.props.totalPages,
        currentPage: this.props.currentPage,
        maxPagesToShow: this.props.maxPagesToShow,
        showFirstPage: this.props.showFirstPage,
        showLastPage: this.props.showLastPage
      })
    });
  }
}
