import * as React from 'react';
import {Pagination} from '../../src/components/Pagination';
import {theme} from './pagination-story-theme';

// Assuming we use pagination-story-theme
const spaceForPages = (n) => (n + 2) * 40;

class UncontrolledPagination extends Pagination {
  state = {
    currentPage: this.props.currentPage
  };

  render() {
    return (
      <Pagination
        {...this.props}
        theme={theme}
        onChange={({page, event}) => {
          event.preventDefault();
          this.setState({currentPage: page});
        }}
        pageUrl={pageNumber => `https://example.com/page/${pageNumber}`}
        currentPage={this.state.currentPage}
      />
    );
  }
}

export function PaginationStory() {
  return (
    <div>
      <div>
        <h3>Basic layout</h3>
        <UncontrolledPagination
          dataHook="story-pagination"
          totalPages={9}
          maxPagesToShow={9}
          currentPage={5}
        />
      </div>
      <div>
        <h3>Limited number of pages with first and last always visible</h3>
        <UncontrolledPagination
          dataHook="story-pagination-show-first-and-last"
          totalPages={9}
          maxPagesToShow={7}
          currentPage={5}
          showFirstPage
          showLastPage
        />
      </div>
      <div>
        <h3>RTL with "first" and "last" buttons</h3>
        <UncontrolledPagination
          dataHook="story-pagination-rtl"
          rtl
          totalPages={9}
          maxPagesToShow={9}
          currentPage={5}
          showFirstLastNavButtons
        />
      </div>
      <div>
        <h3>RTL with text</h3>
        <UncontrolledPagination
          rtl
          totalPages={9}
          maxPagesToShow={9}
          currentPage={5}
          showFirstLastNavButtons
          replaceArrowsWithText
        />
      </div>
      <div>
        <h3>RTL Input Mode</h3>
        <UncontrolledPagination
          rtl
          totalPages={1000000}
          currentPage={500000}
          paginationMode="input"
          showInputModeTotalPages
          showFirstLastNavButtons
          replaceArrowsWithText
        />
      </div>

      <h2>Responsive Layout</h2>
      <div>
        <h3>Full range</h3>
        <UncontrolledPagination
          dataHook="responsive-full-range"
          responsive
          width={spaceForPages(9)}
          showFirstPage
          showLastPage
          currentPage={5}
          totalPages={9}
        />
      </div>
      <div>
        <h3>Limited range without ellipses</h3>
        <UncontrolledPagination
          dataHook="responsive-no-ellipsis"
          responsive
          width={spaceForPages(7)}
          currentPage={5}
          totalPages={9}
        />
      </div>
      <div>
        <h3>Ellipsis at the end</h3>
        <UncontrolledPagination
          dataHook="responsive-ellipsis-end"
          responsive
          width={spaceForPages(7)}
          showFirstPage
          showLastPage
          currentPage={4}
          totalPages={9}
        />
      </div>
      <div>
        <h3>Ellipsis at the beginning</h3>
        <UncontrolledPagination
          dataHook="responsive-ellipsis-beginning"
          responsive
          width={spaceForPages(7)}
          showFirstPage
          showLastPage
          currentPage={6}
          totalPages={9}
        />
      </div>
      <div>
        <h3>Ellipses on both sides</h3>
        <UncontrolledPagination
          dataHook="responsive-ellipsis-beginning-end"
          responsive
          width={spaceForPages(7)}
          showFirstPage
          showLastPage
          currentPage={5}
          totalPages={9}
        />
      </div>
      <div>
        <h3>Not enough space for both ellipses and prev and next</h3>
        <UncontrolledPagination
          dataHook="responsive-no-space-for-ellipsis-and-prev-next"
          responsive
          width={spaceForPages(5)}
          showFirstPage
          showLastPage
          currentPage={5}
          totalPages={9}
        />
      </div>
      <div>
        <h3>Not enough space for ellipses</h3>
        <UncontrolledPagination
          dataHook="responsive-no-space-for-ellipsis"
          responsive
          width={spaceForPages(3)}
          showFirstPage
          showLastPage
          currentPage={5}
          totalPages={9}
        />
      </div>
      <div>
        <h3>Not enough space for the current page</h3>
        <UncontrolledPagination
          dataHook="responsive-no-space-for-current"
          responsive
          width={spaceForPages(0.5)}
          showFirstPage
          showLastPage
          currentPage={5}
          totalPages={9}
        />
      </div>
    </div>
  );
}
