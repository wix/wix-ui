import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  PageStripLayout,
  createStaticLayout,
  createResponsiveLayout,
  createResponsiveLayoutTemplate
} from './page-strip-layout';

export interface PageStripClasses {
  pageStrip: string;
  pageButton: string;
  currentPage: string;
  gap: string;
}

export interface PageStripProps {
  id?: string;
  classes: PageStripClasses;
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
}

export enum ResponsiveLayoutPhase {
  // When using responsive layout we initially want to render identical tree
  // on the server and in the browser so that React doesn't freak out.
  Initial,

  // Once the component is mounted we need to determine how much space various buttons
  // occupy to decide which of them we have enough space for. The users should never
  // see this layout, we only use it to take measurements.
  Template,

  // Once we have the measurements, we can render the final responsive layout.
  Final
}

export interface PageStripState {
  responsiveLayout: PageStripLayout;
  responsiveLayoutPhase: ResponsiveLayoutPhase;
}

export class PageStrip extends React.Component<PageStripProps, PageStripState> {
  constructor() {
    super();
    this.state = {
      responsiveLayout: null,
      responsiveLayoutPhase: ResponsiveLayoutPhase.Initial
    };
  }

  public componentWillReceiveProps() {
    this.setState({
      responsiveLayout: null,
      responsiveLayoutPhase: ResponsiveLayoutPhase.Template
    });
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
          <span key={index} className={classes.gap}>
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

    if (this.state.responsiveLayoutPhase === ResponsiveLayoutPhase.Template) {
      return createResponsiveLayoutTemplate(this.props);
    }

    if (this.state.responsiveLayoutPhase === ResponsiveLayoutPhase.Final) {
      return this.state.responsiveLayout;
    }

    return [this.props.currentPage];
  }

  private updateLayoutIfNeeded(): void {
    if (this.isResponsive()) {
      if (this.state.responsiveLayoutPhase === ResponsiveLayoutPhase.Initial) {
        this.setState({responsiveLayoutPhase: ResponsiveLayoutPhase.Template});
      } else if (this.state.responsiveLayoutPhase === ResponsiveLayoutPhase.Template) {
        this.setState({
          responsiveLayout: createResponsiveLayout({
            container: ReactDOM.findDOMNode(this),
            totalPages: this.props.totalPages,
            currentPage: this.props.currentPage,
            maxPagesToShow: this.props.maxPagesToShow,
            showFirstPage: this.props.showFirstPage,
            showLastPage: this.props.showLastPage
          }),
          responsiveLayoutPhase: ResponsiveLayoutPhase.Final
        });
      }
    }
  }
}
