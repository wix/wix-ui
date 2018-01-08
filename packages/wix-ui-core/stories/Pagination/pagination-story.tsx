import * as React from 'react';
import Pagination from '../../src/components/Pagination';
import {theme} from './pagination-story-theme';

const numOfPages = 13;

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
          <h3>Input Mode</h3>
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
      </div>
    );
  }
}
