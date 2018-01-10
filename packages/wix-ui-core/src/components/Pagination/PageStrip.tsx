import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    PageStripLayout,
    createStaticLayout,
    createResponsiveLayout,
    createResponsiveLayoutTemplate
} from './page-strip-layout';

function canUseDOM(): boolean {
    return (
        typeof window !== 'undefined' &&
        Boolean(window.document && window.document.createElement)
    );
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
    onPageSelect: (event: React.KeyboardEvent<Element> | React.MouseEvent<Element>, pageNumber: number) => void;
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
        const {currentPage, classes} = this.props;

        return layout.map((pageNumber, index) => {
            if (!pageNumber) {
                return <span key={index} className={classes.ellipsis}>...</span>;
            }

            if (pageNumber === currentPage) {
                return (
                    <span
                        key={index}
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
                    key={index}
                    data-hook={`page-${pageNumber}`}
                    aria-label={`Page ${pageNumber}`}
                    className={classes.pageButton}
                    tabIndex={0}
                    onClick={e => this.handleClick(e, pageNumber)}
                    onKeyDown={e => this.handleKeyDown(e, pageNumber)}
                >
                    {pageNumber}
                </a>
            );
        });
    }

    private getLayout(): PageStripLayout {
        if (this.props.responsive) {
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

        if (this.props.responsive && !this.state.responsiveLayout) {
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

    private handleClick(e: React.MouseEvent<Element>, pageNumber: number) {
        this.props.onPageSelect(e, pageNumber);
    }

    private handleKeyDown(e: React.KeyboardEvent<Element>, pageNumber: number) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            this.props.onPageSelect(e, pageNumber);
        }
    }
}
