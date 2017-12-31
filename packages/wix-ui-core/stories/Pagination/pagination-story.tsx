import * as React from 'react';
import Pagination from '../../src/components/Pagination';

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
        this.setState({currPage: parseInt(e.page, 10)});
    }
  }

  render() {
    return (
      <div>
        <div><h3>Vanilla</h3>
          <Pagination
            dataHook="story-pagination"
            totalPages={numOfPages}
            currentPage={this.state.currPage}
            showFirstLastNavButtons
            onChange={this.handleChange}
            />
        </div>
        <div><h3>RTL</h3>
          <Pagination
            dataHook="story-pagination-rtl"
            direction="rtl"
            totalPages={numOfPages}
            currentPage={this.state.currPage}
            showFirstLastNavButtons
            onChange={this.handleChange}/>
        </div>
        <div><h3>RTL with text</h3>
          <Pagination
            dataHook="story-pagination-rtl"
            direction="rtl"
            totalPages={numOfPages}
            currentPage={this.state.currPage}
            showFirstLastNavButtons
            onChange={this.handleChange}
            replaceArrowsWithText/>
        </div>
    </div>
    );
  }
}
