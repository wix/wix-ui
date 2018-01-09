import * as React from 'react';
import Pagination from '../../src/components/Pagination';
import {theme} from './pagination-story-theme';

const numOfPages = 13;

// Assuming we use pagination-story-theme
const spaceForPages = (n) => (n + 2) * 40;

export class PaginationStory extends React.Component<{}, { currPage: number }> {
  state = {
    currPage: 10
  };

  handleChange = e => {
    switch (e.page) {
      case 'first' :
        this.setState({currPage: 1});
        break;
      case 'last' :
        this.setState({currPage: numOfPages});
        break;
      case 'next' :
        this.setState({currPage: this.state.currPage + 1});
        break;
      case 'previous' :
        this.setState({currPage: this.state.currPage - 1});
        break;
      default:
        this.setState({currPage: Number(e.page)});
    }
  }

  render() {
    return (
      <div>
        <div>
          <h3>Basic layout</h3>
          <Pagination
            dataHook="story-pagination"
            totalPages={numOfPages}
            currentPage={this.state.currPage}
            onChange={this.handleChange}
            theme={theme}
          />
        </div>
        <div>
          <h3>RTL with "first" and "last" buttons</h3>
          <Pagination
            dataHook="story-pagination-rtl"
            rtl
            totalPages={numOfPages}
            currentPage={this.state.currPage}
            showFirstLastNavButtons
            onChange={this.handleChange}
            theme={theme}
          />
        </div>
        <div>
          <h3>RTL with text</h3>
          <Pagination
            rtl
            totalPages={numOfPages}
            currentPage={this.state.currPage}
            showFirstLastNavButtons
            onChange={this.handleChange}
            replaceArrowsWithText
            theme={theme}
          />
        </div>
        <div>
          <h3>RTL Input Mode</h3>
          <Pagination
            rtl
            totalPages={numOfPages}
            paginationMode="input"
            showInputModeTotalPages
            currentPage={this.state.currPage}
            showFirstLastNavButtons
            onChange={this.handleChange}
            replaceArrowsWithText
            theme={theme}
          />
        </div>

        <h2>Responsive Layout</h2>
        <div>
          <h3>Full Range</h3>
          <Pagination
            dataHook="responsive-full-range"
            responsive
            width={spaceForPages(9)}
            showFirstPage
            showLastPage
            currentPage={5}
            totalPages={9}
            theme={theme}
          />
        </div>
        <div>
          <h3>Without Ellipses</h3>
          <Pagination
            dataHook="responsive-no-ellipsis"
            responsive
            width={spaceForPages(7)}
            currentPage={5}
            totalPages={9}
            theme={theme}
          />
        </div>
        <div>
          <h3>Ellipsis at the End</h3>
          <Pagination
            dataHook="responsive-ellipsis-end"
            responsive
            width={spaceForPages(7)}
            showFirstPage
            showLastPage
            currentPage={4}
            totalPages={9}
            theme={theme}
          />
        </div>
        <div>
          <h3>Ellipsis at the Beginning</h3>
          <Pagination
            dataHook="responsive-ellipsis-beginning"
            responsive
            width={spaceForPages(7)}
            showFirstPage
            showLastPage
            currentPage={6}
            totalPages={9}
            theme={theme}
          />
        </div>
        <div>
          <h3>Ellipses on Both Sides</h3>
          <Pagination
            dataHook="responsive-ellipsis-beginning-end"
            responsive
            width={spaceForPages(7)}
            showFirstPage
            showLastPage
            currentPage={5}
            totalPages={9}
            theme={theme}
          />
        </div>
        <div>
          <h3>Not Enough Space for Ellipses</h3>
          <Pagination
            dataHook="responsive-no-space-for-ellipsis"
            responsive
            width={spaceForPages(5)}
            showFirstPage
            showLastPage
            currentPage={5}
            totalPages={9}
            theme={theme}
          />
        </div>
        <div>
          <h3>Not Enough Space for the Current Page</h3>
          <Pagination
            dataHook="responsive-no-space-for-current"
            responsive
            width={spaceForPages(0.5)}
            showFirstPage
            showLastPage
            currentPage={5}
            totalPages={9}
            theme={theme}
          />
        </div>
      </div>
    );
  }
}
