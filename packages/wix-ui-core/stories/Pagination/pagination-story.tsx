import * as React from 'react';
import {Pagination as CorePagination, PaginationProps} from '../../src/components/pagination';
import style from './pagination-story-theme.st.css';
import {withStylable} from '../../src/utils/withStylable';

// Assuming we use pagination-story-theme
const spaceForPages = n => (n + 2) * 40;

const Pagination = withStylable<PaginationProps, {}>(CorePagination, style, () => ({}));

class UncontrolledPagination extends React.Component<PaginationProps, {currentPage: number}> {
  state = {
    currentPage: this.props.currentPage
  };

  render() {
    return (
        <Pagination
          {...this.props}
          {...style('root')}
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
          data-hook="story-pagination"
          totalPages={9}
          maxPagesToShow={9}
          currentPage={5}
        />
      </div>
      <div>
        <h3>Buttons with custom text</h3>
        <UncontrolledPagination
          data-hook="story-pagination-custom-text"
          totalPages={9}
          maxPagesToShow={9}
          currentPage={5}
          showFirstLastNavButtons
          firstLabel="First"
          previousLabel="Previous"
          nextLabel="Next"
          lastLabel="Last"
        />
      </div>
      <div>
        <h3>Limited number of pages with first and last page always visible</h3>
        <UncontrolledPagination
          data-hook="story-pagination-show-first-and-last"
          totalPages={9}
          maxPagesToShow={7}
          currentPage={5}
          showFirstPage
          showLastPage
        />
      </div>
      <div>
        <h3>Right to left</h3>
        <UncontrolledPagination
          data-hook="story-pagination-rtl"
          rtl
          totalPages={9}
          maxPagesToShow={9}
          currentPage={5}
          showFirstLastNavButtons
        />
      </div>
      <div>
        <h3>Disabled</h3>
        <UncontrolledPagination
          data-hook="story-pagination-disabled"
          totalPages={9}
          maxPagesToShow={9}
          currentPage={5}
          showFirstLastNavButtons
          disabled
        />
      </div>
      <div>
        <h3>Input mode</h3>
        <UncontrolledPagination
          totalPages={1000000}
          currentPage={500000}
          paginationMode="input"
          showInputModeTotalPages
          showFirstLastNavButtons
        />
      </div>
      <div>
        <h3>Plane mode</h3>
        <UncontrolledPagination
          totalPages={1000000}
          currentPage={500000}
          paginationMode="plane"
          showFirstLastNavButtons
        />
      </div>

      <h2>Responsive layout</h2>
      <div>
        <h3>Full range</h3>
        <UncontrolledPagination
          data-hook="responsive-full-range"
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
          data-hook="responsive-no-ellipsis"
          responsive
          width={spaceForPages(7)}
          currentPage={5}
          totalPages={9}
        />
      </div>
      <div>
        <h3>Ellipsis at the end</h3>
        <UncontrolledPagination
          data-hook="responsive-ellipsis-end"
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
          data-hook="responsive-ellipsis-beginning"
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
          data-hook="responsive-ellipsis-beginning-end"
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
          data-hook="responsive-no-space-for-ellipsis-and-prev-next"
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
          data-hook="responsive-no-space-for-ellipsis"
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
          data-hook="responsive-no-space-for-current"
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
