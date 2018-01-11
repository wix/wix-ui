import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  PageStripLayout,
  createStaticLayout,
  createResponsiveLayout,
  createResponsiveLayoutTemplate
} from './page-strip-layout';

function canUseDOM(): boolean {
  return typeof window !== 'undefined' && Boolean(window.document && window.document.createElement);
}

export interface PageStripClasses {
  pageStrip: string;
  pageButton: string;
  currentPage: string;
  ellipsis: string;
}

export interface PageStripProps {
  totalPages: number;
  currentPage: number;
  maxPagesToShow: number;
  showFirstPage: boolean;
  showLastPage: boolean;
  responsive: boolean;
  id?: string;
  classes: PageStripClasses;
  onPageSelect: (event: React.SyntheticEvent<Element>, page: number) => void;
  pageUrl?: (pageNumber: number) => string;
}

export interface PageStripState {
  responsiveLayout?: PageStripLayout;
}

export class PageStrip extends React.Component<PageStripProps, PageStripState> {
  constructor() {
    super();
    this.state = {
      responsiveLayout: null
    };
  }

  public componentWillReceiveProps() {
    this.setState({responsiveLayout: null});
  }

  public componentDidMount() {
    this.updateLayoutIfNeeded();
  }

  public componentDidUpdate() {
    this.updateLayoutIfNeeded();
  }

  public render() {
    return (
      <div
        data-hook="page-strip"
        id={this.props.id ? this.props.id + 'pageStrip' : null}
        className={this.props.classes.pageStrip}
      >
        {this.renderLayout(this.getLayout())}
      </div>
    );
  }

  private renderLayout(layout: PageStripLayout): JSX.Element[] {
    const {currentPage, pageUrl, classes} = this.props;

    // We can't use page number as a key, because we might need to render the same page twice
    // for responsive layout.
    // We also can't use index as a key, because React might reuse the node for another page,
    // and keep keyboard focus on it.
    return layout.map((pageNumber, index) => {
      if (!pageNumber) {
        return (
          <span key={index} className={classes.ellipsis}>
            ...
          </span>
        );
      }

      if (pageNumber === currentPage) {
        return (
          <span
            key={pageNumber + '-' + index}
            data-hook={`page-${pageNumber} current-page`}
            aria-label={`Page ${pageNumber}`}
            className={classes.currentPage}
          >
            {pageNumber}
          </span>
        );
      }

      return (
        <a
          key={pageNumber + '-' + index}
          data-hook={`page-${pageNumber}`}
          aria-label={`Page ${pageNumber}`}
          className={classes.pageButton}
          tabIndex={pageUrl ? null : 0}
          onClick={e => this.handleClick(e, pageNumber)}
          onKeyDown={e => this.handleKeyDown(e, pageNumber)}
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
    if (this.isResponsive()) {
      if (this.state.responsiveLayout) {
        return this.state.responsiveLayout;
      } else if (canUseDOM()) {
        return createResponsiveLayoutTemplate(this.props);
      }
      return [this.props.currentPage];
    }
    return createStaticLayout(this.props);
  }

  private updateLayoutIfNeeded(): void {
    const {totalPages, currentPage, maxPagesToShow, showFirstPage, showLastPage} = this.props;

    if (this.isResponsive() && !this.state.responsiveLayout) {
      this.setState({
        responsiveLayout: createResponsiveLayout({
          container: ReactDOM.findDOMNode(this),
          totalPages,
          currentPage,
          maxPagesToShow,
          showFirstPage,
          showLastPage
        })
      });
    }
  }

  private handleClick(event: React.MouseEvent<Element>, page: number) {
    this.props.onPageSelect(event, page);
  }

  private handleKeyDown(event: React.KeyboardEvent<Element>, page: number) {
    // Enter or Space
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.props.onPageSelect(event, page);
    }
  }
}
